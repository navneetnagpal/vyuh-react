import { Header, HEADER_SCHEMA_TYPE } from '@/content/header/header';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Header content items
 */
export class HeaderDescriptor extends ContentDescriptor<Header> {
  constructor(props?: Partial<HeaderDescriptor>) {
    super({
      schemaType: HEADER_SCHEMA_TYPE,
      title: 'Header',
      layouts: props?.layouts,
    });
  }
}
