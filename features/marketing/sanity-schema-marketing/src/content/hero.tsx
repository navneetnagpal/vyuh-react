import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { TbLayoutBoard as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Hero section schema for marketing pages
 * Based on common patterns from Tailwind UI hero sections
 */
export const heroSchema = defineType({
  name: 'marketing.hero',
  title: 'Hero Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A supporting text that appears below the title',
    }),

    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      description: 'Media content to display in the hero section',
      fields: [
        defineField({
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
            ],
          },
          initialValue: 'none',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ parent }) => parent?.type !== 'video',
        }),
      ],
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Action',
          fields: [
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Tertiary', value: 'tertiary' },
                  { title: 'Link', value: 'link' },
                ],
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'action',
              title: 'Action',
              type: 'vyuh.action',
            }),
          ],
          preview: {
            select: {
              title: 'action.title',
              configTitle: 'action.configurations.0.title',
              variant: 'variant',
            },
            prepare({ title, configTitle, variant }) {
              return {
                title: title || configTitle || 'Unnamed Action',
                subtitle: variant,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      mediaType: 'media.type',
      actionsCount: 'actions.length',
    },
    prepare({ title, subtitle, mediaType, actionsCount }) {
      const subtitleText = [];
      if (mediaType && mediaType !== 'none') {
        subtitleText.push(`Media: ${mediaType}`);
      }
      if (actionsCount) {
        subtitleText.push(`Actions: ${actionsCount}`);
      }

      return {
        title: `Hero: ${title || 'Untitled'}`,
        subtitle:
          subtitleText.length > 0
            ? subtitleText.join(' | ')
            : subtitle
              ? subtitle.substring(0, 50)
              : 'No content',
      };
    },
  },
});

export class HeroDescriptor extends ContentDescriptor {
  constructor(props?: Partial<HeroDescriptor>) {
    super(heroSchema.name, props || {});
  }
}

export class HeroSchemaBuilder extends ContentSchemaBuilder {
  constructor() {
    super(heroSchema.name);
  }

  build(descriptors: ContentDescriptor[]) {
    return heroSchema;
  }
}

export const defaultHeroLayout = defineType({
  name: `${heroSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'centered',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Split with Image on right', value: 'split-right' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
    },
    prepare({ variant }) {
      // Format the variant name for display
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Centered';

      return {
        title: `Hero Layout: ${variantDisplay}`,
        media: Icon,
      };
    },
  },
});
