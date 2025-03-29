import { CTA as CTAContent, CTA_SCHEMA_TYPE } from '@/content/cta/cta';
import { CTA } from '@/content/cta/components/CTA';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * CTA layout variant type
 */
export type CTAVariant =
  | 'simple-centered'
  | 'simple-stacked'
  | 'centered-panel'
  | 'simple-justified'
  | 'split-image-left'
  | 'split-image-right';

/**
 * The background style for the CTA
 */
export type CTABackground = 'light' | 'dark' | 'brand' | 'light-brand';

/**
 * Default layout for CTA content items
 */
export class DefaultCTALayout extends LayoutConfiguration<CTAContent> {
  static readonly schemaName = `${CTA_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: CTAVariant;
  readonly background?: CTABackground;

  constructor(props?: Partial<DefaultCTALayout>) {
    super({
      schemaType: DefaultCTALayout.schemaName,
      title: 'Default CTA Layout',
    });

    this.variant = props?.variant || 'simple-centered';
    this.background = props?.background || 'light';
  }

  render(content: CTAContent): React.ReactNode {
    return <CTA content={content} layout={this} />;
  }
}
