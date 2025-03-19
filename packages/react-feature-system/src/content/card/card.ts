import {
  ContentItem,
  ContentModifierConfiguration,
  ImageReference,
  LayoutConfiguration,
} from '@vyuh/react-core';

/**
 * Card content item for displaying content in a card format
 *
 * Cards can include:
 * - Title and description
 * - Image (via URL or ImageReference)
 * - Content body
 * - Actions that can be configured with multiple action configurations
 */
export class Card extends ContentItem {
  /**
   * Schema type identifier for cards
   */
  static readonly schemaName: string = 'vyuh.card';

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

  constructor(data: {
    title?: string;
    description?: string;
    imageUrl?: string;
    image?: ImageReference;
    content?: any;
    action?: any;
    secondaryAction?: any;
    tertiaryAction?: any;
    layout?: LayoutConfiguration;
    modifiers?: ContentModifierConfiguration[];
  }) {
    super({
      schemaType: Card.schemaName,
      layout: data.layout,
      modifiers: data.modifiers,
    });

    this.title = data.title;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.image = data.image;
    this.content = data.content;
    this.action = data.action;
    this.secondaryAction = data.secondaryAction;
    this.tertiaryAction = data.tertiaryAction;
  }
}
