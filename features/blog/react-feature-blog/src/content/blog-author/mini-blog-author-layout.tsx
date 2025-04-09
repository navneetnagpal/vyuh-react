import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BLOG_AUTHOR_SCHEMA_TYPE, BlogAuthor } from './blog-author';
import { BlogAuthorMiniComponent } from './components/BlogAuthorMiniComponent';

/**
 * Mini layout for Blog Author content items
 *
 * This layout provides a compact representation of an author,
 * suitable for use in metadata sections, bylines, or anywhere
 * a condensed view is needed.
 */
export class MiniBlogAuthorLayout extends LayoutConfiguration<BlogAuthor> {
  static readonly schemaName = `${BLOG_AUTHOR_SCHEMA_TYPE}.layout.mini`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: MiniBlogAuthorLayout.schemaName,
      title: 'Mini Blog Author Layout',
    });
  }

  render(content: BlogAuthor): React.ReactNode {
    return <BlogAuthorMiniComponent content={content} layout={this} />;
  }
}
