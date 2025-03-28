import { DefaultPricingLayout } from '@/content/pricing/default-pricing-layout';
import { Pricing, PRICING_SCHEMA_TYPE } from '@/content/pricing/pricing';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Pricing content items
 */
export class PricingContentBuilder extends ContentBuilder<Pricing> {
  constructor() {
    super({
      schemaType: PRICING_SCHEMA_TYPE,
      defaultLayout: new DefaultPricingLayout(),
      defaultLayoutDescriptor: DefaultPricingLayout.typeDescriptor,
    });
  }
}
