import { Blog, BLOG_SCHEMA_TYPE } from '@/content/blog/blog';
import { Blog as BlogComponent } from '@/content/blog/components/Blog';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Blog layout variant type
 */
export type BlogVariant = 'simple-grid';

/**
 * Default layout for Blog section content items
 */
export class DefaultBlogLayout extends LayoutConfiguration<Blog> {
  static readonly schemaName = `${BLOG_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: BlogVariant;
  readonly columns?: number;

  constructor(props?: Partial<DefaultBlogLayout>) {
    super({
      schemaType: DefaultBlogLayout.schemaName,
      title: 'Default Blog Layout',
    });

    this.variant = props?.variant || 'simple-grid';
    this.columns = props?.columns || 2;
  }

  render(content: Blog): React.ReactNode {
    return <BlogComponent content={content} layout={this} />;
  }
}
