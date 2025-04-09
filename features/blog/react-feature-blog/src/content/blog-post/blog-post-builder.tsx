import { ContentBuilder } from '@vyuh/react-extension-content';
import { BLOG_POST_SCHEMA_TYPE, BlogPost } from './blog-post';
import { DefaultBlogPostLayout } from './default-blog-post-layout';

/**
 * Content builder for Blog Post content items
 */
export class BlogPostContentBuilder extends ContentBuilder<BlogPost> {
  constructor() {
    super({
      schemaType: BLOG_POST_SCHEMA_TYPE,
      defaultLayout: new DefaultBlogPostLayout(),
      defaultLayoutDescriptor: DefaultBlogPostLayout.typeDescriptor,
    });
  }
}
