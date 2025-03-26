import { defineField, defineType } from 'sanity';
import { TbCurrencyDollar as Icon } from 'react-icons/tb';

/**
 * Pricing section schema for marketing pages
 * Based on common patterns from Tailwind UI pricing sections
 */
export const pricingSchema = defineType({
  name: 'marketing.pricing',
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
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the pricing section',
      options: {
        list: [
          { title: 'Simple three tiers', value: 'simple-three-tiers' },
          { title: 'Two tiers with highlighted tier', value: 'two-tiers-highlighted' },
          { title: 'Three tiers with emphasized tier', value: 'three-tiers-emphasized' },
          { title: 'Single tier with feature list', value: 'single-tier-features' },
          { title: 'Two tiers with feature comparison', value: 'two-tiers-comparison' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'darkMode',
      title: 'Dark Mode',
      type: 'boolean',
      description: 'Whether this section should be displayed in dark mode',
      initialValue: false,
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
          description: 'Discount percentage for annual billing (e.g., 20 for 20%)',
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
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'text',
      description: 'Optional disclaimer text to display below the pricing plans',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
      planCount: 'plans.length',
    },
    prepare({ title, subtitle, planCount = 0 }) {
      return {
        title: title || 'Pricing Section',
        subtitle: `Variant: ${subtitle || 'None'} • ${planCount} plan${planCount === 1 ? '' : 's'}`,
      };
    },
  },
});
