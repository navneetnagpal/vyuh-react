import { Banner, BANNER_SCHEMA_TYPE } from '@/content/banner/banner';
import { DefaultBannerLayout } from '@/content/banner/default-banner-layout';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Banner content items
 */
export class BannerContentBuilder extends ContentBuilder<Banner> {
  constructor() {
    super({
      schemaType: BANNER_SCHEMA_TYPE,
      defaultLayout: new DefaultBannerLayout(),
      defaultLayoutDescriptor: DefaultBannerLayout.typeDescriptor,
    });
  }
}