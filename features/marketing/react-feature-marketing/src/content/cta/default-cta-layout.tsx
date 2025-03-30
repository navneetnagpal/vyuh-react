import { CTA } from '@/content/cta/components/CTA';
import { CTA as CTAContent, CTA_SCHEMA_TYPE } from '@/content/cta/cta';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * CTA layout variant type
 */
export type CTAVariant = 'simple-centered' | 'split-image-right';

/**
 * The background style for the CTA
 * - light: Uses base-100 background with base-content text
 * - brand: Uses primary background with primary-content text
 * - neutral: Uses neutral background with neutral-content text
 * - accent: Uses accent background with accent-content text
 */
export type CTABackground = 'light' | 'brand' | 'neutral' | 'accent';

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
