import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';
import { BLOG_AUTHOR_SCHEMA_TYPE, BlogAuthor } from './blog-author';
import { BlogAuthorComponent } from './components/BlogAuthorComponent';

/**
 * Default layout for Blog Author content items
 */
export class DefaultBlogAuthorLayout extends LayoutConfiguration<BlogAuthor> {
  static readonly schemaName = `${BLOG_AUTHOR_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultBlogAuthorLayout.schemaName,
      title: 'Default Blog Author Layout',
    });
  }

  render(content: BlogAuthor): React.ReactNode {
    return <BlogAuthorComponent content={content} layout={this} />;
  }
}
