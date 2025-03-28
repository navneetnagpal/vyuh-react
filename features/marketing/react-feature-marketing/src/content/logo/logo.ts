import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const LOGO_SCHEMA_TYPE = 'marketing.logo';

/**
 * Logo section content item for displaying logo clouds, partner logos, etc.
 *
 * Logo sections can include:
 * - Title
 * - Logo items with images and optional links
 */
export interface Logo extends ContentItem {
  /**
   * The title for the logo section (e.g., "Trusted by" or "Our partners")
   */
  readonly title?: string;

  /**
   * Logo items to display in the section
   */
  readonly items: {
    /**
     * The logo image
     */
    readonly image: ImageReference;

    /**
     * Alt text for the logo image
     */
    readonly alt: string;

    /**
     * Optional link for the logo
     */
    readonly action?: Action;
  }[];
}
