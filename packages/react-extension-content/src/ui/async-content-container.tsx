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
  FallbackComponent: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
  onError?: (error: Error, info: ErrorInfo) => void;
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
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        <this.props.FallbackComponent
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
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
  // Get componentBuilder directly from the store
  const { componentBuilder } = useVyuhStore.getState();

  // Create a new resource when the key changes
  const [resource] = useState(() => new AsyncResource(loadContent()));

  // Default error component using componentBuilder
  const DefaultErrorComponent = useCallback(
    ({
      error,
      resetErrorBoundary,
    }: {
      error: Error;
      resetErrorBoundary: () => void;
    }) => {
      return componentBuilder.renderError({
        title: errorTitle,
        error,
        onRetry: resetErrorBoundary,
      });
    },
    [componentBuilder, errorTitle],
  );

  return (
    <ErrorBoundary key={contentKey} FallbackComponent={DefaultErrorComponent}>
      <Suspense fallback={componentBuilder.renderContentLoader()}>
        <AsyncContentLoader resource={resource} renderContent={renderContent} />
      </Suspense>
    </ErrorBoundary>
  );
}
