import {
  BuiltContentSchemaBuilder,
  FeatureDescriptor,
} from '@vyuh/sanity-schema-core';
import { RouteDescriptor } from '@vyuh/sanity-schema-system';
import { defaultHeroLayout, HeroDescriptor, heroSchema } from './content/hero';
import { logoSchema } from './content/logo';
import {
  defaultFeatureLayout,
  featureSchema,
  FeatureSectionDescriptor,
} from './content/feature';
import { ctaSchema } from './content/cta';
import { bentoSchema } from './content/bento';
import { pricingSchema } from './content/pricing';
import { headerSchema } from './content/header';
import { newsletterSchema } from './content/newsletter';
import { statsSchema } from './content/stats';
import { testimonialsSchema } from './content/testimonials';
import { blogSchema } from './content/blog';
import { teamSchema } from './content/team';
import { logoCloudsSchema } from './content/logo-clouds';
import { faqSchema } from './content/faq';
import { footerSchema } from './content/footer';
import {
  BannerDescriptor,
  bannerSchema,
  defaultBannerLayout,
} from './content/banner';

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
    new RouteDescriptor({
      regionItems: [
        { type: bannerSchema.name },
        { type: headerSchema.name },
        { type: heroSchema.name },
        { type: logoSchema.name },
        { type: logoCloudsSchema.name },
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
    new BuiltContentSchemaBuilder(logoCloudsSchema),
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
