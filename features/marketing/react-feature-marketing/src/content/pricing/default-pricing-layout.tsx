import { Pricing } from '@/content/pricing/components/Pricing';
import { Pricing as PricingContent, PRICING_SCHEMA_TYPE } from '@/content/pricing/pricing';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Pricing layout variant type
 */
export type PricingVariant = 'simple-three-tiers' | 'two-tiers-highlighted';

/**
 * Default layout for pricing content items
 */
export class DefaultPricingLayout extends LayoutConfiguration<PricingContent> {
  static readonly schemaName = `${PRICING_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: PricingVariant;

  constructor(props?: Partial<DefaultPricingLayout>) {
    super({
      schemaType: DefaultPricingLayout.schemaName,
      title: 'Default Pricing Layout',
    });

    this.variant = props?.variant || 'simple-three-tiers';
  }

  render(content: PricingContent): React.ReactNode {
    return <Pricing content={content} layout={this} />;
  }
}
