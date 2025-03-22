import { NavigationPlugin } from '@/plugins/navigation/navigation-plugin';

/**
 * No-op implementation of NavigationPlugin.
 *
 * This plugin is used as a fallback when no navigation plugin is configured.
 * It provides helpful warning messages to guide developers.
 */
export class NoOpNavigationPlugin extends NavigationPlugin {
  constructor() {
    super('vyuh.plugin.navigation.noop', 'No Op Navigation Plugin');
  }

  push(url: string): void {
    console.warn(`NoOpNavigationPlugin: push called with ${url}`);
  }

  replace(url: string): void {
    console.warn(`NoOpNavigationPlugin: replace called with ${url}`);
  }

  back(): void {
    console.warn('NoOpNavigationPlugin: back called');
  }

  getCurrentPath(): string {
    console.warn('NoOpNavigationPlugin: getCurrentPath called');
    return '/';
  }

  async init(): Promise<void> {
    console.log(`[${this.name}] Initialized`);
  }

  async dispose(): Promise<void> {
    console.log(`[${this.name}] Disposed`);
  }
}
