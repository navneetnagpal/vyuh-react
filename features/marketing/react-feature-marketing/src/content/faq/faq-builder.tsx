import { DefaultFAQLayout } from '@/content/faq/default-faq-layout';
import { FAQ, FAQ_SCHEMA_TYPE } from '@/content/faq/faq';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for FAQ content items
 */
export class FAQContentBuilder extends ContentBuilder<FAQ> {
  constructor() {
    super({
      schemaType: FAQ_SCHEMA_TYPE,
      defaultLayout: new DefaultFAQLayout(),
      defaultLayoutDescriptor: DefaultFAQLayout.typeDescriptor,
    });
  }
}
