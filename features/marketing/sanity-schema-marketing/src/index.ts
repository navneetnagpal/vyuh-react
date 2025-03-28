import {
  BuiltContentSchemaBuilder,
  FeatureDescriptor,
} from '@vyuh/sanity-schema-core';
import { RouteDescriptor } from '@vyuh/sanity-schema-system';
import {
  BannerDescriptor,
  bannerSchema,
  defaultBannerLayout,
} from './content/banner';
import {
  BentoDescriptor,
  bentoSchema,
  defaultBentoLayout,
} from './content/bento';
import { BlogDescriptor, blogSchema, defaultBlogLayout } from './content/blog';
import { CTADescriptor, ctaSchema, defaultCTALayout } from './content/cta';
import { defaultFaqLayout, FAQDescriptor, faqSchema } from './content/faq';
import {
  defaultFeatureLayout,
  featureSchema,
  FeatureSectionDescriptor,
} from './content/feature';
import {
  FooterDescriptor,
  footerSchema,
  defaultFooterLayout,
} from './content/footer';
import {
  defaultHeaderLayout,
  HeaderDescriptor,
  headerSchema,
  navigationDropdownItemSchema,
  navigationItemSchema,
} from './content/header';
import { defaultHeroLayout, HeroDescriptor, heroSchema } from './content/hero';
import { LogoDescriptor, logoSchema, defaultLogoLayout } from './content/logo';
import {
  newsletterSchema,
  defaultNewsletterLayout,
  NewsletterDescriptor,
} from './content/newsletter';
import {
  pricingSchema,
  defaultPricingLayout,
  PricingDescriptor,
} from './content/pricing';
import {
  statsSchema,
  defaultStatsLayout,
  StatsDescriptor,
} from './content/stats';
import {
  teamSchema,
  defaultTeamLayout,
  TeamDescriptor,
} from './content/team';
import {
  testimonialsSchema,
  defaultTestimonialsLayout,
  TestimonialsDescriptor,
} from './content/testimonials';

export const marketing = new FeatureDescriptor({
  name: 'marketing',
  title: 'Marketing',
  description:
    'Schema for marketing components including banners, headers, heroes, logos, logo clouds, features, bento grids, stats, testimonials, pricing, FAQs, CTAs, newsletters, blog sections, team sections, and footers',
  contents: [
    new HeroDescriptor({
      layouts: [defaultHeroLayout],
    }),
    new FeatureSectionDescriptor({
      layouts: [defaultFeatureLayout],
    }),
    new BannerDescriptor({
      layouts: [defaultBannerLayout],
    }),
    new CTADescriptor({
      layouts: [defaultCTALayout],
    }),
    new FAQDescriptor({
      layouts: [defaultFaqLayout],
    }),
    new HeaderDescriptor({
      layouts: [defaultHeaderLayout],
    }),
    new FooterDescriptor({
      layouts: [defaultFooterLayout],
    }),
    new LogoDescriptor({
      layouts: [defaultLogoLayout],
    }),
    new BlogDescriptor({
      layouts: [defaultBlogLayout],
    }),
    new BentoDescriptor({
      layouts: [defaultBentoLayout],
    }),
    new NewsletterDescriptor({
      layouts: [defaultNewsletterLayout],
    }),
    new PricingDescriptor({
      layouts: [defaultPricingLayout],
    }),
    new StatsDescriptor({
      layouts: [defaultStatsLayout],
    }),
    new TeamDescriptor({
      layouts: [defaultTeamLayout],
    }),
    new TestimonialsDescriptor({
      layouts: [defaultTestimonialsLayout],
    }),
    new RouteDescriptor({
      regionItems: [
        { type: bannerSchema.name },
        { type: headerSchema.name },
        { type: heroSchema.name },
        { type: logoSchema.name },
        { type: featureSchema.name },
        { type: bentoSchema.name },
        { type: statsSchema.name },
        { type: testimonialsSchema.name },
        { type: pricingSchema.name },
        { type: faqSchema.name },
        { type: ctaSchema.name },
        { type: newsletterSchema.name },
        { type: blogSchema.name },
        { type: teamSchema.name },
        { type: footerSchema.name },
      ],
    }),
  ],
  contentSchemaBuilders: [
    new BuiltContentSchemaBuilder(bannerSchema),
    new BuiltContentSchemaBuilder(headerSchema),
    new BuiltContentSchemaBuilder(heroSchema),
    new BuiltContentSchemaBuilder(logoSchema),
    new BuiltContentSchemaBuilder(featureSchema),
    new BuiltContentSchemaBuilder(bentoSchema),
    new BuiltContentSchemaBuilder(statsSchema),
    new BuiltContentSchemaBuilder(testimonialsSchema),
    new BuiltContentSchemaBuilder(pricingSchema),
    new BuiltContentSchemaBuilder(faqSchema),
    new BuiltContentSchemaBuilder(ctaSchema),
    new BuiltContentSchemaBuilder(newsletterSchema),
    new BuiltContentSchemaBuilder(blogSchema),
    new BuiltContentSchemaBuilder(teamSchema),
    new BuiltContentSchemaBuilder(footerSchema),
  ],
});
