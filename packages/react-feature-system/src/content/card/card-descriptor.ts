import { Card } from '@/content/card/card';
import { LayoutConfiguration } from '@vyuh/react-core';
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
 *   layouts: [new CustomCardLayout()],
 * });
 * ```
 */
export class CardDescriptor extends ContentDescriptor {
  /**
   * Creates a new Card descriptor
   *
   * @param options Configuration options for the descriptor
   */
  constructor(options?: { layouts?: LayoutConfiguration[] }) {
    super({
      schemaType: Card.schemaName,
      title: 'Card',
      layouts: options?.layouts,
    });
  }
}
