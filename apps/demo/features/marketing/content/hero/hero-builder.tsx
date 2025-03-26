import { DefaultHeroLayout } from '@/features/marketing/content/hero/default-hero-layout';
import { Hero, HERO_SCHEMA_TYPE } from '@/features/marketing/content/hero/hero';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Hero content items
 */
export class HeroContentBuilder extends ContentBuilder<Hero> {
  constructor() {
    super({
      schemaType: HERO_SCHEMA_TYPE,
      defaultLayout: new DefaultHeroLayout(),
      defaultLayoutDescriptor: DefaultHeroLayout.typeDescriptor,
    });
  }
}
