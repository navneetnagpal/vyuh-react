import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BLOG_CATEGORY_SCHEMA_TYPE, BlogCategory } from './blog-category';
import { BlogCategoryComponent } from './components/BlogCategoryComponent';

/**
 * Blog category layout variant type
 */
export type BlogCategoryVariant = 'standard' | 'compact' | 'badge';

/**
 * Default layout for Blog Category content items
 */
export class DefaultBlogCategoryLayout extends LayoutConfiguration<BlogCategory> {
  static readonly schemaName = `${BLOG_CATEGORY_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: BlogCategoryVariant;
  readonly showDescription?: boolean;
  readonly showIcon?: boolean;

  constructor(props?: Partial<DefaultBlogCategoryLayout>) {
    super({
      schemaType: DefaultBlogCategoryLayout.schemaName,
      title: 'Default Blog Category Layout',
    });

    this.variant = props?.variant || 'standard';
    this.showDescription = props?.showDescription ?? true;
    this.showIcon = props?.showIcon ?? true;
  }

  render(content: BlogCategory): React.ReactNode {
    return <BlogCategoryComponent content={content} layout={this} />;
  }
}
