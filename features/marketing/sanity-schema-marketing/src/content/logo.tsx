import { ContentDescriptor, ContentSchemaBuilder } from '@vyuh/sanity-schema-core';
import { TbBrandAirtable as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Logo section schema for marketing pages
 * Used for logo clouds, partner logos, etc.
 */
export class LogoDescriptor extends ContentDescriptor {
  static readonly schemaName = 'marketing.logo';

  constructor(props: Partial<LogoDescriptor>) {
    super(LogoDescriptor.schemaName, props);
  }
}

export class LogoSchemaBuilder extends ContentSchemaBuilder {
  private schema = defineType({
    name: LogoDescriptor.schemaName,
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
        items: 'items',
      },
      prepare({ title, items = [] }) {
        return {
          title: `Logo: ${title || 'Untitled'}`,
          subtitle: `${items.length} logo${items.length === 1 ? '' : 's'}`,
          media: Icon,
        };
      },
    },
  });

  constructor() {
    super(LogoDescriptor.schemaName);
  }

  build(descriptors: ContentDescriptor[]) {
    return this.schema;
  }
}

/**
 * Default layout schema for logo content items
 */
export const defaultLogoLayout = defineType({
  name: `${LogoDescriptor.schemaName}.layout.default`,
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
        ],
      },
      initialValue: 'simple-grid',
      validation: (Rule) => Rule.required(),
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
      columns: 'columns',
    },
    prepare({ variant, columns }) {
      const variantDisplay: string =
        {
          'simple-grid': 'Simple Grid',
          'with-borders': 'With Borders',
        }[variant as string] || 'Default';

      const features = [];
      if (columns) features.push(`${columns} columns`);

      return {
        title: `Logo Layout: ${variantDisplay}`,
        subtitle: features.length > 0 ? features.join(', ') : 'Default',
      };
    },
  },
});
