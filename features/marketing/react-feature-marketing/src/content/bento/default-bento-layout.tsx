import { Bento, BENTO_SCHEMA_TYPE } from '@/content/bento/bento';
import { Bento as BentoComponent } from '@/content/bento/components/Bento';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Bento grid layout variant type
 */
export type BentoVariant = 'three-column' | 'two-row';

/**
 * Default layout for Bento grid content items
 */
export class DefaultBentoLayout extends LayoutConfiguration<Bento> {
  static readonly schemaName = `${BENTO_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: BentoVariant;
  readonly gap?: 'small' | 'medium' | 'large';

  constructor(props?: Partial<DefaultBentoLayout>) {
    super({
      schemaType: DefaultBentoLayout.schemaName,
      title: 'Default Bento Layout',
    });

    this.variant = props?.variant || 'three-column';
    this.gap = props?.gap || 'small';
  }

  render(content: Bento): React.ReactNode {
    return <BentoComponent content={content} layout={this} />;
  }
}
