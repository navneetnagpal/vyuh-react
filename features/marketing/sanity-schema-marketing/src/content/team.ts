import { ContentDescriptor } from '@vyuh/sanity-schema-core';
import { TbUsers as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

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
                  preview: {
                    select: {
                      platform: 'platform',
                      title: 'action.title',
                      url: 'action.url',
                    },
                    prepare({ platform, title, url }) {
                      return {
                        title: `${platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Social'}: ${title || url || 'Untitled'}`,
                      };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              name: 'name',
              role: 'role',
              featured: 'featured',
              media: 'image',
              socialCount: 'socialLinks.length',
            },
            prepare({ name, role, featured, media, socialCount = 0 }) {
              return {
                title: `Member: ${name || 'Untitled'}`,
                subtitle: `${role || 'No role'}${featured ? ' • Featured' : ''}${socialCount > 0 ? ` • ${socialCount} social link${socialCount === 1 ? '' : 's'}` : ''}`,
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
      members: 'members',
    },
    prepare({ title, members = [] }) {
      return {
        title: `Team: ${title || 'Untitled'}`,
        subtitle: `${members.length} member${members.length === 1 ? '' : 's'}`,
        media: Icon,
      };
    },
  },
});

/**
 * Default layout schema for team content items
 */
export const defaultTeamLayout = defineType({
  name: `${teamSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the team section',
      options: {
        list: [
          { title: 'Simple grid', value: 'simple-grid' },
          { title: 'With large images', value: 'with-large-images' },
        ],
      },
      initialValue: 'simple-grid',
      validation: (Rule) => Rule.required(),
    }),

  ],
  preview: {
    select: {
      variant: 'variant',
    },
    prepare({ variant }) {
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple Grid';

      return {
        title: `Team Layout: ${variantDisplay}`,
        subtitle: 'Default',
        media: Icon,
      };
    },
  },
});

/**
 * Content descriptor for team content items
 */
export class TeamDescriptor extends ContentDescriptor {
  static readonly schemaName = teamSchema.name;

  constructor(props: Partial<TeamDescriptor>) {
    super(TeamDescriptor.schemaName, props);
  }
}
