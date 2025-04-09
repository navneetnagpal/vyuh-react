import { ContentItem, ImageReference } from '@vyuh/react-core';

export const BLOG_CATEGORY_SCHEMA_TYPE = 'blog.category';

/**
 * Blog category content item for categorizing blog posts
 *
 * Blog category includes:
 * - Title
 * - Description
 * - Icon
 * - Color
 */
export interface BlogCategory extends ContentItem {
  /**
   * The name of the category
   */
  readonly title: string;

  /**
   * The slug for the category's page
   */
  readonly slug: {
    readonly current: string;
  };

  /**
   * A brief description of the category
   */
  readonly description?: string;

  /**
   * An optional icon for the category
   */
  readonly icon?: ImageReference;

  /**
   * A color code for the category (hex, rgb, etc.)
   */
  readonly color?: string;

  /**
   * Whether this category should be featured
   */
  readonly featured?: boolean;

  /**
   * The order in which this category should appear (lower numbers appear first)
   */
  readonly order?: number;
}
