'use client';

import { useVyuhStore } from '@vyuh/react-core';
import React, {
  Component,
  ErrorInfo,
  ReactNode,
  Suspense,
  useState,
  useEffect,
} from 'react';

/**
 * Error Boundary component props
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  title: string;
  onRetry?: () => void;
  FallbackComponent?: React.ComponentType<{
    error: Error;
    onRetry: () => void;
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

  private invokeRetry = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry?.();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const Component =
        this.props.FallbackComponent || this.defaultFallbackComponent;

      return <Component error={this.state.error} onRetry={this.invokeRetry} />;
    }

    return this.props.children;
  }

  private defaultFallbackComponent = ({
    error,
    onRetry,
  }: {
    error: Error;
    onRetry: () => void;
  }) => {
    const { componentBuilder } = useVyuhStore.getState();

    return componentBuilder.renderError({
      title: this.props.title,
      error,
      onRetry,
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
      throw new Error('No Content found');
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
   * Callback function to invoke when retrying after an error
   */
  onRetry?: () => void;
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
  onRetry,
}: AsyncContentContainerProps<T>): React.ReactNode {
  const { componentBuilder } = useVyuhStore.getState();

  // Create a new resource only once on initial render
  const [resource, setResource] = useState(
    () => new AsyncResource(loadContent()),
  );

  // Store the loadContent function reference
  const loadContentRef = React.useRef(loadContent);

  // Only update resource when loadContent function reference changes
  useEffect(() => {
    // Compare function references to avoid unnecessary reloads during HMR
    if (loadContentRef.current !== loadContent) {
      setResource(new AsyncResource(loadContent()));
      loadContentRef.current = loadContent;
    }
  }, [loadContent]);

  return (
    <ErrorBoundary title={errorTitle} onRetry={onRetry}>
      <Suspense fallback={componentBuilder.renderContentLoader()}>
        <AsyncContentLoader resource={resource} renderContent={renderContent} />
      </Suspense>
    </ErrorBoundary>
  );
}
