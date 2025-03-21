'use client';

import { AsyncContentContainer } from '@/ui/async-content-container';
import { RouteBase, useVyuh } from '@vyuh/react-core';
import { RefreshCcw } from 'lucide-react';
import React, { useCallback, useState } from 'react';

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
 * A component that builds a route from a URL or route ID
 */
export function RouteBuilder({
  url,
  routeId,
  allowRefresh = true,
}: RouteBuilderProps) {
  const { plugins } = useVyuh();
  const [key, setKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  const loadContent = useCallback(async () => {
    if (!url && !routeId) {
      throw new Error('Either url or routeId must be provided');
    }

    return await plugins.content.provider.fetchRoute({
      path: url,
      routeId,
    });
  }, [plugins.content.provider, url, routeId]);

  const renderContent = useCallback(
    (route: RouteBase) => {
      return plugins.content.render(route);
    },
    [plugins.content],
  );

  return (
    <>
      <AsyncContentContainer
        key={key}
        loadContent={loadContent}
        renderContent={renderContent}
        errorTitle={`Failed to render route: ${url || routeId}`}
        contentKey={`${url || routeId}-${key}`}
      />

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
    </>
  );
}
