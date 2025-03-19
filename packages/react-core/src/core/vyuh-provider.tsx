'use client';

import { FeatureDescriptor } from '@/core/feature-descriptor';
import { bootstrap } from '@/core/platform-bootstrap';
import { PlatformComponentBuilder } from '@/core/platform-component-builder';
import { InitState } from '@/core/platform-types';
import { PluginDescriptor } from '@/core/plugins/plugin-descriptor';
import { useVyuhStore } from '@/hooks/use-vyuh';
import React from 'react';

// Provider props
interface VyuhProviderProps {
  children: React.ReactNode;
  plugins?: Partial<PluginDescriptor>;
  features: () => FeatureDescriptor[] | Promise<FeatureDescriptor[]>;
  components?: PlatformComponentBuilder;
  initialLocation?: string;
}

// Provider component
export const VyuhProvider: React.FC<VyuhProviderProps> = ({
  children,
  plugins,
  features,
  components = PlatformComponentBuilder.system,
}) => {
  const { initState, error, componentBuilder, reset, setError } =
    useVyuhStore();
  const bootstrapRef = React.useRef<AbortController | null>(null);

  // Store references to props to avoid closure issues
  const pluginsRef = React.useRef(plugins);
  const featuresRef = React.useRef(features);
  const componentsRef = React.useRef(components);

  // Update refs when props change
  React.useEffect(() => {
    pluginsRef.current = plugins;
    featuresRef.current = features;
    componentsRef.current = components;
  }, [plugins, features, components]);

  // Bootstrap the platform
  React.useEffect(() => {
    const bootstrapPlatform = async () => {
      // Cancel any existing bootstrap
      if (bootstrapRef.current) {
        bootstrapRef.current.abort();
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

    bootstrapPlatform();

    // Cleanup on unmount
    return () => {
      if (bootstrapRef.current) {
        bootstrapRef.current.abort();
      }
    };
  }, [reset, setError]);

  // Render based on init state
  if (initState === InitState.error && error) {
    return componentBuilder.renderError({ title: 'Failed to load app', error });
  }

  if (initState !== InitState.ready) {
    return componentBuilder.renderAppLoader();
  }

  return children;
};
