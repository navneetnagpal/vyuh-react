import { ContentDescriptor } from '@vyuh/sanity-schema-core';
import { TbArticle as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Blog section schema for marketing pages
 * Based on common patterns from Tailwind UI blog sections
 */
export const blogSchema = defineType({
  name: 'marketing.blog',
  title: 'Blog Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the blog section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A supporting text that appears below the title',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Post Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'excerpt',
              title: 'Excerpt',
              type: 'text',
              description: 'A short summary of the post',
            }),
            defineField({
              name: 'image',
              title: 'Featured Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'date',
              title: 'Publication Date',
              type: 'date',
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
                  media: 'avatar',
                },
                prepare({ name, role, media }) {
                  return {
                    title: `Author: ${name || 'Untitled'}`,
                    subtitle: role,
                    media,
                  };
                },
              },
            }),
            defineField({
              name: 'categories',
              title: 'Categories',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'featured',
              title: 'Featured Post',
              type: 'boolean',
              description: 'Whether this post should be featured',
              initialValue: false,
            }),
            defineField({
              name: 'action',
              title: 'Post Link',
              type: 'vyuh.action',
              description: 'Link to the full post',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              authorName: 'author.name',
              featured: 'featured',
              media: 'image',
            },
            prepare({ title, date, authorName, featured, media }) {
              const formattedDate = date
                ? new Date(date).toLocaleDateString()
                : '';
              const subtitle = [];
              if (authorName) subtitle.push(authorName);
              if (formattedDate) subtitle.push(formattedDate);
              if (featured) subtitle.push('Featured');

              return {
                title: `Post: ${title || 'Untitled'}`,
                subtitle:
                  subtitle.length > 0 ? subtitle.join(' • ') : undefined,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((posts, context) => {
            if (context.parent?.variant === 'with-featured-post') {
              const featuredPosts = posts.filter((post) => post.featured);
              if (featuredPosts.length === 0) {
                return 'At least one post must be marked as featured for this variant';
              }
              if (featuredPosts.length > 1) {
                return 'Only one post should be marked as featured for this variant';
              }
            }
            return true;
          }),
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'vyuh.action',
      description: 'Optional call-to-action button (e.g., "View all posts")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      posts: 'posts',
    },
    prepare({ title, posts = [] }) {
      return {
        title: `Blog: ${title || 'Untitled'}`,
        subtitle: `${posts.length} post${posts.length === 1 ? '' : 's'}`,
        media: Icon,
      };
    },
  },
});

/**
 * Default layout schema for blog content items
 */
export const defaultBlogLayout = defineType({
  name: `${blogSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the blog section',
      options: {
        list: [
          { title: 'Simple grid', value: 'simple-grid' },
          { title: 'With featured post', value: 'with-featured-post' },
          { title: 'Card grid', value: 'card-grid' },
          { title: 'List with image', value: 'list-with-image' },
          { title: 'Compact list', value: 'compact-list' },
        ],
      },
      initialValue: 'simple-grid',
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
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'Number of columns to display (for grid variants)',
      options: {
        list: [
          { title: '2 columns', value: 2 },
          { title: '3 columns', value: 3 },
          { title: '4 columns', value: 4 },
        ],
      },
      initialValue: 3,
      hidden: ({ parent }) =>
        !['simple-grid', 'card-grid'].includes(parent?.variant),
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      darkMode: 'darkMode',
      columns: 'columns',
    },
    prepare({ variant, darkMode, columns }) {
      const variantDisplay =
        {
          'simple-grid': 'Simple Grid',
          'with-featured-post': 'With Featured Post',
          'card-grid': 'Card Grid',
          'list-with-image': 'List with Image',
          'compact-list': 'Compact List',
        }[variant] || 'Default';

      const features = [];
      if (darkMode) features.push('Dark Mode');
      if (columns && ['simple-grid', 'card-grid'].includes(variant)) {
        features.push(`${columns} columns`);
      }

      return {
        title: `Blog Layout: ${variantDisplay}`,
        subtitle: features.length > 0 ? features.join(', ') : 'Default',
      };
    },
  },
});

export class BlogDescriptor extends ContentDescriptor {
  static readonly schemaName = blogSchema.name;

  constructor(props: Partial<BlogDescriptor>) {
    super(BlogDescriptor.schemaName, props);
  }
}
