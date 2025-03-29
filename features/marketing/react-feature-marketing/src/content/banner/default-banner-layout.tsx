import { Banner as BannerContent, BANNER_SCHEMA_TYPE } from '@/content/banner/banner';
import { Banner } from '@/content/banner/components/Banner';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Banner layout variant type
 */
export type BannerVariant = 'simple' | 'floating';

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
 */
export class DefaultBannerLayout extends LayoutConfiguration<BannerContent> {
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

  render(content: BannerContent): React.ReactNode {
    const variant = this.variant || 'simple';

    switch (variant) {
      case 'floating':
        return (
          <div className="fixed bottom-4 right-4 z-50 max-w-md">
            <Banner content={content} layout={this} />
          </div>
        );
      case 'simple':
      default:
        return <Banner content={content} layout={this} />;
    }
  }
}
