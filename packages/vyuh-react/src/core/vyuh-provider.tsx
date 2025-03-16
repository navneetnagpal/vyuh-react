'use client';

import React from 'react';
import { create } from 'zustand';
import { FeatureDescriptor } from './feature-descriptor';
import { PlatformComponentBuilder } from './platform-component-builder';
import { bootstrap } from './platform/platform-bootstrap';
import { InitState } from './platform/platform-init-tracker';
import { PluginDescriptor } from './plugins/plugin-descriptor';

// Core platform state
export interface VyuhPlatformState {
  initState: InitState;
  features: FeatureDescriptor[];
  error: Error | null;
  plugins: PluginDescriptor;
  componentBuilder: PlatformComponentBuilder;
}

// Store actions
interface VyuhPlatformActions {
  setInitState: (state: InitState) => void;
  setFeatures: (features: FeatureDescriptor[]) => void;
  setError: (error: Error | null) => void;
  init: (options: {
    plugins: PluginDescriptor;
    components: PlatformComponentBuilder;
  }) => void;
  reset: () => void;
}

// Create Zustand store
export const useVyuhStore = create<VyuhPlatformState & VyuhPlatformActions>(
  (set) => ({
    initState: InitState.notStarted,
    features: [],
    error: null,
    plugins: new PluginDescriptor(),
    componentBuilder: PlatformComponentBuilder.system,

    setInitState: (initState) => set({ initState }),
    setFeatures: (features) => set({ features }),
    setError: (error) =>
      set({
        error,
        initState: error ? InitState.error : InitState.notStarted,
      }),
    init: ({ plugins, components }) =>
      set({
        plugins,
        componentBuilder: components,
        initState: InitState.notStarted,
        error: null,
      }),
    reset: () =>
      set({
        initState: InitState.notStarted,
        error: null,
      }),
  }),
);

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

// Hook to use Vyuh platform
export function useVyuh() {
  const store = useVyuhStore();

  return {
    features: store.features,
    plugins: store.plugins,
    components: store.componentBuilder,
  };
}

// Hook to restart the platform
export function useRestartPlatform() {
  return {
    restart: async (
      options: {
        initialState?: InitState;
        onRestart?: () => Promise<void>;
      } = {},
    ) => {
      const { initialState = InitState.notStarted, onRestart } = options;
      const store = useVyuhStore.getState();

      // Reset the store
      store.reset();

      // Set pending status
      store.setInitState(initialState);

      // Call the restart callback if provided
      if (onRestart) {
        try {
          await onRestart();
        } catch (error) {
          store.setError(
            error instanceof Error ? error : new Error(String(error)),
          );
          throw error;
        }
      }
    },
  };
}
