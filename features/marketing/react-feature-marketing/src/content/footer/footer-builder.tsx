import { DefaultFooterLayout } from '@/content/footer/default-footer-layout';
import { Footer, FOOTER_SCHEMA_TYPE } from '@/content/footer/footer';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Footer content items
 */
export class FooterContentBuilder extends ContentBuilder<Footer> {
  constructor() {
    super({
      schemaType: FOOTER_SCHEMA_TYPE,
      defaultLayout: new DefaultFooterLayout(),
      defaultLayoutDescriptor: DefaultFooterLayout.typeDescriptor,
    });
  }
}
