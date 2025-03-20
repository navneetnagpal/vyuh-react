import { Category } from '@/content/category';
import { ContentItem } from '@/content/content-item';
import { ContentModifierConfiguration } from '@/content/content-modifier-configuration';
import { LayoutConfiguration } from '@/content/layout-configuration';

/**
 * Base class for all route content items in Vyuh.
 *
 * Routes represent navigable content in a Vyuh application. They combine
 * content from the CMS with routing configuration to create dynamic,
 * content-driven navigation.
 *
 * Key features:
 * - Content-driven routing using CMS data
 * - Customizable route transitions
 * - Category-based organization
 * - Lifecycle management
 */
export abstract class RouteBase extends ContentItem {
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

  protected constructor(data: {
    schemaType: string;
    title: string;
    path: string;
    id: string;
    updatedAt: Date | string;
    createdAt: Date | string;
    category?: Category;
    layout?: LayoutConfiguration;
    modifiers?: ContentModifierConfiguration[];
  }) {
    super({
      schemaType: data.schemaType,
      layout: data.layout,
      modifiers: data.modifiers,
    });

    this.title = data.title;
    this.path = data.path;
    this.id = data.id;
    this.category = data.category;
    this.updatedAt =
      data.updatedAt instanceof Date
        ? data.updatedAt
        : new Date(data.updatedAt);
    this.createdAt =
      data.createdAt instanceof Date
        ? data.createdAt
        : new Date(data.createdAt);
  }
}
