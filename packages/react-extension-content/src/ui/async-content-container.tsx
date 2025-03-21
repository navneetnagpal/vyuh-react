'use client';

import { useVyuhStore } from '@vyuh/react-core';
import React, {
  Component,
  ErrorInfo,
  ReactNode,
  Suspense,
  useCallback,
  useState,
} from 'react';

/**
 * Error Boundary component props
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  title: string;
  FallbackComponent?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
}

/**
 * Error Boundary component state
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle errors in the component tree
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { plugins } = useVyuhStore.getState();

    plugins.telemetry?.log(this.props.title, 'error', { error });
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { componentBuilder } = useVyuhStore.getState();

    if (this.state.hasError && this.state.error) {
      const Component =
        this.props.FallbackComponent || this.defaultFallbackComponent;

      return (
        <Component
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }

  private defaultFallbackComponent = ({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => {
    const { componentBuilder } = useVyuhStore.getState();

    return componentBuilder.renderError({
      title: this.props.title,
      error,
      onRetry: resetErrorBoundary,
    });
  };
}

/**
 * Resource for suspense-based data fetching
 */
class AsyncResource<T> {
  private readonly promise: Promise<T>;
  private result: T | null = null;
  private error: Error | null = null;
  private status: 'pending' | 'success' | 'error' = 'pending';

  constructor(promise: Promise<T>) {
    this.promise = promise.then(
      (data) => {
        this.status = 'success';
        this.result = data;
        return data;
      },
      (error) => {
        this.status = 'error';
        this.error = error instanceof Error ? error : new Error(String(error));
        throw this.error;
      },
    );
  }

  read(): T {
    if (this.status === 'pending') {
      throw this.promise;
    } else if (this.status === 'error') {
      throw this.error;
    } else if (this.result === null) {
      throw new Error('Resource resolved to null');
    } else {
      return this.result;
    }
  }
}

/**
 * Props for AsyncContentContainer
 */
export interface AsyncContentContainerProps<T> {
  /**
   * Async function that loads the content
   */
  loadContent: () => Promise<T>;

  /**
   * Function to render the loaded content
   */
  renderContent: (content: T) => React.ReactNode;

  /**
   * Error title to display when loading fails
   */
  errorTitle?: string;

  /**
   * Key to force reload content when changed
   */
  contentKey?: string | number;
}

/**
 * Component that renders content from an async data source
 */
function AsyncContentLoader<T>({
  resource,
  renderContent,
}: {
  resource: AsyncResource<T>;
  renderContent: (content: T) => React.ReactNode;
}) {
  // This will either throw a promise (suspense) or return the content
  const content = resource.read();
  return <>{renderContent(content)}</>;
}

/**
 * Generic component for loading and rendering async content with error handling
 */
export function AsyncContentContainer<T>({
  loadContent,
  renderContent,
  errorTitle = 'Failed to load content',
  contentKey = 'default',
}: AsyncContentContainerProps<T>): React.ReactNode {
  const { componentBuilder } = useVyuhStore.getState();

  // Create a new resource when the key changes
  const [resource] = useState(() => new AsyncResource(loadContent()));

  return (
    <ErrorBoundary key={contentKey} title={errorTitle}>
      <Suspense fallback={componentBuilder.renderContentLoader()}>
        <AsyncContentLoader resource={resource} renderContent={renderContent} />
      </Suspense>
    </ErrorBoundary>
  );
}
