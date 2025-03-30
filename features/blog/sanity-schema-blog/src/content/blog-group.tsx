import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { TbArticle as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

export class BlogGroupDescriptor extends ContentDescriptor {
  static readonly schemaName = 'blog.group';

  constructor(props: Partial<BlogGroupDescriptor>) {
    super(BlogGroupDescriptor.schemaName, props);
  }
}

export const defaultBlogGroupLayout = defineType({
  name: `${BlogGroupDescriptor.schemaName}.layout.default`,
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
        list: [{ title: 'Simple grid', value: 'simple-grid' }],
      },
      initialValue: 'simple-grid',
      validation: (Rule) => Rule.required(),
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
      initialValue: 2,
      hidden: ({ parent }) =>
        !['simple-grid', 'card-grid'].includes(parent?.variant),
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      columns: 'columns',
    },
    prepare({ variant, columns }) {
      const variantDisplay =
        {
          'simple-grid': 'Simple Grid',
          'card-grid': 'Card Grid',
        }[variant] || 'Default';

      const features = [];
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

export class BlogGroupSchemaBuilder extends ContentSchemaBuilder {
  private schema = defineType({
    name: BlogGroupDescriptor.schemaName,
    title: 'Blog Group',
    type: 'object',
    icon: Icon,
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The main title for the group of posts',
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
        of: [{ type: 'blog.post.summary' }],
        validation: (Rule) => Rule.required().min(1),
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

  constructor() {
    super(BlogGroupDescriptor.schemaName);
  }

  build(descriptors: ContentDescriptor[]) {
    return this.schema;
  }
}
