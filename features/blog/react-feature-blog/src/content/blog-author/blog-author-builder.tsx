import { ContentBuilder } from '@vyuh/react-extension-content';
import { BlogAuthor, BLOG_AUTHOR_SCHEMA_TYPE } from './blog-author';
import { DefaultBlogAuthorLayout } from './default-blog-author-layout';
import { MiniBlogAuthorLayout } from './mini-blog-author-layout';

/**
 * Content builder for Blog Author content items
 */
export class BlogAuthorContentBuilder extends ContentBuilder<BlogAuthor> {
  constructor() {
    super({
      schemaType: BLOG_AUTHOR_SCHEMA_TYPE,
      defaultLayout: new DefaultBlogAuthorLayout(),
      defaultLayoutDescriptor: DefaultBlogAuthorLayout.typeDescriptor,
      layouts: [
        DefaultBlogAuthorLayout.typeDescriptor,
        MiniBlogAuthorLayout.typeDescriptor
      ]
    });
  }
}
