import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BLOG_POST_SUMMARY_SCHEMA_TYPE, BlogPostSummary } from './blog-post-summary';
import { BlogPostCard } from './components/BlogPostCard';

/**
 * Blog post summary layout variant type
 */
export type BlogPostSummaryVariant = 'standard' | 'featured';

/**
 * Default layout for Blog Post Summary content items
 */
export class DefaultBlogPostSummaryLayout extends LayoutConfiguration<BlogPostSummary> {
  static readonly schemaName = `${BLOG_POST_SUMMARY_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: BlogPostSummaryVariant;

  constructor(props?: Partial<DefaultBlogPostSummaryLayout>) {
    super({
      schemaType: DefaultBlogPostSummaryLayout.schemaName,
      title: 'Default Blog Post Summary Layout',
    });

    this.variant = props?.variant || 'standard';
  }

  render(content: BlogPostSummary): React.ReactNode {
    return <BlogPostCard content={content} />;
  }
}
