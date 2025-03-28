import { DefaultLogoLayout } from '@/content/logo/default-logo-layout';
import { Logo, LOGO_SCHEMA_TYPE } from '@/content/logo/logo';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Logo section content items
 */
export class LogoContentBuilder extends ContentBuilder<Logo> {
  constructor() {
    super({
      schemaType: LOGO_SCHEMA_TYPE,
      defaultLayout: new DefaultLogoLayout(),
      defaultLayoutDescriptor: DefaultLogoLayout.typeDescriptor,
    });
  }
}
