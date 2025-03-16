import { SchemaItem } from './schema-item';
import { LayoutConfiguration } from './layout-configuration';
import { ContentModifierConfiguration } from './content-modifier-configuration';

/**
 * The base interface for all content items in Vyuh.
 *
 * A content item represents a piece of content that can be:
 * - Fetched from a Content Management System (CMS)
 * - Rendered on screen with a specific layout
 * - Modified with content modifiers
 * - Organized in a content hierarchy
 *
 * Content items are the building blocks of a Vyuh application's content.
 * They combine data from the CMS with presentation logic to create
 * rich, interactive user interfaces.
 */
export interface ContentItem extends SchemaItem {
  /**
   * The layout configuration for the content item.
   * Defines how the content should be visually presented.
   */
  readonly layout?: LayoutConfiguration;

  /**
   * List of modifiers to apply to the content item.
   * Modifiers can transform the presentation or behavior of content.
   */
  readonly modifiers?: ContentModifierConfiguration[];

  /**
   * The parent content item of this content item.
   * Used internally by the content system for hierarchical content.
   */
  parent?: ContentItem;
}
