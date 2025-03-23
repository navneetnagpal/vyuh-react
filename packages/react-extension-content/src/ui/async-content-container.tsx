'use client';

import {
  IAsyncResource,
  ILiveAsyncResource,
  createAsyncResource,
} from '@/ui/async-resource';
import { ErrorBoundary } from '@/ui/error-boundary';
import { useVyuh } from '@vyuh/react-core';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Observable } from 'rxjs';

/**
 * Props for AsyncContentContainer
 */
export interface AsyncContentContainerProps<T> {
  /**
   * Async function that loads the content
   * Can return either a Promise or an Observable
   */
  loadContent: () => Promise<T> | Observable<T>;

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
  resource: IAsyncResource<T>;
  renderContent: (content: T) => React.ReactNode;
}) {
  // Force re-render when resource updates (only for Observable-backed resources)
  const [, forceUpdate] = useState({});

  // Subscribe to resource updates only if it's a live resource
  useEffect(() => {
    if (resource.isLive()) {
      // Cast to ILiveAsyncResource to access subscribe method
      const liveResource = resource as ILiveAsyncResource<T>;

      // This will be called whenever the observable emits a new value
      // Clean up subscription when component unmounts
      return liveResource.subscribe(() => {
        forceUpdate({});
      });
    }
    return undefined;
  }, [resource]);

  // This will either throw a promise (suspense) or return the content
  const content = resource.read();
  return <>{content && renderContent(content)}</>;
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
  const { components } = useVyuh();

  // Add a key to force remounting of the ErrorBoundary when retrying
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);

  // Store loadContent in a ref to detect actual changes
  const loadContentRef = React.useRef(loadContent);

  // Use useState to manage the resource, but initialize with null
  const [resource, setResource] = useState<IAsyncResource<T> | null>(null);

  // Create the initial resource in an effect
  useEffect(() => {
    // Create the initial resource using the factory function
    const initialResource = createAsyncResource(loadContent());
    setResource(initialResource);

    // Cleanup function
    return () => {
      initialResource.dispose();
    };
  }, []); // Empty dependency array - only run once on mount

  // Handle loadContent function changes
  useEffect(() => {
    // Skip if the function reference hasn't actually changed or if initial resource isn't created yet
    if (loadContent === loadContentRef.current || !resource) {
      return;
    }

    // Update the ref
    loadContentRef.current = loadContent;

    // Create a new resource with the updated loadContent using the factory function
    const newResource = createAsyncResource(loadContent());

    // Dispose the old resource
    resource.dispose();

    // Update the resource state
    setResource(newResource);

    // Reset the error boundary
    setErrorBoundaryKey((prev) => prev + 1);
  }, [loadContent, resource]);

  // Enhanced retry handler
  const handleRetry = useCallback(() => {
    if (!resource) return;

    // Create a new resource using the factory function
    const newResource = createAsyncResource(loadContent());

    // Dispose the old resource
    resource.dispose();

    // Update the resource state
    setResource(newResource);

    // Reset the error boundary
    setErrorBoundaryKey((prev) => prev + 1);

    // Call the provided onRetry if it exists
    onRetry?.();
  }, [loadContent, onRetry, resource]);

  // If resource is null, show a loading state
  if (!resource) {
    return components.renderContentLoader();
  }

  return (
    <ErrorBoundary
      key={errorBoundaryKey}
      title={errorTitle}
      onRetry={handleRetry}
    >
      <Suspense fallback={components.renderContentLoader()}>
        <AsyncContentLoader resource={resource} renderContent={renderContent} />
      </Suspense>
    </ErrorBoundary>
  );
}
