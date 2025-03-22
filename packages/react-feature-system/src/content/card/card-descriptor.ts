import { Card, CARD_SCHEMA_TYPE } from '@/content/card/card';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Descriptor for the Card content type
 *
 * This descriptor configures:
 * - The schema type for cards
 * - Available layouts for cards
 * - Default configuration
 *
 * Example:
 * ```tsx
 * const descriptor = new CardDescriptor({
 *   layouts: [new TypeDescriptor<CustomCardLayout>()],
 * });
 * ```
 */
export class CardDescriptor extends ContentDescriptor<Card> {
  /**
   * Creates a new Card descriptor
   *
   * @param options Configuration options for the descriptor
   */
  constructor(options?: Partial<CardDescriptor>) {
    super({
      schemaType: CARD_SCHEMA_TYPE,
      title: 'Card',
      layouts: options?.layouts,
    });
  }
}
