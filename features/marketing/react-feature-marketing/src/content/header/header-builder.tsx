import { DefaultHeaderLayout } from '@/content/header/default-header-layout';
import { Header, HEADER_SCHEMA_TYPE } from '@/content/header/header';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Header content items
 */
export class HeaderContentBuilder extends ContentBuilder<Header> {
  constructor() {
    super({
      schemaType: HEADER_SCHEMA_TYPE,
      defaultLayout: new DefaultHeaderLayout(),
      defaultLayoutDescriptor: DefaultHeaderLayout.typeDescriptor,
    });
  }
}
