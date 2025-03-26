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
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
        defineField({
          name: 'gradient',
          title: 'Gradient',
          type: 'string',
          description: 'The type of gradient to use',
          options: {
            list: [
              // should be based on various gradient color choices
              {
                title: 'Linear Indigo to Purple',
                value: 'linear-indigo-to-purple',
              },
              {
                title: 'Linear Indigo to Blue',
                value: 'linear-indigo-to-blue',
              },
              {
                title: 'Linear Indigo to Orange',
                value: 'linear-indigo-to-orange',
              },
            ],
          },
          hidden: ({ parent }) => parent?.type !== 'gradient',
        }),
      ],
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
        subtitle: subtitleText.length > 0 ? subtitleText.join(' | ') : (subtitle ? subtitle.substring(0, 50) : 'No content'),
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
          { title: 'Split with image on right', value: 'split-right' },
          { title: 'Split with image on left', value: 'split-left' },
          { title: 'With background image', value: 'bg-image' },
          { title: 'With image below', value: 'image-below' },
          { title: 'With image tiles', value: 'image-tiles' },
          { title: 'With offset image', value: 'offset-image' },
        ],
      },
    }),
  ],
});
