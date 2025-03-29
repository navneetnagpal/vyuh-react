import { ContentDescriptor } from '@vyuh/sanity-schema-core';
import { TbQuote as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

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
              preview: {
                select: {
                  name: 'name',
                  role: 'role',
                  company: 'company',
                  media: 'avatar',
                },
                prepare({ name, role, company, media }) {
                  const subtitle = [];
                  if (role) subtitle.push(role);
                  if (company) subtitle.push(company);

                  return {
                    title: `Author: ${name || 'Untitled'}`,
                    subtitle:
                      subtitle.length > 0 ? subtitle.join(', ') : undefined,
                    media,
                  };
                },
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              description: 'Whether this testimonial should be highlighted',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              quote: 'quote',
              authorName: 'author.name',
              featured: 'featured',
              media: 'author.avatar',
            },
            prepare({ quote, authorName, featured, media }) {
              return {
                title: `Testimonial: ${authorName || 'Untitled'}`,
                subtitle: `${quote ? (quote.length > 40 ? quote.substring(0, 40) + '...' : quote) : 'No quote'}${featured ? ' • Featured' : ''}`,
                media,
              };
            },
          },
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
      testimonials: 'testimonials',
    },
    prepare({ title, testimonials = [] }) {
      return {
        title: `Testimonials: ${title || 'Untitled'}`,
        subtitle: `${testimonials.length} testimonial${testimonials.length === 1 ? '' : 's'}`,
        media: Icon,
      };
    },
  },
});

/**
 * Default layout schema for testimonials content items
 */
export const defaultTestimonialsLayout = defineType({
  name: `${testimonialsSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
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
          { title: 'Card grid', value: 'card-grid' },
        ],
      },
      initialValue: 'simple-centered',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'darkMode',
      title: 'Dark Mode',
      type: 'boolean',
      description: 'Whether this section should be displayed in dark mode',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      darkMode: 'darkMode',
    },
    prepare({ variant, darkMode }) {
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple Centered';

      const features = [];
      if (darkMode) features.push('Dark Mode');

      return {
        title: `Testimonials Layout: ${variantDisplay}`,
        subtitle: features.length > 0 ? features.join(', ') : 'Default',
        media: Icon,
      };
    },
  },
});

/**
 * Content descriptor for testimonials content items
 */
export class TestimonialsDescriptor extends ContentDescriptor {
  static readonly schemaName = testimonialsSchema.name;

  constructor(props: Partial<TestimonialsDescriptor>) {
    super(TestimonialsDescriptor.schemaName, props);
  }
}
