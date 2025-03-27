import { FeatureContentBuilder } from '@/content/feature/feature-builder';
import { HeroContentBuilder } from '@/content/hero/hero-builder';
import { HeroDescriptor } from '@/content/hero/hero-descriptor';
import { FeatureDescriptor } from '@vyuh/react-core';
import { ContentExtensionDescriptor } from '@vyuh/react-extension-content';

/**
 * Marketing feature descriptor
 *
 * Provides components for building marketing pages:
 * - Hero sections
 * - (More components to be added)
 */
export const marketing = new FeatureDescriptor({
  name: 'marketing',
  title: 'Marketing',
  description: 'Marketing components for building marketing pages',
  icon: 'layout-grid',
  extensions: [
    new ContentExtensionDescriptor({
      contents: [new HeroDescriptor()],
      contentBuilders: [new HeroContentBuilder(), new FeatureContentBuilder()],
    }),
  ],
});
