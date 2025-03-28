import { BannerContentBuilder } from '@/content/banner/banner-builder';
import { BannerDescriptor } from '@/content/banner/banner-descriptor';
import { BentoContentBuilder } from '@/content/bento/bento-builder';
import { BentoDescriptor } from '@/content/bento/bento-descriptor';
import { BlogContentBuilder } from '@/content/blog/blog-builder';
import { BlogDescriptor } from '@/content/blog/blog-descriptor';
import { CTAContentBuilder } from '@/content/cta/cta-builder';
import { CTADescriptor } from '@/content/cta/cta-descriptor';
import { FAQContentBuilder } from '@/content/faq/faq-builder';
import { FeatureContentBuilder } from '@/content/feature/feature-builder';
import { FooterContentBuilder } from '@/content/footer/footer-builder';
import { FooterDescriptor } from '@/content/footer/footer-descriptor';
import { HeaderContentBuilder } from '@/content/header/header-builder';
import { HeaderDescriptor } from '@/content/header/header-descriptor';
import { HeroContentBuilder } from '@/content/hero/hero-builder';
import { HeroDescriptor } from '@/content/hero/hero-descriptor';
import { LogoContentBuilder } from '@/content/logo/logo-builder';
import { LogoDescriptor } from '@/content/logo/logo-descriptor';
import { FeatureDescriptor } from '@vyuh/react-core';
import { ContentExtensionDescriptor } from '@vyuh/react-extension-content';

/**
 * Marketing feature descriptor
 *
 * Provides components for building marketing pages:
 * - Hero sections
 * - Banner sections
 * - CTA sections
 * - Header components
 * - Bento grid layouts
 * - Blog sections
 * - Footer components
 * - Logo sections
 */
export const marketing = new FeatureDescriptor({
  name: 'marketing',
  title: 'Marketing',
  description: 'Marketing components for building marketing pages',
  icon: 'layout-grid',
  extensions: [
    new ContentExtensionDescriptor({
      contents: [
        new HeroDescriptor(),
        new BannerDescriptor(),
        new CTADescriptor(),
        new HeaderDescriptor(),
        new BentoDescriptor(),
        new BlogDescriptor(),
        new FooterDescriptor(),
        new LogoDescriptor(),
      ],
      contentBuilders: [
        new HeroContentBuilder(),
        new FeatureContentBuilder(),
        new BannerContentBuilder(),
        new FAQContentBuilder(),
        new CTAContentBuilder(),
        new HeaderContentBuilder(),
        new BentoContentBuilder(),
        new BlogContentBuilder(),
        new FooterContentBuilder(),
        new LogoContentBuilder(),
      ],
    }),
  ],
});
