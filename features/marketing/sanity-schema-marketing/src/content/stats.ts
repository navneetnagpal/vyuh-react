import { ContentDescriptor, ContentSchemaBuilder } from '@vyuh/sanity-schema-core';
import { TbChartBar as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Stats section schema for marketing pages
 * Based on common patterns from Tailwind UI stats sections
 */

/**
 * Content descriptor for stats content items
 */
export class StatsDescriptor extends ContentDescriptor {
  static readonly schemaName = 'marketing.stats';

  constructor(props: Partial<StatsDescriptor>) {
    super(StatsDescriptor.schemaName, props);
  }
}

/**
 * Default layout schema for stats content items
 */
export const defaultStatsLayout = defineType({
  name: `${StatsDescriptor.schemaName}.layout.default`,
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
        ],
      },
      initialValue: 'simple',
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
        : 'Simple';

      return {
        title: `Stats Layout: ${variantDisplay}`,
        subtitle: 'Default',
        media: Icon,
      };
    },
  },
});

export class StatsSchemaBuilder extends ContentSchemaBuilder {
  private schema = defineType({
    name: StatsDescriptor.schemaName,
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
        description:
          'Detailed description for variants that include descriptions',
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
            preview: {
              select: {
                value: 'value',
                label: 'label',
                icon: 'icon',
              },
              prepare({ value, label, icon }) {
                return {
                  title: `Stat: ${value || 'Untitled'}`,
                  subtitle: label,
                  media: icon ? Icon : undefined,
                };
              },
            },
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
        stats: 'stats',
      },
      prepare({ title, stats = [] }) {
        return {
          title: `Stats: ${title || 'Untitled'}`,
          subtitle: `${stats.length} stat${stats.length === 1 ? '' : 's'}`,
          media: Icon,
        };
      },
    },
  });

  constructor() {
    super(StatsDescriptor.schemaName);
  }

  build(descriptors: ContentDescriptor[]) {
    return this.schema;
  }
}
