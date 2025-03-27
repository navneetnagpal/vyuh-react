import { defineField, defineType } from 'sanity';
import { TbUsers as Icon } from 'react-icons/tb';

/**
 * Team section schema for marketing pages
 * Based on common patterns from Tailwind UI team sections
 */
export const teamSchema = defineType({
  name: 'marketing.team',
  title: 'Team Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the team section',
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
      description: 'The style variant for the team section',
      options: {
        list: [
          { title: 'Simple grid', value: 'simple-grid' },
          { title: 'With large images', value: 'with-large-images' },
          { title: 'With roles and social links', value: 'with-roles-social' },
          { title: 'Card grid', value: 'card-grid' },
          { title: 'With background', value: 'with-background' },
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
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              description: 'Short biography of the team member',
            }),
            defineField({
              name: 'featured',
              title: 'Featured Member',
              type: 'boolean',
              description: 'Whether this member should be highlighted',
              initialValue: false,
            }),
            defineField({
              name: 'socialLinks',
              title: 'Social Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'platform',
                      title: 'Platform',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Twitter', value: 'twitter' },
                          { title: 'LinkedIn', value: 'linkedin' },
                          { title: 'GitHub', value: 'github' },
                          { title: 'Instagram', value: 'instagram' },
                          { title: 'Facebook', value: 'facebook' },
                          { title: 'Website', value: 'website' },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'action',
                      title: 'Social Link',
                      type: 'vyuh.action',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
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
      memberCount: 'members.length',
    },
    prepare({ title, subtitle, memberCount = 0 }) {
      return {
        title: title || 'Team Section',
        subtitle: `Variant: ${subtitle || 'None'} • ${memberCount} member${memberCount === 1 ? '' : 's'}`,
      };
    },
  },
});
