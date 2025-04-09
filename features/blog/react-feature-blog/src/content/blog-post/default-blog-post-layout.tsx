import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BLOG_POST_SCHEMA_TYPE, BlogPost } from './blog-post';
import { BlogPostComponent } from './components/BlogPostComponent';

/**
 * Default layout for Blog Post content items
 */
export class DefaultBlogPostLayout extends LayoutConfiguration<BlogPost> {
  static readonly schemaName = `${BLOG_POST_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultBlogPostLayout.schemaName,
      title: 'Default Blog Post Layout',
    });
  }

  render(content: BlogPost): React.ReactNode {
    return <BlogPostComponent content={content} layout={this} />;
  }
}
