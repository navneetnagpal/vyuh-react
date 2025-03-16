import { ContentItem } from './content-item';
import { Category } from './category';
import { RouteTypeConfiguration } from './route-type-configuration';

/**
 * Base interface for all route content items in Vyuh.
 *
 * Routes represent navigable content in a Vyuh application. They combine
 * content from the CMS with routing configuration to create dynamic,
 * content-driven navigation.
 *
 * Key features:
 * - Content-driven routing using CMS data
 * - Customizable route types and transitions
 * - Category-based organization
 * - Lifecycle management
 */
export interface RouteBase extends ContentItem {
  /**
   * The title of the route, displayed in navigation UI.
   */
  readonly title: string;

  /**
   * The URL path for this route.
   * This is used to match URLs and generate links.
   */
  readonly path: string;

  /**
   * Optional category for organizing routes.
   */
  readonly category?: Category;

  /**
   * Configuration for how this route should be presented.
   * Defines transitions, animations, and other route-specific behavior.
   */
  readonly routeType?: RouteTypeConfiguration;

  /**
   * Unique identifier for this route.
   */
  readonly id: string;

  /**
   * When this route was last updated in the CMS.
   */
  readonly updatedAt: Date;

  /**
   * When this route was created in the CMS.
   */
  readonly createdAt: Date;

  /**
   * Initialize the route when it becomes active.
   *
   * This is called when the route is first navigated to.
   * Use this to set up any route-specific state or resources.
   * Return null to prevent the route from being shown.
   *
   * @returns A promise that resolves to the initialized route, or null if initialization failed
   */
  init(): Promise<RouteBase | null>;

  /**
   * Clean up the route when it is no longer active.
   *
   * This is called when navigating away from the route.
   * Use this to clean up any resources initialized in [init].
   */
  dispose(): Promise<void>;

  /**
   * Get the layout configuration for this route.
   * Falls back to category layout if route layout is not defined.
   */
  getLayout(): any | null;

  /**
   * Get the modifiers for this route.
   * Falls back to category modifiers if route modifiers are not defined.
   */
  getModifiers(): any[] | null;
}
