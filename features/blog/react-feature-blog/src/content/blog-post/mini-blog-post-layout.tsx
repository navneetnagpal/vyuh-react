import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BLOG_POST_SCHEMA_TYPE, BlogPost } from './blog-post';
import { BlogPostMiniComponent } from './components/BlogPostMiniComponent';

/**
 * Mini layout for Blog Post content items
 *
 * This layout provides a compact representation of a blog post,
 * suitable for use in sidebars, related posts sections, or anywhere
 * a condensed view is needed.
 */
export class MiniBlogPostLayout extends LayoutConfiguration<BlogPost> {
  static readonly schemaName = `${BLOG_POST_SCHEMA_TYPE}.layout.mini`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: MiniBlogPostLayout.schemaName,
      title: 'Mini Blog Post Layout',
    });
  }

  render(content: BlogPost): React.ReactNode {
    return <BlogPostMiniComponent content={content} layout={this} />;
  }
}
