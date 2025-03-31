import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const BENTO_SCHEMA_TYPE = 'marketing.bento';

/**
 * Bento grid content item for displaying content in a grid layout
 *
 * Bento grids can include:
 * - Title and subtitle
 * - Grid items with various sizes and content
 */
export interface Bento extends ContentItem {
  /**
   * The main title for the bento grid section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * Grid items to display in the bento grid
   */
  readonly items: {
    /**
     * The title of the grid item
     */
    readonly title: string;

    /**
     * The description of the grid item
     */
    readonly description: string;

    /**
     * Optional icon name from your icon library
     */
    readonly icon?: string;

    /**
     * Optional image for the grid item
     */
    readonly image?: ImageReference;

    /**
     * Optional action for the grid item
     */
    readonly action?: Action;

    /**
     * How much space this item should take in the grid
     */
    readonly span?: 'normal' | 'wide' | 'tall' | 'large';
  }[];
}
