import React, { useEffect } from 'react';
import { create } from 'zustand';
import { PluginDescriptor } from './plugins/plugin-descriptor';
import { FeatureDescriptor } from './feature-descriptor';
import { PlatformComponentBuilder } from './platform-component-builder';
import { bootstrap } from './platform/platform-bootstrap';
import { InitState } from './platform/platform-init-tracker';

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
  const { initState, error, componentBuilder } = useVyuhStore();
  const bootstrapRef = React.useRef<AbortController | null>(null);

  // Start the bootstrap process
  useEffect(() => {
    // Create abort controller for cancellation
    bootstrapRef.current = new AbortController();
    const signal = bootstrapRef.current.signal;

    // Start bootstrap process
    const bootstrapProcess = async () => {
      try {
        await bootstrap({
          plugins,
          features,
          components,
          initialLocation,
        });

        // Check if we were cancelled
        if (signal.aborted) return;
      } catch (error) {
        // Error is already handled in bootstrap
        console.error('Bootstrap process failed:', error);
      }
    };

    bootstrapProcess();

    // Cleanup on unmount
    return () => {
      // Abort any ongoing operations
      if (bootstrapRef.current) {
        bootstrapRef.current.abort();
        bootstrapRef.current = null;
      }

      // Dispose plugins
      plugins.plugins.forEach((plugin) => {
        plugin.dispose();
      });
    };
  }, [plugins, components, features, initialLocation]);

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
        useVyuhStore.getState().reset();
        bootstrap({
          plugins,
          features,
          components,
          initialLocation,
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
    state: {
      initialized: store.initState === InitState.ready,
      features: store.features,
      error: store.error,
      initState: store.initState,
    },
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
