import { defineField, defineType } from 'sanity';
import { TbUser as Icon } from 'react-icons/tb';

export const blogAuthor = defineType({
  name: 'blog.author',
  title: 'Blog Author',
  type: 'document',
  icon: Icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the author',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the author',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Profile picture of the author',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'A brief biography of the author',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'The role or position of the author',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'The email address of the author',
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
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              return {
                title: platform
                  ? platform.charAt(0).toUpperCase() + platform.slice(1)
                  : 'Link',
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Whether this author should be featured',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: title || 'Untitled Author',
        subtitle: featured ? `${subtitle || ''} • Featured` : subtitle,
        media,
      };
    },
  },
});
