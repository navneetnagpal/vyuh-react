import { ContentItem, ImageReference } from '@vyuh/react-core';

export const BLOG_AUTHOR_SCHEMA_TYPE = 'blog.author';

/**
 * Blog author content item for displaying author information
 *
 * Blog author includes:
 * - Name
 * - Avatar
 * - Bio
 * - Role
 * - Social links
 */
export interface BlogAuthor extends ContentItem {
  /**
   * The name of the author
   */
  readonly name: string;

  /**
   * The slug for the author's page
   */
  readonly slug: {
    readonly current: string;
  };

  /**
   * Profile picture of the author
   */
  readonly avatar?: ImageReference;

  /**
   * A brief biography of the author
   */
  readonly bio?: string;

  /**
   * The role or position of the author
   */
  readonly role?: string;

  /**
   * The email address of the author
   */
  readonly email?: string;

  /**
   * Social media links for the author
   */
  readonly socialLinks?: Array<{
    readonly platform:
      | 'twitter'
      | 'linkedin'
      | 'github'
      | 'instagram'
      | 'facebook'
      | 'website'
      | 'other';
    readonly url: string;
  }>;

  /**
   * Whether this author should be featured
   */
  readonly featured?: boolean;
}
