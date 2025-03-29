import { Footer as FooterComponent } from '@/content/footer/components/Footer';
import { Footer, FOOTER_SCHEMA_TYPE } from '@/content/footer/footer';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Footer layout variant type
 */
export type FooterVariant =
  | 'simple-centered'
  | 'simple-mission'
  | 'four-columns-mission'
  | 'with-social-links';

/**
 * Default layout for Footer content items
 */
export class DefaultFooterLayout extends LayoutConfiguration<Footer> {
  static readonly schemaName = `${FOOTER_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: FooterVariant;
  readonly companyMission?: string;

  constructor(props?: Partial<DefaultFooterLayout>) {
    super({
      schemaType: DefaultFooterLayout.schemaName,
      title: 'Default Footer Layout',
    });

    this.variant = props?.variant || 'simple-centered';
  }

  render(content: Footer): React.ReactNode {
    return <FooterComponent content={content} layout={this} />;
  }
}
