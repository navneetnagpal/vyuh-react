import { Loader } from 'lucide-react';
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
  renderContentLoader: () => React.ReactNode;

  /**
   * Build the route loader component shown during route transitions
   */
  renderRouteLoader: () => React.ReactNode;

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
    this.renderContentLoader = contentLoader;
    this.renderRouteLoader = routeLoader;
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
      contentLoader: overrides.renderContentLoader || this.renderContentLoader,
      routeLoader: overrides.renderRouteLoader || this.renderRouteLoader,
      errorView: overrides.renderError || this.renderError,
    });
  }

  /**
   * Default system implementation
   */
  static readonly system: PlatformComponentBuilder =
    new PlatformComponentBuilder({
      appLoader: () => <DefaultAppLoader />,

      contentLoader: () => <DefaultContentLoader />,

      routeLoader: () => <DefaultRouteLoader />,

      errorView: ({ title, error, onRetry }) => (
        <DefaultErrorView title={title} error={error} onRetry={onRetry} />
      ),
    });
}

function DefaultAppLoader() {
  return (
    <div className={'flex flex-col justify-center items-center h-screen p-2'}>
      <Loader className={'animate-spin'} />
      <div>Loading application...</div>
      <PoweredByVyuh />
    </div>
  );
}

function DefaultContentLoader() {
  return (
    <div className={'flex flex-col justify-center items-center p-2'}>
      <Loader className={'animate-spin'} />
      <div>Loading content...</div>
      <PoweredByVyuh />
    </div>
  );
}

function DefaultRouteLoader() {
  return (
    <div className={'flex flex-col justify-center items-center p-4 bg-white'}>
      <Loader className={'animate-spin'} />
      <div>Loading route...</div>
      <PoweredByVyuh />
    </div>
  );
}

function DefaultErrorView({
  title,
  error,
  onRetry,
}: {
  title: string;
  error: Error | null;
  onRetry?: () => void;
}) {
  return (
    <div className="p-4 mx-auto max-w-md bg-red-50 border border-red-200 rounded shadow-sm m-2">
      <h2 className="text-xl font-semibold text-red-700 mb-4">{title}</h2>
      {error && (
        <pre className="bg-white p-4 rounded text-red-600 text-sm overflow-auto max-h-48 mb-4">
          {error.message}
        </pre>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Retry
        </button>
      )}

      <PoweredByVyuh showBackground={false} />
    </div>
  );
}

function PoweredByVyuh({
  showBackground = true,
}: {
  showBackground?: boolean;
}) {
  return (
    <div
      className={`text-xs text-neutral-500 mt-4 text-center ${showBackground && 'bg-neutral-100'} rounded px-1`}
    >
      Powered by Vyuh
    </div>
  );
}
