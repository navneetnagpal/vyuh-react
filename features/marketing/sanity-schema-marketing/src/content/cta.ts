import { defineField, defineType } from 'sanity';
import { TbArrowRight as Icon } from 'react-icons/tb';

/**
 * CTA (Call to Action) section schema for marketing pages
 * Based on common patterns from Tailwind UI CTA sections
 */
export const ctaSchema = defineType({
  name: 'marketing.cta',
  title: 'CTA Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the CTA section',
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
      description: 'The style variant for the CTA section',
      options: {
        list: [
          { title: 'Simple centered', value: 'simple-centered' },
          { title: 'Simple stacked', value: 'simple-stacked' },
          { title: 'Centered on panel', value: 'centered-panel' },
          { title: 'Simple justified', value: 'simple-justified' },
          { title: 'Split with image on left', value: 'split-image-left' },
          { title: 'Split with image on right', value: 'split-image-right' },
          { title: 'With image tiles', value: 'image-tiles' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
          { title: 'Brand', value: 'brand' },
          { title: 'Light Brand', value: 'light-brand' },
        ],
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'The main image or screenshot',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) =>
        !['split-image-left', 'split-image-right'].includes(parent?.variant),
    }),
    defineField({
      name: 'imageTiles',
      title: 'Image Tiles',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Multiple images displayed in a grid',
      hidden: ({ parent }) => parent?.variant !== 'image-tiles',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.variant === 'image-tiles' && (!value || value.length === 0)) {
          return 'At least one image is required for the image tiles variant';
        }
        return true;
      }),
    }),
    defineField({
      name: 'primaryAction',
      title: 'Primary Action',
      type: 'vyuh.action',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryAction',
      title: 'Secondary Action',
      type: 'vyuh.action',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
      description: 'Optional text that appears below the buttons (e.g., "No credit card required")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
      background: 'background',
    },
    prepare({ title, subtitle, background }) {
      return {
        title: title || 'CTA Section',
        subtitle: `Variant: ${subtitle || 'None'} • Background: ${background || 'Light'}`,
      };
    },
  },
});
