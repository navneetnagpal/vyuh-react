import {
  BuiltContentSchemaBuilder,
  FeatureDescriptor,
} from '@vyuh/sanity-schema-core';
import { RouteDescriptor } from '@vyuh/sanity-schema-system';
import { defaultHeroLayout, HeroDescriptor, heroSchema } from './hero';
import { logoSchema } from './logo';
import { featureSchema } from './feature';
import { ctaSchema } from './cta';
import { bentoSchema } from './bento';
import { pricingSchema } from './pricing';
import { headerSchema } from './header';
import { newsletterSchema } from './newsletter';
import { statsSchema } from './stats';
import { testimonialsSchema } from './testimonials';
import { blogSchema } from './blog';
import { teamSchema } from './team';
import { logoCloudsSchema } from './logo-clouds';
import { faqSchema } from './faq';
import { footerSchema } from './footer';
import { bannerSchema } from './banner';

export const marketing = new FeatureDescriptor({
  name: 'marketing',
  title: 'Marketing',
  description:
    'Schema for marketing components including banners, headers, heroes, logos, logo clouds, features, bento grids, stats, testimonials, pricing, FAQs, CTAs, newsletters, blog sections, team sections, and footers',
  contents: [
    new HeroDescriptor({
      layouts: [defaultHeroLayout],
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
