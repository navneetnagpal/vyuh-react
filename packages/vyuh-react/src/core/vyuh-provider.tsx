'use client';

import { useVyuhStore } from '@/hooks/use-vyuh';
import React from 'react';
import { FeatureDescriptor } from './feature-descriptor';
import { PlatformComponentBuilder } from './platform-component-builder';
import { bootstrap, InitState } from './platform/platform-bootstrap';
import { PluginDescriptor } from './plugins/plugin-descriptor';

// Provider props
interface VyuhProviderProps {
  children: React.ReactNode;
  plugins?: PluginDescriptor;
  features: () => FeatureDescriptor[] | Promise<FeatureDescriptor[]>;
  components?: PlatformComponentBuilder;
  initialLocation?: string;
}

// Provider component
export const VyuhProvider: React.FC<VyuhProviderProps> = ({
  children,
  plugins = new PluginDescriptor(),
  features,
  components = PlatformComponentBuilder.system,
  initialLocation,
}) => {
  const { initState, error, componentBuilder, reset, setError } =
    useVyuhStore();
  const bootstrapRef = React.useRef<AbortController | null>(null);

  // Store the initial props in refs to avoid dependency changes
  const pluginsRef = React.useRef(plugins);
  const featuresRef = React.useRef(features);
  const componentsRef = React.useRef(components);
  const initialLocationRef = React.useRef(initialLocation);

  // Update refs when props change (without triggering effect)
  if (plugins !== pluginsRef.current) pluginsRef.current = plugins;
  if (features !== featuresRef.current) featuresRef.current = features;
  if (components !== componentsRef.current) componentsRef.current = components;
  if (initialLocation !== initialLocationRef.current)
    initialLocationRef.current = initialLocation;

  // Start the bootstrap process - with empty dependency array
  React.useEffect(() => {
    const runBootstrap = async () => {
      // Clean up previous bootstrap if exists
      if (bootstrapRef.current) {
        bootstrapRef.current.abort();
        bootstrapRef.current = null;
      }

      // Reset store to clean state
      reset();

      // Create abort controller for cancellation
      bootstrapRef.current = new AbortController();
      const signal = bootstrapRef.current.signal;

      try {
        await bootstrap({
          plugins: pluginsRef.current,
          features: featuresRef.current,
          components: componentsRef.current,
          initialLocation: initialLocationRef.current,
        });

        // Check if we were cancelled
        if (signal.aborted) return;
      } catch (error) {
        if (!signal.aborted) {
          const finalError =
            error instanceof Error ? error : new Error(String(error));
          setError(finalError);
        }
      }
    };

    runBootstrap();

    // Cleanup on unmount
    return () => {
      // Abort any ongoing operations
      if (bootstrapRef.current) {
        bootstrapRef.current.abort();
        bootstrapRef.current = null;
      }

      // Dispose plugins
      pluginsRef.current.plugins.forEach((plugin) => {
        try {
          plugin.dispose();
        } catch (error) {}
      });
    };
  }, []); // Empty dependency array - only run on mount/unmount

  // Render based on initialization state
  if (
    initState === InitState.notStarted ||
    initState === InitState.plugins ||
    initState === InitState.features
  ) {
    return componentBuilder.appLoader();
  }

  if (initState === InitState.error) {
    return componentBuilder.errorView({
      title: 'Failed to load app',
      error,
      onRetry: () => {
        // Reset and retry initialization
        reset();

        // Force a re-bootstrap by creating a new AbortController
        if (bootstrapRef.current) {
          bootstrapRef.current.abort();
          bootstrapRef.current = null;
        }

        // Re-run the bootstrap process with proper error handling
        bootstrap({
          plugins: pluginsRef.current,
          features: featuresRef.current,
          components: componentsRef.current,
          initialLocation: initialLocationRef.current,
        }).catch((error) => {
          const finalError =
            error instanceof Error ? error : new Error(String(error));
          setError(finalError);
        });
      },
    });
  }

  // initState === InitState.ready
  return <>{children}</>;
};
