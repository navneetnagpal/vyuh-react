import { LayoutConfiguration } from '@vyuh/react-core';
import { ContentDescriptor } from '@vyuh/react-extension-content';
import { Route } from '@/content/route';
import { RouteLifecycleConfiguration } from '@/content/route-lifecycle-configuration';

/**
 * Descriptor for configuring route content type in the system.
 *
 * Allows configuring:
 * - Lifecycle handlers for route initialization and cleanup
 * - Available layouts for routes
 */
export class RouteDescriptor extends ContentDescriptor {
  /**
   * Lifecycle handlers available for routes
   */
  readonly lifecycleHandlers?: RouteLifecycleConfiguration[];

  /**
   * Creates a new route descriptor
   */
  constructor({
    lifecycleHandlers,
    layouts,
  }: {
    lifecycleHandlers?: RouteLifecycleConfiguration[];
    layouts?: LayoutConfiguration[];
  } = {}) {
    super({
      schemaType: Route.schemaName,
      title: 'Route',
      layouts,
    });

    this.lifecycleHandlers = lifecycleHandlers;
  }
}
