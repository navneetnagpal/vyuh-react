import { defineField, defineType } from 'sanity';
import { TbChartBar as Icon } from 'react-icons/tb';
import { ContentDescriptor } from '@vyuh/sanity-schema-core';

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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description for variants that include descriptions',

    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image for variants that include an image',
      options: {
        hotspot: true,
      },

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
      statCount: 'stats.length',
    },
    prepare({ title, statCount = 0 }) {
      return {
        title: title || 'Stats Section',
        subtitle: `${statCount} stat${statCount === 1 ? '' : 's'}`,
      };
    },
  },
});

/**
 * Default layout schema for stats content items
 */
export const defaultStatsLayout = defineType({
  name: `${statsSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
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
      initialValue: 'simple',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'darkMode',
      title: 'Dark Mode',
      type: 'boolean',
      description: 'Whether this section should be displayed in dark mode',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      darkMode: 'darkMode',
    },
    prepare({ variant, darkMode }) {
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple';

      const features = [];
      if (darkMode) features.push('Dark Mode');

      return {
        title: `Stats Layout: ${variantDisplay}`,
        subtitle: features.length > 0 ? features.join(', ') : 'Default',
        media: Icon,
      };
    },
  },
});

/**
 * Content descriptor for stats content items
 */
export class StatsDescriptor extends ContentDescriptor {
  static readonly schemaName = statsSchema.name;

  constructor(props: Partial<StatsDescriptor>) {
    super(StatsDescriptor.schemaName, props);
  }
}
