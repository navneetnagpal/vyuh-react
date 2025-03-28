import { DefaultCTALayout } from '@/content/cta/default-cta-layout';
import { CTA, CTA_SCHEMA_TYPE } from '@/content/cta/cta';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for CTA content items
 */
export class CTAContentBuilder extends ContentBuilder<CTA> {
  constructor() {
    super({
      schemaType: CTA_SCHEMA_TYPE,
      defaultLayout: new DefaultCTALayout(),
      defaultLayoutDescriptor: DefaultCTALayout.typeDescriptor,
    });
  }
}
