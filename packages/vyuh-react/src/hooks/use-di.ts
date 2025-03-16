import { useVyuhPlatform } from '../core/VyuhProvider';

/**
 * Hook for accessing the dependency injection system
 */
export function useDI() {
  const { plugins } = useVyuhPlatform();

  return {
    /**
     * Get an instance of a registered dependency
     */
    get: <T>(key: string | symbol): T => {
      return plugins.di.get<T>(key);
    },

    /**
     * Register a dependency
     */
    register: <T>(key: string | symbol, factory: () => T): void => {
      plugins.di.register(key, factory);
    },
  };
}
