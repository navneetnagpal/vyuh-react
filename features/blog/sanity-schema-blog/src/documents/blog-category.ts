import { defineField, defineType } from 'sanity';
import { TbCategory as Icon } from 'react-icons/tb';

export const blogCategory = defineType({
  name: 'blog.category',
  title: 'Blog Category',
  type: 'document',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the category',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the category',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the category',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'An optional icon for the category',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'A color code for the category (hex, rgb, etc.)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Whether this category should be featured',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'The order in which this category should appear (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'icon',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: title || 'Untitled Category',
        subtitle: featured ? `${subtitle || ''} • Featured` : subtitle,
        media,
      };
    },
  },
});
