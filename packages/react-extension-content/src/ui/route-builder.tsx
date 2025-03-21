'use client';

import { ErrorBoundary } from '@/ui/async-content-container';
import { RouteBase, useVyuh } from '@vyuh/react-core';
import { RefreshCcw } from 'lucide-react';
import React, { Suspense, useCallback, useEffect, useState } from 'react';

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
 * Route content component that handles data fetching
 */
function RouteContent({ url, routeId }: { url?: string; routeId?: string }) {
  const { plugins } = useVyuh();
  const [route, setRoute] = useState<RouteBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRoute() {
      try {
        if (!url && !routeId) {
          throw new Error('Either url or routeId must be provided');
        }

        setLoading(true);
        setError(null);

        const routeData = await plugins.content.provider.fetchRoute({
          path: url,
          routeId,
        });

        if (!isMounted) return;

        setRoute(routeData);
      } catch (err) {
        if (!isMounted) return;
        // Ensure we're working with an Error object
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        // This will propagate to the error boundary
        throw errorObj;
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRoute();

    return () => {
      isMounted = false;
    };
  }, [plugins.content, url, routeId]);

  // If there's an error, throw it to be caught by the error boundary
  if (error) {
    throw error;
  }

  if (loading) {
    return null; // Let Suspense handle the loading state
  }

  if (!route) {
    throw new Error(`No route found for ${url || routeId}`);
  }

  return plugins.content.render(route);
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
    <ErrorBoundary title={`Failed to render route: ${url || routeId}`}>
      <Suspense fallback={components.renderRouteLoader()}>
        <RouteContent url={url} routeId={routeId} />
      </Suspense>

      {allowRefresh && (
        <button
          onClick={handleRefresh}
          className={`fixed bottom-2 right-2 z-1000 rounded-full w-8 h-8 flex items-center justify-center bg-gray-400 text-white
          hover:bg-gray-300 hover:text-gray-700 transition-colors ease-in-out
          cursor-pointer`}
          title={'Refresh Route'}
        >
          <RefreshCcw size={16} />
        </button>
      )}
    </ErrorBoundary>
  );
}
