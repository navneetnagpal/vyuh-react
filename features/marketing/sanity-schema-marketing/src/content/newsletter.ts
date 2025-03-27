import { defineField, defineType } from 'sanity';
import { TbMail as Icon } from 'react-icons/tb';

/**
 * Newsletter section schema for marketing pages
 * Based on common patterns from Tailwind UI newsletter sections
 */
export const newsletterSchema = defineType({
  name: 'marketing.newsletter',
  title: 'Newsletter Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the newsletter section',
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
      description: 'The style variant for the newsletter section',
      options: {
        list: [
          { title: 'Simple centered', value: 'simple-centered' },
          { title: 'Simple card', value: 'simple-card' },
          { title: 'With background image', value: 'with-background-image' },
          { title: 'Split with image', value: 'split-with-image' },
          { title: 'With description', value: 'with-description' },
        ],
      },
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
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image for variants that include an image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => !['with-background-image', 'split-with-image'].includes(parent?.variant),
    }),
    defineField({
      name: 'formAction',
      title: 'Form Action URL',
      type: 'string',
      description: 'The URL where the newsletter form will submit data',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the submit button',
      initialValue: 'Subscribe',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholderText',
      title: 'Placeholder Text',
      type: 'string',
      description: 'Placeholder text for the email input',
      initialValue: 'Enter your email',
    }),
    defineField({
      name: 'privacyText',
      title: 'Privacy Text',
      type: 'text',
      description: 'Optional text about privacy policy',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional list of features or benefits to display',
      hidden: ({ parent }) => parent?.variant !== 'with-description',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Newsletter Section',
        subtitle: `Variant: ${subtitle || 'None'}`,
      };
    },
  },
});
