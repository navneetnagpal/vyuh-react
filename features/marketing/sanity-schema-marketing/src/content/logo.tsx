import { defineField, defineType } from 'sanity';
import { TbBrandAirtable as Icon } from 'react-icons/tb';
import { ContentDescriptor } from '@vyuh/sanity-schema-core';

/**
 * Logo section schema for marketing pages
 * Used for logo clouds, partner logos, etc.
 */
export const logoSchema = defineType({
  name: 'marketing.logo',
  title: 'Logo Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "Trusted by" or "Our partners"',
    }),
    defineField({
      name: 'items',
      title: 'Logo Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'action',
              title: 'Logo Link',
              type: 'vyuh.action',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length',
    },
    prepare({ title, itemCount = 0 }) {
      return {
        title: title || 'Logo Section',
        subtitle: `${itemCount} logo${itemCount === 1 ? '' : 's'}`,
      };
    },
  },
});

/**
 * Default layout schema for logo content items
 */
export const defaultLogoLayout = defineType({
  name: `${logoSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the logo section',
      options: {
        list: [
          { title: 'Simple grid', value: 'simple-grid' },
          { title: 'With borders', value: 'with-borders' },
          { title: 'Grayscale', value: 'grayscale' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'simple-grid',
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
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'Number of columns to display (for grid variants)',
      options: {
        list: [
          { title: '3 columns', value: 3 },
          { title: '4 columns', value: 4 },
          { title: '5 columns', value: 5 },
          { title: '6 columns', value: 6 },
        ],
      },
      initialValue: 4,
      hidden: ({ parent }) => parent?.variant === 'carousel',
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      darkMode: 'darkMode',
      columns: 'columns',
    },
    prepare({ variant, darkMode, columns }) {
      const variantDisplay: string =
        {
          'simple-grid': 'Simple Grid',
          'with-borders': 'With Borders',
          grayscale: 'Grayscale',
          carousel: 'Carousel',
        }[variant as string] || 'Default';

      const features = [];
      if (darkMode) features.push('Dark Mode');
      if (columns && variant !== 'carousel')
        features.push(`${columns} columns`);

      return {
        title: `Logo Layout: ${variantDisplay}`,
        subtitle: features.length > 0 ? features.join(', ') : 'Default',
      };
    },
  },
});

export class LogoDescriptor extends ContentDescriptor {
  static readonly schemaName = logoSchema.name;

  constructor(props: Partial<LogoDescriptor>) {
    super(LogoDescriptor.schemaName, props);
  }
}
