import { ActionConfiguration, ObjectReference, TypeDescriptor, useVyuhStore } from '@vyuh/react-core';

/**
 * Action configuration for navigating to a URL or route reference.
 *
 * This action uses the router to navigate to a specified path or route.
 *
 * Example usage:
 * ```typescript
 * // Navigate by URL
 * const urlAction = new NavigateAction({
 *   url: '/dashboard',
 *   navigationType: 'push',
 * });
 *
 * // Navigate by route reference
 * const routeAction = new NavigateAction({
 *   routeId: 'route-123',
 *   navigationType: 'push',
 * });
 * ```
 */
export class NavigateAction extends ActionConfiguration {
  /**
   * Schema type for the navigate action
   */
  static readonly schemaType = 'vyuh.action.navigation';

  /**
   * Type descriptor for the navigate action
   */
  static readonly typeDescriptor = new TypeDescriptor(this.schemaType, this);

  /**
   * The URL to navigate to (used when linkType is 'url')
   */
  readonly url?: string;

  /**
   * The route ID reference to navigate to (used when linkType is 'route')
   */
  readonly route?: ObjectReference;

  /**
   * The type of link - either direct URL or route reference
   */
  readonly linkType?: 'route' | 'url';

  /**
   * The navigation type - push adds to history, replace changes current entry
   */
  readonly navigationType?: 'push' | 'replace' | 'go';

  /**
   * Creates a new navigate action
   */
  constructor(data?: Partial<NavigateAction>) {
    super({
      schemaType: NavigateAction.schemaType,
      title: 'Navigate',
      isAwaited: data?.isAwaited,
    });

    this.url = data?.url;
    this.route = data?.route ? new ObjectReference(data?.route) : undefined;
    this.linkType = data?.linkType || (data?.route ? 'route' : 'url');
    this.navigationType = data?.navigationType ?? 'push';
  }

  /**
   * Executes the navigation action
   */
  async execute(): Promise<void> {
    const { plugins, showLoader, hideLoader } = useVyuhStore.getState();

    // Determine the target URL
    let targetUrl: string | undefined;

    if (this.linkType === 'route' && this.route) {
      // Show loading overlay if enabled
      showLoader();

      try {
        // Fetch the route by ID to get its path
        const route = await plugins.content.provider.fetchRoute({
          routeId: this.route.ref,
        });

        if (!route) {
          plugins.telemetry?.log(
            `Route not found: ${this.route.ref}`,
            'warning',
          );
          return;
        }

        targetUrl = route.path;
      } finally {
        // Hide loading overlay
        hideLoader();
      }
    } else {
      // Direct URL navigation
      targetUrl = this.url;
    }

    if (!targetUrl) {
      plugins.telemetry?.log(
        'No URL or route provided for navigation',
        'warning',
      );
      return;
    }

    // Perform the navigation
    const replace = this.navigationType === 'replace';
    if (replace) {
      plugins.navigation.replace(targetUrl);
    } else {
      plugins.navigation.push(targetUrl);
    }
  }
}
