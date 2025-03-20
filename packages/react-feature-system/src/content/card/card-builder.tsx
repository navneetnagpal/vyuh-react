import { Card, CARD_SCHEMA_TYPE } from '@/content/card/card';
import { DefaultCardLayout } from '@/content/card/default-card-layout';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Card content items
 */
export class CardContentBuilder extends ContentBuilder<Card> {
  constructor() {
    super({
      schemaType: CARD_SCHEMA_TYPE,
      defaultLayout: new DefaultCardLayout(),
      defaultLayoutDescriptor: DefaultCardLayout.typeDescriptor,
    });
  }
}
