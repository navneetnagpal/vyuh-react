import React from 'react';

/**
 * Builder for platform-specific UI components
 */
export class PlatformComponentBuilder {
  /**
   * Build the app loader component shown during initial app load
   */
  renderAppLoader: () => React.ReactNode;

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
  renderError: (props: {
    title: string;
    error: Error | null;
    onRetry?: () => void;
  }) => React.ReactNode;

  constructor({
    appLoader,
    contentLoader,
    routeLoader,
    errorView,
  }: {
    appLoader: () => React.ReactNode;
    contentLoader: () => React.ReactNode;
    routeLoader: () => React.ReactNode;
    errorView: (props: {
      title: string;
      error: Error | null;
      onRetry?: () => void;
    }) => React.ReactNode;
  }) {
    this.renderAppLoader = appLoader;
    this.contentLoader = contentLoader;
    this.routeLoader = routeLoader;
    this.renderError = errorView;
  }

  /**
   * Creates a copy of this builder with specified overrides
   */
  copyWith(
    overrides: Partial<PlatformComponentBuilder>,
  ): PlatformComponentBuilder {
    return new PlatformComponentBuilder({
      appLoader: overrides.renderAppLoader || this.renderAppLoader,
      contentLoader: overrides.contentLoader || this.contentLoader,
      routeLoader: overrides.routeLoader || this.routeLoader,
      errorView: overrides.renderError || this.renderError,
    });
  }

  /**
   * Default system implementation
   */
  static readonly system: PlatformComponentBuilder =
    new PlatformComponentBuilder({
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
    });
}
