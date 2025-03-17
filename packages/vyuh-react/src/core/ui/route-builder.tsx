import React, {
  Component,
  ErrorInfo,
  Suspense,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { RouteBase } from '@/core/content/route-base';
import { useVyuh } from '@/hooks/use-vyuh';

/**
 * Props for the RouteBuilder component
 */
export interface RouteBuilderProps {
  /**
   * The URL to fetch the route for
   */
  url?: string;

  /**
   * The route ID to fetch the route for
   */
  routeId?: string;

  /**
   * Whether to allow refreshing the route
   */
  allowRefresh?: boolean;
}

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
 * Route content component that handles data fetching
 */
function RouteContent({ url, routeId }: { url?: string; routeId?: string }) {
  const { plugins } = useVyuh();
  const [route, setRoute] = useState<RouteBase | null>(null);

  const fetchRoute = useCallback(async () => {
    if (!url && !routeId) {
      throw new Error('Either url or routeId must be provided');
    }

    const routeData = await plugins.content.provider.fetchRoute({
      path: url,
      routeId,
    });

    if (!routeData) {
      throw new Error(`No route found for ${url || routeId}`);
    }

    return routeData;
  }, [plugins.content, url, routeId]);

  useEffect(() => {
    fetchRoute().then(setRoute);
  }, [fetchRoute]);

  if (!route) {
    // This should only happen briefly before the effect runs
    return null;
  }

  return <>{plugins.content.render(route)}</>;
}

/**
 * Error handler component for route errors
 */
function RouteErrorHandler({
  error,
  resetErrorBoundary,
  url,
  routeId,
}: {
  error: Error;
  resetErrorBoundary: () => void;
  url?: string;
  routeId?: string;
}) {
  const { components } = useVyuh();

  return components.renderError({
    title: `Failed to load route: ${url || routeId}`,
    error,
    onRetry: resetErrorBoundary,
  });
}

/**
 * A component that builds a route from a URL or route ID
 */
export function RouteBuilder({
  url,
  routeId,
  allowRefresh = true,
}: RouteBuilderProps) {
  const { components } = useVyuh();
  const [key, setKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <ErrorBoundary
        key={key}
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <RouteErrorHandler
            error={error}
            resetErrorBoundary={resetErrorBoundary}
            url={url}
            routeId={routeId}
          />
        )}
      >
        <Suspense fallback={components.routeLoader()}>
          <RouteContent url={url} routeId={routeId} />
        </Suspense>
      </ErrorBoundary>

      {allowRefresh && (
        <button
          onClick={handleRefresh}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f0f0f0',
            border: '1px solid #ccc',
          }}
        >
          ↻
        </button>
      )}
    </>
  );
}
