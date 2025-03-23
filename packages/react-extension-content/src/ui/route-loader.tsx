'use client';

import { AsyncContentContainer } from '@/ui/async-content-container';
import { RouteBase, useVyuh } from '@vyuh/react-core';
import { RefreshCcw } from 'lucide-react';
import React, { useCallback, useState } from 'react';

/**
 * Props for the RouteBuilder component
 */
export interface RouteLoaderProps {
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

  /**
   * Whether to use live updates (observable-based) instead of one-time loading
   */
  live?: boolean;
}

/**
 * A component that builds a route from a URL or route ID
 */
export function RouteLoader({
  url,
  routeId,
  allowRefresh = true,
  live = false,
}: RouteLoaderProps) {
  const { plugins } = useVyuh();
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Simple function to trigger a refresh by incrementing the counter
  const handleRefresh = useCallback(() => {
    setRefreshCounter((prev) => prev + 1);
  }, []);

  // This function will be called each time the component is mounted/refreshed
  const fetchContent = useCallback(() => {
    if (!url && !routeId) {
      throw new Error('Either url or routeId must be provided');
    }

    if (live) {
      // Return the observable directly for live updates
      return plugins.content.provider.live.fetchRoute({
        path: url,
        routeId,
      });
    } else {
      // Return a promise for one-time loading
      return plugins.content.provider.fetchRoute({
        path: url,
        routeId,
      });
    }
  }, [plugins.content.provider, url, routeId, refreshCounter, live]);

  // Render the route content
  const renderContent = useCallback(
    (route: RouteBase) => {
      return plugins.content.render(route);
    },
    [plugins.content],
  );

  return (
    <>
      <AsyncContentContainer
        fetchContent={fetchContent}
        renderContent={renderContent}
        errorTitle={`Failed to render route: ${url || routeId}`}
        onRetry={handleRefresh}
      />

      {allowRefresh && (
        <button
          onClick={handleRefresh}
          className={`z-1000 fixed bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-600 text-white transition-colors ease-in-out hover:bg-gray-300 hover:text-gray-700 hover:shadow-md`}
          title={'Refresh Route'}
        >
          <RefreshCcw size={16} />
        </button>
      )}
    </>
  );
}
