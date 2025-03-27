import { Hero, HERO_SCHEMA_TYPE } from '@/content/hero/hero';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Hero content items
 */
export class HeroDescriptor extends ContentDescriptor<Hero> {
  constructor(props?: Partial<HeroDescriptor>) {
    super({
      schemaType: HERO_SCHEMA_TYPE,
      title: 'Hero',
      layouts: props?.layouts,
    });
  }
}
