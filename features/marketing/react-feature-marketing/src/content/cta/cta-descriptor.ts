import { CTA, CTA_SCHEMA_TYPE } from '@/content/cta/cta';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for CTA content items
 */
export class CTADescriptor extends ContentDescriptor<CTA> {
  constructor(props?: Partial<CTADescriptor>) {
    super({
      schemaType: CTA_SCHEMA_TYPE,
      title: 'CTA',
      layouts: props?.layouts,
    });
  }
}
