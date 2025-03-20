import { ContentItem, ImageReference } from '@vyuh/react-core';

export const CARD_SCHEMA_TYPE = 'vyuh.card';

/**
 * Card content item for displaying content in a card format
 *
 * Cards can include:
 * - Title and description
 * - Image (via URL or ImageReference)
 * - Content body
 * - Actions that can be configured with multiple action configurations
 */
export interface Card extends ContentItem {
  /**
   * The title of the card
   */
  readonly title?: string;

  /**
   * The description or subtitle of the card
   */
  readonly description?: string;

  /**
   * URL for the card's image
   */
  readonly imageUrl?: string;

  /**
   * Image reference for the card
   */
  readonly image?: ImageReference;

  /**
   * The main content of the card
   */
  readonly content?: any;

  /**
   * Primary action for the card
   */
  readonly action?: any;

  /**
   * Secondary action for the card
   */
  readonly secondaryAction?: any;

  /**
   * Tertiary action for the card
   */
  readonly tertiaryAction?: any;
}
