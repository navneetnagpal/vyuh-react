import { defineField, defineType } from 'sanity';
import { TbArticle as Icon } from 'react-icons/tb';

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
        },
      ],
      validation: (Rule) => Rule.required().min(1).custom((posts, context) => {
        if (context.parent?.variant === 'with-featured-post') {
          const featuredPosts = posts.filter(post => post.featured);
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
      subtitle: 'variant',
      postCount: 'posts.length',
    },
    prepare({ title, subtitle, postCount = 0 }) {
      return {
        title: title || 'Blog Section',
        subtitle: `Variant: ${subtitle || 'None'} • ${postCount} post${postCount === 1 ? '' : 's'}`,
      };
    },
  },
});
