import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { TbLayoutGrid as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Bento grid schema for marketing pages
 * Based on common patterns from Tailwind UI bento grid sections
 */

export class BentoDescriptor extends ContentDescriptor {
  static readonly schemaName = 'marketing.bento';

  constructor(props: Partial<BentoDescriptor>) {
    super(BentoDescriptor.schemaName, props);
  }
}

/**
 * Default layout schema for bento grid content items
 */
export const defaultBentoLayout = defineType({
  name: `${BentoDescriptor.schemaName}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the bento grid',
      options: {
        list: [
          { title: 'Three column grid', value: 'three-column' },
          { title: 'Two row grid', value: 'two-row' },
        ],
      },
      initialValue: 'three-column',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gap',
      title: 'Grid Gap',
      type: 'string',
      description: 'The spacing between grid items',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      gap: 'gap',
    },
    prepare({ variant, gap }) {
      const variantDisplay =
        {
          'three-column': 'Three Column Grid',
          'two-row': 'Two Row Grid',
        }[variant as string] || 'Default';

      const features = [];
      if (gap)
        features.push(`${gap.charAt(0).toUpperCase() + gap.slice(1)} gap`);

      return {
        title: `Bento Layout: ${variantDisplay}`,
        subtitle: features.length > 0 ? features.join(', ') : 'Default',
      };
    },
  },
});

export class BentoSchemaBuilder extends ContentSchemaBuilder {
  private schema = defineType({
    name: BentoDescriptor.schemaName,
    title: 'Bento Grid',
    type: 'object',
    icon: Icon,
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The main title for the bento grid section',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'subtitle',
        title: 'Subtitle',
        type: 'text',
        description: 'A supporting text that appears below the title',
      }),
      defineField({
        name: 'items',
        title: 'Grid Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'description',
                title: 'Description',
                type: 'text',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'icon',
                title: 'Icon',
                type: 'string',
                description: 'Icon name from your icon library',
              }),
              defineField({
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
              }),
              defineField({
                name: 'action',
                title: 'Action',
                type: 'vyuh.action',
                description: 'Optional action for this grid item',
              }),
              defineField({
                name: 'span',
                title: 'Grid Span',
                type: 'string',
                description: 'How much space this item should take in the grid',
                options: {
                  list: [
                    { title: 'Normal (1x1)', value: 'normal' },
                    { title: 'Wide (2x1)', value: 'wide' },
                    { title: 'Tall (1x2)', value: 'tall' },
                    { title: 'Large (2x2)', value: 'large' },
                  ],
                },
                initialValue: 'normal',
              }),
            ],
            preview: {
              select: {
                title: 'title',
                description: 'description',
                span: 'span',
                media: 'image',
                icon: 'icon',
              },
              prepare({ title, description, span, media, icon }) {
                const spanText = span ? ` (${span})` : '';
                return {
                  title: `Item: ${title || 'Untitled'}${spanText}`,
                  subtitle: description
                    ? description.length > 40
                      ? description.substring(0, 40) + '...'
                      : description
                    : 'No description',
                  media: media || (icon ? Icon : undefined),
                };
              },
            },
          },
        ],
        validation: (Rule) => Rule.required().min(3),
      }),
    ],
    preview: {
      select: {
        title: 'title',
        items: 'items',
      },
      prepare({ title, items = [] }) {
        return {
          title: `Bento: ${title || 'Untitled'}`,
          subtitle: `${items.length} item${items.length === 1 ? '' : 's'}`,
          media: Icon,
        };
      },
    },
  });

  constructor() {
    super(BentoDescriptor.schemaName);
  }

  build(descriptors: ContentDescriptor[]) {
    return this.schema;
  }
}
