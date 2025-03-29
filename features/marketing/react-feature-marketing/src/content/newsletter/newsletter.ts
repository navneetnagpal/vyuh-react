import { ContentItem, ImageReference } from '@vyuh/react-core';

export const NEWSLETTER_SCHEMA_TYPE = 'marketing.newsletter';

/**
 * Newsletter content item for displaying newsletter signup sections
 *
 * Newsletter sections can include:
 * - Title and subtitle
 * - Form for email signup
 * - Optional image
 * - Privacy text and features list
 */
export interface Newsletter extends ContentItem {
  /**
   * The main title for the newsletter section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * Image for variants that include an image
   */
  readonly image?: ImageReference;

  /**
   * The URL where the newsletter form will submit data
   */
  readonly formAction: string;

  /**
   * Text for the submit button
   */
  readonly buttonText: string;

  /**
   * Placeholder text for the email input
   */
  readonly placeholderText?: string;

  /**
   * Optional text about privacy policy
   */
  readonly privacyText?: string;

  /**
   * Optional list of features or benefits to display
   */
  readonly features?: string[];
}
