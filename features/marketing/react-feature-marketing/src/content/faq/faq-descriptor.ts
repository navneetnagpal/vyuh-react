import { FAQ, FAQ_SCHEMA_TYPE } from '@/content/faq/faq';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for FAQ content items
 */
export class FAQDescriptor extends ContentDescriptor<FAQ> {
  constructor(props?: Partial<FAQDescriptor>) {
    super({
      schemaType: FAQ_SCHEMA_TYPE,
      title: 'FAQ',
      layouts: props?.layouts,
    });
  }
}
