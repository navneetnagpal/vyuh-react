import { defineField, defineType } from 'sanity';
import { TbChartBar as Icon } from 'react-icons/tb';

/**
 * Stats section schema for marketing pages
 * Based on common patterns from Tailwind UI stats sections
 */
export const statsSchema = defineType({
  name: 'marketing.stats',
  title: 'Stats Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the stats section',
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
      description: 'The style variant for the stats section',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'With description', value: 'with-description' },
          { title: 'Grid with heading', value: 'grid-with-heading' },
          { title: 'With image', value: 'with-image' },
          { title: 'Card grid', value: 'card-grid' },
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description for variants that include descriptions',
      hidden: ({ parent }) => !['with-description', 'grid-with-heading'].includes(parent?.variant),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image for variants that include an image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.variant !== 'with-image',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The statistic value (e.g., "35K" or "99.9%")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Label describing the statistic',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Optional longer description of the statistic',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional icon name from your icon library',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'vyuh.action',
      description: 'Optional call-to-action button',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
      statCount: 'stats.length',
    },
    prepare({ title, subtitle, statCount = 0 }) {
      return {
        title: title || 'Stats Section',
        subtitle: `Variant: ${subtitle || 'None'} • ${statCount} stat${statCount === 1 ? '' : 's'}`,
      };
    },
  },
});
