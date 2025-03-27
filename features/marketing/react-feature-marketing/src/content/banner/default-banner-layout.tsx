import { Banner, BANNER_SCHEMA_TYPE } from '@/content/banner/banner';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BannerSimple } from './components/BannerSimple';

/**
 * Banner layout variant type
 */
export type BannerVariant =
  | 'simple'
  | 'with-dismiss'
  | 'with-action'
  | 'floating'
  | 'sticky-top'
  | 'sticky-bottom';

/**
 * The color scheme for the banner
 */
export type BannerColorScheme =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'brand';

/**
 * Default layout for banner content items
 *
 * Features:
 * - Support for multiple variants
 * - Different color schemes
 * - Dismissible options
 */
export class DefaultBannerLayout extends LayoutConfiguration<Banner> {
  static readonly schemaName = `${BANNER_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: BannerVariant;
  readonly colorScheme?: BannerColorScheme;

  constructor(props?: Partial<DefaultBannerLayout>) {
    super({
      schemaType: DefaultBannerLayout.schemaName,
      title: 'Default Banner Layout',
    });

    this.variant = props?.variant || 'simple';
    this.colorScheme = props?.colorScheme || 'default';
  }

  render(content: Banner): React.ReactNode {
    // Default to simple banner if no variant is specified
    const variant = this.variant || 'simple';

    switch (variant) {
      case 'simple':
      default:
        return <BannerSimple content={content} layout={this} />;
    }
  }
}
