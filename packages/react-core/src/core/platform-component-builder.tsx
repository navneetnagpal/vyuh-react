import { PoweredByVyuh } from '@/components/powered-by-vyuh';
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
    <div className={'vc:flex vc:h-screen vc:flex-col vc:items-center vc:justify-center vc:p-2'}>
      <Loader className={'vc:animate-spin'} />
      <div>Loading application...</div>
      <PoweredByVyuh />
    </div>
  );
}

function DefaultContentLoader() {
  return (
    <div className={'vc:flex vc:flex-col vc:items-center vc:justify-center vc:p-2'}>
      <Loader className={'vc:animate-spin'} />
      <div>Loading content...</div>
      <PoweredByVyuh />
    </div>
  );
}

function DefaultRouteLoader() {
  return (
    <div
      className={'vc:flex vc:flex-col vc:items-center vc:justify-center vc:bg-white vc:px-8 vc:py-4'}
    >
      <Loader className={'vc:animate-spin'} />
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
    <div className="vc:m-2 vc:mx-auto vc:max-w-lg vc:rounded vc:border vc:border-red-200 vc:bg-red-50 vc:p-4 vc:text-sm vc:shadow-sm">
      <h2 className="vc:mb-4 vc:font-mono vc:font-semibold vc:text-red-700">{title}</h2>
      {error && (
        <pre className="vc:mb-4 vc:max-h-48 vc:overflow-auto vc:rounded vc:bg-white vc:p-4 vc:font-mono vc:text-red-600">
          {error.message}
        </pre>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="vc:mt-2 vc:cursor-pointer vc:rounded vc:bg-red-500 vc:px-2 vc:py-1 vc:font-medium vc:text-white vc:transition-colors hover:vc:bg-red-800"
        >
          Retry
        </button>
      )}

      <div className="vc:flex vc:justify-center">
        <PoweredByVyuh className={'vc:inline-block'} />
      </div>
    </div>
  );
}
