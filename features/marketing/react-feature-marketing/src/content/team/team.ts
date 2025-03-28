import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const TEAM_SCHEMA_TYPE = 'marketing.team';

/**
 * Team content item for displaying team members
 *
 * Team sections can include:
 * - Title and subtitle
 * - Team members with photos, roles, and bios
 * - Social links for team members
 * - Call-to-action button
 */
export interface Team extends ContentItem {
  /**
   * The main title for the team section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * Team members to display
   */
  readonly members: Array<{
    /**
     * Team member's name
     */
    readonly name: string;

    /**
     * Team member's role or position
     */
    readonly role: string;

    /**
     * Team member's photo
     */
    readonly image: ImageReference;

    /**
     * Short biography of the team member
     */
    readonly bio?: string;

    /**
     * Whether this member should be highlighted
     */
    readonly featured?: boolean;

    /**
     * Social media links for the team member
     */
    readonly socialLinks?: Array<{
      /**
       * Platform name (e.g., "twitter", "linkedin", "github")
       */
      readonly platform: string;

      /**
       * URL to the team member's profile
       */
      readonly url: string;
    }>;
  }>;

  /**
   * Optional call-to-action button
   */
  readonly action?: Action;
}
