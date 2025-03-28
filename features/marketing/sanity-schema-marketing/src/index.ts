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
import { bentoSchema } from './content/bento';
import { blogSchema } from './content/blog';
import { CTADescriptor, ctaSchema, defaultCTALayout } from './content/cta';
import { defaultFaqLayout, FAQDescriptor, faqSchema } from './content/faq';
import {
  defaultFeatureLayout,
  featureSchema,
  FeatureSectionDescriptor,
} from './content/feature';
import { footerSchema } from './content/footer';
import {
  defaultHeaderLayout,
  HeaderDescriptor,
  headerSchema,
  navigationItemSchema,
  navigationDropdownItemSchema
} from './content/header';
import { defaultHeroLayout, HeroDescriptor, heroSchema } from './content/hero';
import { logoSchema } from './content/logo';
import { logoCloudsSchema } from './content/logo-clouds';
import { newsletterSchema } from './content/newsletter';
import { pricingSchema } from './content/pricing';
import { statsSchema } from './content/stats';
import { teamSchema } from './content/team';
import { testimonialsSchema } from './content/testimonials';

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
    new BuiltContentSchemaBuilder(defaultHeaderLayout),
    new BuiltContentSchemaBuilder(navigationItemSchema),
    new BuiltContentSchemaBuilder(navigationDropdownItemSchema),
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
