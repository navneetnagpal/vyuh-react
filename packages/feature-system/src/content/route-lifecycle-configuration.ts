import { RouteBase, SchemaItem } from '@vyuh/react';

/**
 * Configuration for route lifecycle handlers.
 *
 * Lifecycle handlers allow executing code at specific points in a route's lifecycle:
 * - When a route is initialized
 * - When a route is disposed
 */
export interface RouteLifecycleConfiguration extends SchemaItem {
  /**
   * Initialize the route when it becomes active.
   *
   * @param route The route being initialized
   * @returns The initialized route, or null if initialization failed
   */
  init?(route: RouteBase): Promise<RouteBase | null>;

  /**
   * Clean up the route when it is no longer active.
   *
   * @param route The route being disposed
   */
  dispose?(route: RouteBase): Promise<void>;
}
