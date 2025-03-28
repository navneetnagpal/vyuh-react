import { DefaultBlogLayout } from '@/content/blog/default-blog-layout';
import { Blog, BLOG_SCHEMA_TYPE } from '@/content/blog/blog';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Blog section content items
 */
export class BlogContentBuilder extends ContentBuilder<Blog> {
  constructor() {
    super({
      schemaType: BLOG_SCHEMA_TYPE,
      defaultLayout: new DefaultBlogLayout(),
      defaultLayoutDescriptor: DefaultBlogLayout.typeDescriptor,
    });
  }
}
