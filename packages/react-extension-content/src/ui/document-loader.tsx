'use client';

import { AsyncContentContainer } from '@/ui/async-content-container';
import { ContentItem, useVyuh, useVyuhStore } from '@vyuh/react-core';
import { RefreshCcw } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Observable } from 'rxjs';

/**
 * Props for the DocumentLoader component
 */
export interface DocumentLoaderProps<TContent extends ContentItem> {
  /**
   * Function to fetch content
   * Returns either a Promise (one-time loading) or Observable (live updates)
   */
  fetchContent: () =>
    | Promise<TContent | undefined>
    | Observable<TContent | undefined>;

  /**
   * Custom render function for the content
   * If not provided, uses the content plugin's render method
   */
  renderContent?: (content: TContent) => React.ReactNode;

  /**
   * Whether to allow refreshing the document
   */
  allowRefresh?: boolean;

  /**
   * Error title to display when content fetching fails
   */
  errorTitle?: string;
}

/**
 * Component that loads and renders a document from the content provider
 */
export function DocumentLoader<TContent extends ContentItem>({
  fetchContent,
  renderContent: customRenderContent,
  allowRefresh = true,
  errorTitle,
}: DocumentLoaderProps<TContent>) {
  const { plugins } = useVyuh();
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Simple function to trigger a refresh by incrementing the counter
  const handleRefresh = useCallback(() => {
    setRefreshCounter((prev) => prev + 1);
  }, []);

  // Wrap the fetchContent function to include the refresh counter
  const fetchContentWithRefresh = useCallback(() => {
    return fetchContent();
  }, [fetchContent, refreshCounter]);

  // Render the document content
  const renderContentFn = useCallback(
    (content: TContent) => {
      if (customRenderContent) {
        return customRenderContent(content);
      }
      return plugins.content.render(content);
    },
    [plugins.content, customRenderContent],
  );

  return (
    <>
      <AsyncContentContainer
        fetchContent={fetchContentWithRefresh}
        renderContent={renderContentFn}
        errorTitle={errorTitle || 'Failed to render document'}
        onRetry={handleRefresh}
      />

      {allowRefresh && (
        <button
          onClick={handleRefresh}
          className={`vxc:z-1000 vxc:fixed vxc:bottom-2 vxc:right-2 vxc:flex vxc:h-8 vxc:w-8 vxc:cursor-pointer vxc:items-center vxc:justify-center vxc:rounded-full vxc:bg-gray-600 vxc:text-white vxc:transition-colors vxc:ease-in-out vxc:hover:bg-gray-300 vxc:hover:text-gray-700 vxc:hover:shadow-md`}
          title={'Refresh Document'}
        >
          <RefreshCcw size={16} />
        </button>
      )}
    </>
  );
}

/**
 * Creates a fetch function for fetching content by query
 */
export function fetchWithQuery<TContent extends ContentItem>(
  query: string,
  options?: {
    queryParams?: Record<string, any>;
    live?: boolean;
  },
) {
  return () => {
    const { plugins } = useVyuhStore.getState();

    if (options?.live) {
      const supportsLive = plugins.content.provider.supportsLive;
      const liveProvider = plugins.content.provider.live;
      if (!supportsLive || !liveProvider) {
        throw new Error('Live updates not supported');
      }

      return liveProvider.fetchSingle<TContent>(query, {
        params: options?.queryParams,
        includeDrafts: process.env.NODE_ENV === 'development',
      });
    } else {
      return plugins.content.provider.fetchSingle<TContent>(query, {
        queryParams: options?.queryParams,
      });
    }
  };
}

/**
 * Creates a fetch function for fetching content by ID
 */
export function fetchWithId<TContent extends ContentItem>(
  documentId: string,
  options?: {
    live?: boolean;
  },
) {
  return () => {
    const { plugins } = useVyuhStore.getState();

    if (options?.live) {
      const supportsLive = plugins.content.provider.supportsLive;
      const liveProvider = plugins.content.provider.live;
      if (!supportsLive || !liveProvider) {
        throw new Error('Live updates not supported');
      }

      return liveProvider.fetchById<TContent>(documentId, {
        includeDrafts: process.env.NODE_ENV === 'development',
      });
    } else {
      return plugins.content.provider.fetchById<TContent>(documentId);
    }
  };
}
