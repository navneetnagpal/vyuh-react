import { Banner, BANNER_SCHEMA_TYPE } from '@/content/banner/banner';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Banner content items
 */
export class BannerDescriptor extends ContentDescriptor<Banner> {
  constructor(props?: Partial<BannerDescriptor>) {
    super({
      schemaType: BANNER_SCHEMA_TYPE,
      title: 'Banner',
      layouts: props?.layouts,
    });
  }
}
