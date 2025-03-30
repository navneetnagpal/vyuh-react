import {
  ContentDescriptor,
  ContentSchemaBuilder,
  defaultLayoutConfiguration,
} from '@vyuh/sanity-schema-core';
import { TbArticle as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

export class BlogPostSummaryDescriptor extends ContentDescriptor {
  static readonly schemaName = 'blog.post.summary';

  constructor(props: Partial<BlogPostSummaryDescriptor>) {
    super(BlogPostSummaryDescriptor.schemaName, props);
  }
}

export class BlogPostSchemaBuilder extends ContentSchemaBuilder {
  private schema = defineType({
    name: 'blog.post.summary',
    title: 'Blog Post Summary',
    type: 'object',
    icon: Icon,
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
        const formattedDate = date ? new Date(date).toLocaleDateString() : '';
        const subtitle = [];
        if (authorName) subtitle.push(authorName);
        if (formattedDate) subtitle.push(formattedDate);
        if (featured) subtitle.push('Featured');

        return {
          title: `Post: ${title || 'Untitled'}`,
          subtitle: subtitle.length > 0 ? subtitle.join(' • ') : undefined,
          media,
        };
      },
    },
  });

  constructor() {
    super(BlogPostSummaryDescriptor.schemaName);
  }

  build(descriptors: ContentDescriptor[]) {
    return this.schema;
  }
}

export const defaultBlogPostSummaryLayout = defaultLayoutConfiguration(
  `${BlogPostSummaryDescriptor.schemaName}.layout.default`,
);
