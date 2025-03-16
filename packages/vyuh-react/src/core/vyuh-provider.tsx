'use client';

import { useVyuhStore } from '@/hooks/use-vyuh';
import React from 'react';
import { FeatureDescriptor } from './feature-descriptor';
import { PlatformComponentBuilder } from './platform-component-builder';
import { bootstrap, InitState } from './platform/platform-bootstrap';
import { PluginDescriptor } from './plugins/plugin-descriptor';
import { DefaultContentPlugin } from './plugins/content/default-content-plugin';
import { NoOpContentProvider } from './content/noop-content-provider';
import { DefaultTelemetryPlugin } from './plugins/telemetry/default-telemetry-plugin';
import { DefaultEventPlugin } from './plugins/event/default-event-plugin';

// Provider props
interface VyuhProviderProps {
  children: React.ReactNode;
  plugins?: Partial<PluginDescriptor> | Record<string, never>;
  features: () => FeatureDescriptor[] | Promise<FeatureDescriptor[]>;
  components?: PlatformComponentBuilder;
  initialLocation?: string;
}

// Provider component
export const VyuhProvider: React.FC<VyuhProviderProps> = ({
  children,
  plugins = {},
  features,
  components = PlatformComponentBuilder.system,
  initialLocation,
}) => {
  const { initState, error, componentBuilder, reset, setError } =
    useVyuhStore();
  const bootstrapRef = React.useRef<AbortController | null>(null);

  // Create plugin descriptor with defaults
  const pluginDescriptor = React.useMemo(() => {
    // Create default plugins
    const defaultContent = new DefaultContentPlugin(new NoOpContentProvider());
    const defaultTelemetry = new DefaultTelemetryPlugin();
    const defaultEvent = new DefaultEventPlugin();

    // If plugins is an instance of PluginDescriptor, use it directly
    if (plugins instanceof PluginDescriptor) {
      // Ensure default plugins are present if not provided
      return new PluginDescriptor({
        content: plugins.content || defaultContent,
        telemetry: plugins.telemetry || defaultTelemetry,
        event: plugins.event || defaultEvent,
      });
    }

    // Otherwise, create a new PluginDescriptor with defaults
    return new PluginDescriptor({
      content: (plugins as any)?.content || defaultContent,
      telemetry: (plugins as any)?.telemetry || defaultTelemetry,
      event: (plugins as any)?.event || defaultEvent,
    });
  }, [plugins]);

  // Store references to props to avoid closure issues
  const pluginsRef = React.useRef(pluginDescriptor);
  const featuresRef = React.useRef(features);
  const componentsRef = React.useRef(components);
  const initialLocationRef = React.useRef(initialLocation);

  // Update refs when props change
  React.useEffect(() => {
    pluginsRef.current = pluginDescriptor;
    featuresRef.current = features;
    componentsRef.current = components;
    initialLocationRef.current = initialLocation;
  }, [pluginDescriptor, features, components, initialLocation]);

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
    return componentBuilder.renderError({ error });
  }

  if (initState !== InitState.ready) {
    return componentBuilder.renderAppLoader({ state: initState });
  }

  return children;
};
