import { Bento, BENTO_SCHEMA_TYPE } from '@/content/bento/bento';
import { DefaultBentoLayout } from '@/content/bento/default-bento-layout';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Bento grid content items
 */
export class BentoContentBuilder extends ContentBuilder<Bento> {
  constructor() {
    super({
      schemaType: BENTO_SCHEMA_TYPE,
      defaultLayout: new DefaultBentoLayout(),
      defaultLayoutDescriptor: DefaultBentoLayout.typeDescriptor,
    });
  }
}
