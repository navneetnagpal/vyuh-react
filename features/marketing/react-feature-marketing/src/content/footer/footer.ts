import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const FOOTER_SCHEMA_TYPE = 'marketing.footer';

/**
 * Footer section content item for displaying page footers
 *
 * Footers can include:
 * - Logo and logo text
 * - Navigation groups
 * - Legal links
 * - Copyright text
 */
export interface Footer extends ContentItem {
  /**
   * The logo to display in the footer
   */
  readonly logo?: ImageReference;

  /**
   * Text to display alongside or instead of the logo
   */
  readonly logoText?: string;

  /**
   * Navigation groups to display in the footer
   */
  readonly navigationGroups?: {
    /**
     * Group title
     */
    readonly title: string;

    /**
     * Links in this navigation group
     */
    readonly links: {
      /**
       * The navigation link
       */
      readonly action: Action;
    }[];
  }[];

  /**
   * Links to legal pages like Privacy Policy, Terms of Service, etc.
   */
  readonly legalLinks?: {
    /**
     * The legal link
     */
    readonly action: Action;
  }[];

  /**
   * Copyright notice text
   */
  readonly copyright?: string;

  /**
   * Social media links
   */
  readonly socialLinks?: {
    /**
     * The social media link
     */
    readonly action: Action;

    /**
     * Icon name for the social media platform
     */
    readonly icon: string;
  }[];

  /**
   * Company description or mission statement
   */
  readonly description?: string;
}
