import { ContentBuilder } from '@vyuh/react-extension-content';
import { BLOG_GROUP_SCHEMA_TYPE, BlogGroup } from './blog-group';
import { DefaultBlogGroupLayout } from './default-blog-group-layout';

/**
 * Content builder for Blog section content items
 */
export class BlogGroupContentBuilder extends ContentBuilder<BlogGroup> {
  constructor() {
    super({
      schemaType: BLOG_GROUP_SCHEMA_TYPE,
      defaultLayout: new DefaultBlogGroupLayout(),
      defaultLayoutDescriptor: DefaultBlogGroupLayout.typeDescriptor,
    });
  }
}
