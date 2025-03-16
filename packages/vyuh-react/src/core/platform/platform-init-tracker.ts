import { create } from 'zustand';

export enum InitState {
  notStarted = 'not_started',
  plugins = 'plugins',
  features = 'features',
  ready = 'ready',
  error = 'error'
}

interface PlatformInitState {
  currentState: InitState;
  error: Error | null;
  status: 'pending' | 'fulfilled' | 'rejected' | null;
}

interface PlatformInitActions {
  setState: (state: InitState) => void;
  setError: (error: Error) => void;
  setStatus: (status: 'pending' | 'fulfilled' | 'rejected' | null) => void;
  reset: () => void;
}

// Create a store for platform initialization tracking
export const usePlatformInitStore = create<PlatformInitState & PlatformInitActions>((set) => ({
  currentState: InitState.notStarted,
  error: null,
  status: null,
  
  setState: (currentState) => set({ currentState }),
  setError: (error) => set({ error, currentState: InitState.error }),
  setStatus: (status) => set({ status }),
  reset: () => set({ 
    currentState: InitState.notStarted, 
    error: null, 
    status: null 
  })
}));

/**
 * Hook to restart the platform initialization
 */
export function useRestartPlatform() {
  return {
    restart: async (options: {
      initialState?: InitState;
      onRestart?: () => Promise<void>;
    } = {}) => {
      const { initialState = InitState.notStarted, onRestart } = options;
      const store = usePlatformInitStore.getState();
      
      // Reset the store
      store.reset();
      
      // Set pending status
      store.setStatus('pending');
      store.setState(initialState);
      
      // Call the restart callback if provided
      if (onRestart) {
        try {
          await onRestart();
        } catch (error) {
          store.setError(error instanceof Error ? error : new Error(String(error)));
          store.setStatus('rejected');
          throw error;
        }
      }
    }
  };
}
