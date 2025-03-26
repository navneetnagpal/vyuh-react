import { defineField, defineType } from 'sanity';
import { TbBrandAirtable as Icon } from 'react-icons/tb';

/**
 * Logo section schema for marketing pages
 * Used for logo clouds, partner logos, etc.
 */
export const logoSchema = defineType({
  name: 'marketing.logo',
  title: 'Logo Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "Trusted by" or "Our partners"',
    }),
    defineField({
      name: 'items',
      title: 'Logo Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'action',
              title: 'Logo Link',
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
      itemCount: 'items.length',
    },
    prepare({ title, itemCount = 0 }) {
      return {
        title: title || 'Logo Section',
        subtitle: `${itemCount} logo${itemCount === 1 ? '' : 's'}`,
      };
    },
  },
});


