import {
  BlogPostSchemaBuilder,
  BlogPostSummaryDescriptor,
} from './content/blog-post-summary';
import { FeatureDescriptor } from '@vyuh/sanity-schema-core';
import { RouteDescriptor } from '@vyuh/sanity-schema-system';
import {
  BlogGroupDescriptor,
  BlogGroupSchemaBuilder,
  defaultBlogGroupLayout,
} from './content/blog-group';

export const blog = new FeatureDescriptor({
  name: 'blog',
  title: 'Blog',
  description:
    'Schema for Blog components including blog posts, blog post summaries, and blog post groups',
  contents: [
    new BlogGroupDescriptor({
      layouts: [defaultBlogGroupLayout],
    }),
    new RouteDescriptor({
      regionItems: [
        { type: BlogGroupDescriptor.schemaName },
        { type: BlogPostSummaryDescriptor.schemaName },
      ],
    }),
  ],
  contentSchemaBuilders: [
    new BlogPostSchemaBuilder(),
    new BlogGroupSchemaBuilder(),
  ],
});
