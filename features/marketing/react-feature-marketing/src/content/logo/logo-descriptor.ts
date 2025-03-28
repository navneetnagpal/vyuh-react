import { Logo, LOGO_SCHEMA_TYPE } from '@/content/logo/logo';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Logo section content items
 */
export class LogoDescriptor extends ContentDescriptor<Logo> {
  constructor(props?: Partial<LogoDescriptor>) {
    super({
      schemaType: LOGO_SCHEMA_TYPE,
      title: 'Logo Section',
      layouts: props?.layouts,
    });
  }
}
