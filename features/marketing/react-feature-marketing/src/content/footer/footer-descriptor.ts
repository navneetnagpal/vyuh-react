import { Footer, FOOTER_SCHEMA_TYPE } from '@/content/footer/footer';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Footer content items
 */
export class FooterDescriptor extends ContentDescriptor<Footer> {
  constructor(props?: Partial<FooterDescriptor>) {
    super({
      schemaType: FOOTER_SCHEMA_TYPE,
      title: 'Footer',
      layouts: props?.layouts,
    });
  }
}
