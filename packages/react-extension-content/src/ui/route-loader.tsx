'use client';

import { ContentItem, RouteBase, useVyuh } from '@vyuh/react-core';
import React, { useCallback } from 'react';
import { DocumentLoader } from './document-loader';

/**
 * Props for the RouteLoader component
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
 * A component that loads and renders a route from a URL or route ID
 */
export function RouteLoader({
  url,
  routeId,
  allowRefresh = true,
  live = false,
}: RouteLoaderProps) {
  const { plugins } = useVyuh();

  // Custom fetch function for routes
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
        includeDrafts: process.env.NODE_ENV === 'development',
      });
    } else {
      // Return a promise for one-time loading
      return plugins.content.provider.fetchRoute({
        path: url,
        routeId,
      });
    }
  }, [plugins.content.provider, url, routeId, live]);

  // Render the route content
  const renderContent = useCallback(
    (route: ContentItem | ContentItem[] | undefined) => {
      return plugins.content.render(route);
    },
    [plugins.content],
  );

  return (
    <DocumentLoader
      allowRefresh={allowRefresh}
      fetchContent={fetchContent}
      renderContent={renderContent}
      errorTitle={`Failed to render route: ${url || routeId}`}
    />
  );
}
