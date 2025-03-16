import React from 'react';

/**
 * Builder for platform-specific UI components
 */
export interface PlatformComponentBuilder {
  /**
   * Build the app loader component shown during initial app load
   */
  appLoader: () => React.ReactNode;

  /**
   * Build the content loader component shown when loading content
   */
  contentLoader: () => React.ReactNode;

  /**
   * Build the route loader component shown during route transitions
   */
  routeLoader: () => React.ReactNode;

  /**
   * Build the error view component shown when an error occurs
   */
  errorView: (props: {
    title: string;
    error: Error | null;
    onRetry?: () => void;
  }) => React.ReactNode;
}

/**
 * Default implementation of PlatformComponentBuilder
 */
export const DefaultPlatformComponentBuilder: PlatformComponentBuilder = {
  appLoader: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>Loading application...</div>
    </div>
  ),

  contentLoader: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div>Loading content...</div>
    </div>
  ),

  routeLoader: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div>Loading route...</div>
    </div>
  ),

  errorView: ({ title, error, onRetry }) => (
    <div style={{ padding: '2rem', color: 'red' }}>
      <h2>{title}</h2>
      {error && <pre>{error.message}</pre>}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      )}
    </div>
  ),
};

/**
 * Static methods for PlatformComponentBuilder
 */
export const PlatformComponentBuilder = {
  /**
   * Default system implementation
   */
  get system(): PlatformComponentBuilder {
    return DefaultPlatformComponentBuilder;
  },
};
