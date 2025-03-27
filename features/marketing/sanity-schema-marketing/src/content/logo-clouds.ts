import { defineField, defineType } from 'sanity';
import { TbBrandAirtable as Icon } from 'react-icons/tb';

/**
 * Logo clouds section schema for marketing pages
 * Based on common patterns from Tailwind UI logo clouds sections
 */
export const logoCloudsSchema = defineType({
  name: 'marketing.logoClouds',
  title: 'Logo Clouds',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the logo clouds section (e.g., "Trusted by these companies")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A supporting text that appears with the title',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the logo clouds section',
      options: {
        list: [
          { title: 'Simple grid', value: 'simple-grid' },
          { title: 'With heading', value: 'with-heading' },
          { title: 'With background', value: 'with-background' },
          { title: 'With border', value: 'with-border' },
          { title: 'With CTA', value: 'with-cta' },
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
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'action',
              title: 'Company Link',
              type: 'vyuh.action',
              description: 'Optional link to the company website',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'vyuh.action',
      description: 'Call-to-action button for variants that include a CTA',
      hidden: ({ parent }) => parent?.variant !== 'with-cta',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.variant === 'with-cta' && !value) {
          return 'Action is required for the "with-cta" variant';
        }
        return true;
      }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
      logoCount: 'logos.length',
    },
    prepare({ title, subtitle, logoCount = 0 }) {
      return {
        title: title || 'Logo Clouds',
        subtitle: `Variant: ${subtitle || 'None'} • ${logoCount} logo${logoCount === 1 ? '' : 's'}`,
      };
    },
  },
});
