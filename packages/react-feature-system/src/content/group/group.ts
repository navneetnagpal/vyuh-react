import { ContentItem } from '@vyuh/react-core';

export const GROUP_SCHEMA_TYPE = 'vyuh.group';

/**
 * Group content item for displaying a collection of content items
 *
 * Groups can include:
 * - Title and description
 * - A collection of content items
 * - Display options for how items are presented (carousel, grid, etc.)
 */
export interface Group extends ContentItem {
  /**
   * The title of the group
   */
  readonly title?: string;

  /**
   * The description or subtitle of the group
   */
  readonly description?: string;

  /**
   * The items contained in this group
   */
  readonly items: ContentItem[];
}
