import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { TbLayoutList as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Feature section schema for marketing pages
 * Based on common patterns from Tailwind UI feature sections
 */
export const featureSchema = defineType({
  name: 'marketing.feature',
  title: 'Feature Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the feature section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A supporting description that explains the features',
    }),
    defineField({
      name: 'features',
      title: 'Features',
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
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: (
                <div>
                  Icon identifier from the{' '}
                  <a href="https://lucide.dev/icons/" target="_blank">
                    lucide-react
                  </a>{' '}
                  library
                </div>
              ),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
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
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'file',
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
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      mediaType: 'media.type',
      features: 'features',
    },
    prepare({ title, description, mediaType, features = [] }) {
      const subtitleText = [];
      if (mediaType && mediaType !== 'none') {
        subtitleText.push(`Media: ${mediaType}`);
      }
      if (features.length) {
        subtitleText.push(
          `${features.length} feature${features.length === 1 ? '' : 's'}`,
        );
      }

      return {
        title: `Feature: ${title || 'Untitled'}`,
        subtitle:
          subtitleText.length > 0
            ? subtitleText.join(' | ')
            : description
              ? description.substring(0, 50)
              : 'No content',
        media: Icon,
      };
    },
  },
});

export class FeatureSectionDescriptor extends ContentDescriptor {
  constructor(props?: Partial<FeatureSectionDescriptor>) {
    super(featureSchema.name, props || {});
  }
}

export class FeatureSectionSchemaBuilder extends ContentSchemaBuilder {
  constructor() {
    super(featureSchema.name);
  }

  build(descriptors: ContentDescriptor[]) {
    return featureSchema;
  }
}

export const defaultFeatureLayout = defineType({
  name: `${featureSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'with-screenshot',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'With Media', value: 'with-media' },
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
        : 'With Screenshot';

      return {
        title: `Feature Layout: ${variantDisplay}`,
        media: Icon,
      };
    },
  },
});
