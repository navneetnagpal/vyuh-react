import { SchemaItem } from './schema-item';

/**
 * A category for organizing routes.
 *
 * Categories help structure routes in a hierarchical manner.
 * They can be used to:
 * - Group related routes
 * - Create navigation menus
 * - Filter and sort routes
 */
export interface Category extends SchemaItem {
  /**
   * Unique identifier for the category
   */
  readonly identifier: string;

  /**
   * Human-readable title for the category
   */
  readonly title: string;

  /**
   * Optional layout configuration for routes in this category
   */
  readonly layout?: any;

  /**
   * Optional modifiers for routes in this category
   */
  readonly modifiers?: any[];
}
