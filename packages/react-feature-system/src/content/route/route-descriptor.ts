import { Route, ROUTE_SCHEMA_TYPE } from '@/content/route/route';
import { RouteLifecycleConfiguration } from '@/content/route/route-lifecycle-configuration';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Descriptor for configuring route content type in the system.
 *
 * Allows configuring:
 * - Lifecycle handlers for route initialization and cleanup
 * - Available layouts for routes
 */
export class RouteDescriptor extends ContentDescriptor<Route> {
  /**
   * Lifecycle handlers available for routes
   */
  readonly lifecycleHandlers?: RouteLifecycleConfiguration[];

  /**
   * Creates a new route descriptor
   */
  constructor(props?: Partial<RouteDescriptor>) {
    super({
      schemaType: ROUTE_SCHEMA_TYPE,
      title: 'Route',
      layouts: props?.layouts,
    });

    this.lifecycleHandlers = props?.lifecycleHandlers;
  }
}
