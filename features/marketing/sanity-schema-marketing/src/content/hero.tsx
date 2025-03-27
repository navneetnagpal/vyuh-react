import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { defineField, defineType } from 'sanity';
import { TbLayoutBoard as Icon } from 'react-icons/tb';

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
              { title: 'Image Tiles', value: 'image-tiles' },
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

        defineField({
          name: 'imageTiles',
          title: 'Image Tiles',
          type: 'array',
          of: [{ type: 'image' }],
          hidden: ({ parent }) => parent?.type !== 'image-tiles',
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
        title: title || 'Hero Section',
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
          { title: 'Split with Image on left', value: 'split-left' },
          { title: 'With background Image', value: 'bg-image' },
          { title: 'With Image below', value: 'image-below' },
        ],
      },
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Color', value: 'color' },
              { title: 'Image', value: 'image' },
              { title: 'Gradient', value: 'gradient' },
            ],
          },
          initialValue: 'none',
        }),
        defineField({
          name: 'color',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color code or Tailwind color class',
          hidden: ({ parent }) => parent?.type !== 'color',
        }),
        defineField({
          name: 'gradient',
          title: 'Gradient',
          type: 'string',
          description: 'The type of gradient to use',
          hidden: ({ parent }) => parent?.type !== 'gradient',
        }),
        defineField({
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      bgType: 'background.type',
      bgColor: 'background.color',
      bgGradient: 'background.gradient',
      bgImage: 'background.image',
    },
    prepare({ variant, bgType, bgColor, bgGradient, bgImage }) {
      // Format the variant name for display
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Centered';

      // Create a descriptive subtitle based on background settings
      let bgDisplay = '';
      if (bgType && bgType !== 'none') {
        if (bgType === 'color' && bgColor) {
          bgDisplay = `Background: ${bgColor}`;
        } else if (bgType === 'gradient' && bgGradient) {
          bgDisplay = `Background: ${bgGradient} Gradient`;
        } else if (bgType === 'image' && bgImage) {
          bgDisplay = 'With Background Image';
        } else {
          bgDisplay = `Background: ${bgType}`;
        }
      }

      return {
        title: `Hero Layout: ${variantDisplay}`,
        subtitle: bgDisplay || 'No background',
        media: Icon,
      };
    },
  },
});
