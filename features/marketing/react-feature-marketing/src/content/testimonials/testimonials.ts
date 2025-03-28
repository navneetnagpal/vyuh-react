import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const TESTIMONIALS_SCHEMA_TYPE = 'marketing.testimonials';

/**
 * Testimonials content item for displaying customer testimonials
 *
 * Testimonials sections can include:
 * - Title and subtitle
 * - Multiple testimonials with quotes and author information
 * - Optional company logos
 * - Call-to-action button
 */
export interface Testimonials extends ContentItem {
  /**
   * The main title for the testimonials section
   */
  readonly title?: string;

  /**
   * A supporting text that appears with the title
   */
  readonly subtitle?: string;

  /**
   * Testimonials to display
   */
  readonly testimonials: Array<{
    /**
     * The testimonial quote text
     */
    readonly quote: string;

    /**
     * Information about the testimonial author
     */
    readonly author: {
      /**
       * Author's name
       */
      readonly name: string;

      /**
       * Author's role or position
       */
      readonly role?: string;

      /**
       * Author's company
       */
      readonly company?: string;

      /**
       * Author's avatar image
       */
      readonly avatar?: ImageReference;
    };

    /**
     * Whether this testimonial should be highlighted
     */
    readonly featured?: boolean;
  }>;

  /**
   * Optional call-to-action button
   */
  readonly action?: Action;
}
