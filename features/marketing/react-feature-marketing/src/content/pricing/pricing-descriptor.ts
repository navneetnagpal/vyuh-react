import { Pricing, PRICING_SCHEMA_TYPE } from '@/content/pricing/pricing';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Pricing content items
 */
export class PricingDescriptor extends ContentDescriptor<Pricing> {
  constructor(props?: Partial<PricingDescriptor>) {
    super({
      schemaType: PRICING_SCHEMA_TYPE,
      title: 'Pricing',
      layouts: props?.layouts,
    });
  }
}
