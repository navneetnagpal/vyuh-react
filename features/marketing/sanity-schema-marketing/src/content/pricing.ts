import { ContentDescriptor, ContentSchemaBuilder } from '@vyuh/sanity-schema-core';
import { TbCurrencyDollar as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Pricing section schema for marketing pages
 * Based on common patterns from Tailwind UI pricing sections
 */

/**
 * Content descriptor for pricing content items
 */
export class PricingDescriptor extends ContentDescriptor {
  static readonly schemaName = 'marketing.pricing';

  constructor(props: Partial<PricingDescriptor>) {
    super(PricingDescriptor.schemaName, props);
  }
}

/**
 * Default layout schema for pricing content items
 */
export const defaultPricingLayout = defineType({
  name: `${PricingDescriptor.schemaName}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the pricing section',
      options: {
        list: [
          { title: 'Simple three tiers', value: 'simple-three-tiers' },
          { title: 'Two tiers highlighted', value: 'two-tiers-highlighted' },
        ],
      },
      initialValue: 'simple-three-tiers',
      validation: (Rule) => Rule.required(),
    }),

  ],
  preview: {
    select: {
      variant: 'variant',
    },
    prepare({ variant }) {
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple Three Tiers';

      return {
        title: `Pricing Layout: ${variantDisplay}`,
        subtitle: 'Default',
        media: Icon,
      };
    },
  },
});

export class PricingSchemaBuilder extends ContentSchemaBuilder {
  private schema = defineType({
    name: PricingDescriptor.schemaName,
    title: 'Pricing Section',
    type: 'object',
    icon: Icon,
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The main title for the pricing section',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'subtitle',
        title: 'Subtitle',
        type: 'text',
        description: 'A supporting text that appears below the title',
      }),

      defineField({
        name: 'frequency',
        title: 'Billing Frequency Toggle',
        type: 'object',
        description: 'Optional toggle for monthly/annual billing',
        fields: [
          defineField({
            name: 'enabled',
            title: 'Enable Frequency Toggle',
            type: 'boolean',
            initialValue: false,
          }),
          defineField({
            name: 'defaultAnnual',
            title: 'Default to Annual',
            type: 'boolean',
            description: 'Whether annual billing should be selected by default',
            initialValue: true,
            hidden: ({ parent }) => !parent?.enabled,
          }),
          defineField({
            name: 'discount',
            title: 'Annual Discount Percentage',
            type: 'number',
            description:
              'Discount percentage for annual billing (e.g., 20 for 20%)',
            hidden: ({ parent }) => !parent?.enabled,
          }),
        ],
      }),
      defineField({
        name: 'plans',
        title: 'Pricing Plans',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'name',
                title: 'Plan Name',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'description',
                title: 'Plan Description',
                type: 'text',
              }),
              defineField({
                name: 'priceMonthly',
                title: 'Monthly Price',
                type: 'number',
                description: 'Monthly price in dollars',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'priceAnnually',
                title: 'Annual Price',
                type: 'number',
                description: 'Annual price in dollars (per month)',
              }),
              defineField({
                name: 'currency',
                title: 'Currency',
                type: 'string',
                initialValue: 'USD',
              }),
              defineField({
                name: 'featured',
                title: 'Featured Plan',
                type: 'boolean',
                description: 'Whether this plan should be highlighted',
                initialValue: false,
              }),
              defineField({
                name: 'features',
                title: 'Features',
                type: 'array',
                of: [{ type: 'string' }],
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'action',
                title: 'Action',
                type: 'vyuh.action',
                validation: (Rule) => Rule.required(),
              }),
            ],
            preview: {
              select: {
                name: 'name',
                price: 'priceMonthly',
                currency: 'currency',
                featured: 'featured',
                featureCount: 'features.length',
              },
              prepare({
                name,
                price,
                currency = 'USD',
                featured,
                featureCount = 0,
              }) {
                const formattedPrice = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: currency,
                  minimumFractionDigits: 0,
                }).format(price);

                return {
                  title: `Plan: ${name || 'Untitled'}`,
                  subtitle: `${formattedPrice}/mo • ${featureCount} feature${featureCount === 1 ? '' : 's'}${featured ? ' • Featured' : ''}`,
                };
              },
            },
          },
        ],
        validation: (Rule) => Rule.required().min(1),
      }),
      defineField({
        name: 'disclaimer',
        title: 'Disclaimer',
        type: 'text',
        description:
          'Optional disclaimer text to display below the pricing plans',
      }),
    ],
    preview: {
      select: {
        title: 'title',
        plans: 'plans',
      },
      prepare({ title, plans = [] }) {
        return {
          title: `Pricing: ${title || 'Untitled'}`,
          subtitle: `${plans.length} plan${plans.length === 1 ? '' : 's'}`,
          media: Icon,
        };
      },
    },
  });

  constructor() {
    super(PricingDescriptor.schemaName);
  }

  build(descriptors: ContentDescriptor[]) {
    return this.schema;
  }
}
