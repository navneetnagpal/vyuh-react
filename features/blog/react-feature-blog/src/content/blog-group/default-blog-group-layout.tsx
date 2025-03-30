import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BLOG_GROUP_SCHEMA_TYPE, BlogGroup } from './blog-group';
import { BlogPostGroup } from './components/BlogPostGroup';

/**
 * Blog layout variant type
 */
export type BlogVariant = 'simple-grid';

/**
 * Default layout for Blog section content items
 */
export class DefaultBlogGroupLayout extends LayoutConfiguration<BlogGroup> {
  static readonly schemaName = `${BLOG_GROUP_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: BlogVariant;
  readonly columns?: number;

  constructor(props?: Partial<DefaultBlogGroupLayout>) {
    super({
      schemaType: DefaultBlogGroupLayout.schemaName,
      title: 'Default Blog Layout',
    });

    this.variant = props?.variant || 'simple-grid';
    this.columns = props?.columns || 2;
  }

  render(content: BlogGroup): React.ReactNode {
    return <BlogPostGroup content={content} layout={this} />;
  }
}
