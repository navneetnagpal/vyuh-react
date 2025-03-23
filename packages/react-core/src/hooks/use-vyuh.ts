'use client';

import { FeatureDescriptor } from '@/core/feature-descriptor';
import { PlatformComponentBuilder } from '@/core/platform-component-builder';
import { InitState } from '@/core/platform-types';
import { PluginDescriptor } from '@/core/plugin-descriptor';
import { create } from 'zustand/index';

export interface VyuhPlatformState {
  initState: InitState;
  features: FeatureDescriptor[];
  error: Error | null;
  plugins: PluginDescriptor;
  componentBuilder: PlatformComponentBuilder;
  loader: {
    isVisible: boolean;
    message: string;
  };
}

// Store actions
export interface VyuhPlatformActions {
  setInitState: (initState: InitState) => void;
  setFeatures: (features: FeatureDescriptor[]) => void;
  setError: (error: Error | null) => void;
  init: (options: {
    plugins: PluginDescriptor;
    components: PlatformComponentBuilder;
  }) => void;
  reset: () => void;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

// Create Zustand store
export const useVyuhStore = create<VyuhPlatformState & VyuhPlatformActions>(
  (set) => ({
    initState: InitState.notStarted,
    features: [],
    error: null,
    plugins: new PluginDescriptor(),
    componentBuilder: PlatformComponentBuilder.system,
    loader: {
      isVisible: false,
      message: 'Loading...',
    },

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
    showLoader: (message = 'Loading...') => {
      set({ loader: { isVisible: true, message } });
    },
    hideLoader: () => {
      return set({ loader: { isVisible: false, message: '' } });
    },
  }),
);

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
