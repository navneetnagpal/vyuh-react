import { defineField, defineType } from 'sanity';
import { TbArticle as Icon } from 'react-icons/tb';

export const blogPost = defineType({
  name: 'blog.post',
  title: 'Blog Post',
  type: 'document',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the blog post',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary of the post',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'The main image for the blog post',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'vyuh.portableText',
      description: 'The main content of the blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'blog.author' }],
      description: 'The author of the blog post',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blog.category' }],
        },
      ],
      description: 'Categories this blog post belongs to',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'The date and time when the blog post was published',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Whether this post should be featured',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'SEO metadata for the blog post',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title used for SEO (defaults to post title if empty)',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description used for SEO (defaults to excerpt if empty)',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Keywords for SEO',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'featuredImage',
      authorName: 'author.name',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, authorName, featured }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : '';
      const displaySubtitle = [
        authorName ? `By ${authorName}` : '',
        date,
        featured ? 'Featured' : '',
      ]
        .filter(Boolean)
        .join(' • ');

      return {
        title: title || 'Untitled Post',
        subtitle: displaySubtitle,
        media,
      };
    },
  },
});
