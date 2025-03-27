import { defineField, defineType } from 'sanity';
import { TbQuote as Icon } from 'react-icons/tb';

/**
 * Testimonials section schema for marketing pages
 * Based on common patterns from Tailwind UI testimonial sections
 */
export const testimonialsSchema = defineType({
  name: 'marketing.testimonials',
  title: 'Testimonials Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the testimonials section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A supporting text that appears with the title',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the testimonials section',
      options: {
        list: [
          { title: 'Simple centered', value: 'simple-centered' },
          { title: 'Side by side', value: 'side-by-side' },
          { title: 'With large avatar', value: 'with-large-avatar' },
          { title: 'With company logos', value: 'with-company-logos' },
          { title: 'Card grid', value: 'card-grid' },
          { title: 'With background image', value: 'with-background-image' },
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
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image for variants that use it',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.variant !== 'with-background-image',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'role',
                  title: 'Role',
                  type: 'string',
                }),
                defineField({
                  name: 'company',
                  title: 'Company',
                  type: 'string',
                }),
                defineField({
                  name: 'avatar',
                  title: 'Avatar',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              description: 'Whether this testimonial should be highlighted',
              initialValue: false,
            }),
            defineField({
              name: 'companyLogo',
              title: 'Company Logo',
              type: 'image',
              description: 'Logo of the company for variants that display logos',
              hidden: ({ parent }) => parent?.variant !== 'with-company-logos',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'vyuh.action',
      description: 'Optional call-to-action button',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
      testimonialCount: 'testimonials.length',
    },
    prepare({ title, subtitle, testimonialCount = 0 }) {
      return {
        title: title || 'Testimonials Section',
        subtitle: `Variant: ${subtitle || 'None'} • ${testimonialCount} testimonial${testimonialCount === 1 ? '' : 's'}`,
      };
    },
  },
});
