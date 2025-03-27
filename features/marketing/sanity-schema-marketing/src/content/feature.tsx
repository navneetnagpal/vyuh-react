import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { defineField, defineType } from 'sanity';
import { TbLayoutList as Icon } from 'react-icons/tb';

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
              { title: 'Code Example', value: 'code-example' },
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
        defineField({
          name: 'codeExample',
          title: 'Code Example',
          type: 'object',
          hidden: ({ parent }) => parent?.type !== 'code-example',
          fields: [
            defineField({
              name: 'code',
              title: 'Code',
              type: 'text',
            }),
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'JSON', value: 'json' },
                ],
              },
              initialValue: 'javascript',
            }),
          ],
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
      featuresCount: 'features.length',
    },
    prepare({ title, description, mediaType, featuresCount }) {
      const subtitleText = [];
      if (mediaType && mediaType !== 'none') {
        subtitleText.push(`Media: ${mediaType}`);
      }
      if (featuresCount) {
        subtitleText.push(`Features: ${featuresCount}`);
      }

      return {
        title: title || 'Feature Section',
        subtitle:
          subtitleText.length > 0
            ? subtitleText.join(' | ')
            : description
              ? description.substring(0, 50)
              : 'No content',
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
          { title: 'Centered Grid', value: 'centered-grid' },
          { title: 'Three Column', value: 'three-column' },
          { title: 'With Screenshot', value: 'with-screenshot' },
          { title: 'With Screenshot (Dark)', value: 'with-screenshot-dark' },
          { title: 'With Media Left', value: 'with-media-left' },
          { title: 'With Media Right', value: 'with-media-right' },
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
          title: 'Color',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'color',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
        defineField({
          name: 'gradient',
          title: 'Gradient',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'gradient',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      bgType: 'background.type',
      bgColor: 'background.color',
      bgImage: 'background.image',
      bgGradient: 'background.gradient',
    },
    prepare({ variant, bgType, bgColor, bgGradient, bgImage }) {
      // Format the variant name for display
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'With Screenshot';

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
        title: `Feature Layout: ${variantDisplay}`,
        subtitle: bgDisplay || 'No background',
        media: Icon,
      };
    },
  },
});
