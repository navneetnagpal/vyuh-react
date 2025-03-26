import { defineField, defineType } from 'sanity';
import { TbListDetails as Icon } from 'react-icons/tb';

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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A supporting text that appears below the title',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the feature section',
      options: {
        list: [
          { title: 'With product screenshot', value: 'product-screenshot' },
          { title: 'Centered grid', value: 'centered-grid' },
          { title: 'With large screenshot', value: 'large-screenshot' },
          { title: 'With bordered screenshot', value: 'bordered-screenshot' },
          { title: 'Three column with icons', value: 'three-column-icons' },
          { title: 'Offset grid', value: 'offset-grid' },
          { title: 'Simple', value: 'simple' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
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
              title: 'Feature Image',
              type: 'image',
              description: 'Optional image to represent this feature',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'The main product screenshot or image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) =>
        ![
          'product-screenshot',
          'large-screenshot',
          'bordered-screenshot',
        ].includes(parent?.variant),
    }),
    defineField({
      name: 'darkMode',
      title: 'Dark Mode',
      type: 'boolean',
      description: 'Whether this section should be displayed in dark mode',
      initialValue: false,
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'vyuh.action',
      description: 'Call to action button for this feature section',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      description: 'Optional testimonial to include with the features',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Testimonial',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          hidden: ({ parent }) => !parent?.enabled,
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (context.parent?.enabled && !value) {
                return 'Quote is required when testimonial is enabled';
              }
              return true;
            }),
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled,
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (context.parent?.enabled && !value) {
                return 'Author is required when testimonial is enabled';
              }
              return true;
            }),
        }),
        defineField({
          name: 'role',
          title: 'Role',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: 'avatar',
          title: 'Avatar',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => !parent?.enabled,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
      featuresCount: 'features.length',
    },
    prepare({ title, subtitle, featuresCount = 0 }) {
      return {
        title: title || 'Feature Section',
        subtitle: `${subtitle ? `Variant: ${subtitle}` : 'No variant selected'} • ${featuresCount} feature${featuresCount === 1 ? '' : 's'}`,
      };
    },
  },
});
