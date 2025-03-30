import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const BLOG_GROUP_SCHEMA_TYPE = 'blog.group';

/**
 * Blog section content item for displaying blog posts
 *
 * Blog sections can include:
 * - Title and subtitle
 * - Blog posts with various metadata
 * - Call-to-action button
 */
export interface BlogGroup extends ContentItem {
  /**
   * The main title for the blog section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * Blog posts to display in the section
   */
  readonly posts: {
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
  }[];

  /**
   * Optional call-to-action button (e.g., "View all posts")
   */
  readonly action?: Action;
}
