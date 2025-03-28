import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const CTA_SCHEMA_TYPE = 'marketing.cta';

/**
 * CTA (Call to Action) content item for displaying CTA sections
 *
 * CTAs can include:
 * - Title and subtitle
 * - Primary and secondary action buttons
 * - Optional image or image tiles
 * - Additional information text
 */
export interface CTA extends ContentItem {
  /**
   * The main title for the CTA section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * The main image or screenshot for split variants
   */
  readonly image?: ImageReference;

  /**
   * Multiple images displayed in a grid for the image tiles variant
   */
  readonly imageTiles?: ImageReference[];

  /**
   * Primary call-to-action button
   */
  readonly primaryAction: Action;

  /**
   * Secondary call-to-action button
   */
  readonly secondaryAction?: Action;

  /**
   * Optional text that appears below the buttons
   */
  readonly additionalInfo?: string;
}
