import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const BLOG_POST_SUMMARY_SCHEMA_TYPE = 'blog.post.summary';

/**
 * Blog post summary content item for displaying a single blog post
 *
 * Blog post summary includes:
 * - Title
 * - Excerpt
 * - Featured image
 * - Publication date
 * - Author information
 * - Categories
 * - Link to the full post
 */
export interface BlogPostSummary extends ContentItem {
  /**
   * The title of the blog post
   */
  readonly title: string;

  /**
   * A short summary of the post
   */
  readonly excerpt?: string;

  /**
   * Featured image for the blog post
   */
  readonly image?: ImageReference;

  /**
   * Publication date of the blog post
   */
  readonly date: string;

  /**
   * Author information
   */
  readonly author?: {
    /**
     * Author's name
     */
    readonly name: string;

    /**
     * Author's role or title
     */
    readonly role?: string;

    /**
     * Author's avatar image
     */
    readonly avatar?: ImageReference;
  };

  /**
   * Categories or tags for the blog post
   */
  readonly categories?: string[];

  /**
   * Whether this post should be featured
   */
  readonly featured?: boolean;

  /**
   * Link to the full post
   */
  readonly action: Action;
}
