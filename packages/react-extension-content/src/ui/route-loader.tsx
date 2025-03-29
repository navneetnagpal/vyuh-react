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
      const supportsLive = plugins.content.provider.supportsLive;
      const liveProvider = plugins.content.provider.live;
      if (!supportsLive || !liveProvider) {
        throw new Error('Live updates not supported');
      }

      // Return the observable directly for live updates
      return liveProvider.fetchRoute({
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
          className={`vxc:z-1000 vxc:fixed vxc:bottom-2 vxc:right-2 vxc:flex vxc:h-8 vxc:w-8 vxc:cursor-pointer vxc:items-center vxc:justify-center vxc:rounded-full vxc:bg-gray-600 vxc:text-white vxc:transition-colors vxc:ease-in-out vxc:hover:bg-gray-300 vxc:hover:text-gray-700 vxc:hover:shadow-md`}
          title={'Refresh Route'}
        >
          <RefreshCcw size={16} />
        </button>
      )}
    </>
  );
}
