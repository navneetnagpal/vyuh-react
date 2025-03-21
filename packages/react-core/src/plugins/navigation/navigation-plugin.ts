import { Plugin } from '@/core/plugin';

/**
 * Plugin for handling navigation in Vyuh applications
 */
export abstract class NavigationPlugin extends Plugin {
  protected constructor(name: string, title: string) {
    super(name, title);
  }

  /**
   * Navigate to a URL, adding to history stack
   */
  abstract push(url: string): Promise<boolean> | void;

  /**
   * Navigate to a URL, replacing current history entry
   */
  abstract replace(url: string): Promise<boolean> | void;

  /**
   * Navigate back in history
   */
  abstract back(): void;

  /**
   * Get the current URL path
   */
  abstract getCurrentPath(): string;
}
