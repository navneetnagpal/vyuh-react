import { Bento, BENTO_SCHEMA_TYPE } from '@/content/bento/bento';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Bento grid content items
 */
export class BentoDescriptor extends ContentDescriptor<Bento> {
  constructor(props?: Partial<BentoDescriptor>) {
    super({
      schemaType: BENTO_SCHEMA_TYPE,
      title: 'Bento Grid',
      layouts: props?.layouts,
    });
  }
}
