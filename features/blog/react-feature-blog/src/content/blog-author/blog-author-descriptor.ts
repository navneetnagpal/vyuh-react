import { ContentDescriptor } from '@vyuh/react-extension-content';
import { BLOG_AUTHOR_SCHEMA_TYPE, BlogAuthor } from './blog-author';

/**
 * Content type descriptor for Blog Author content items
 */
export class BlogAuthorDescriptor extends ContentDescriptor<BlogAuthor> {
  constructor(props?: Partial<BlogAuthorDescriptor>) {
    super({
      schemaType: BLOG_AUTHOR_SCHEMA_TYPE,
      title: 'Blog Author',
      layouts: props?.layouts,
    });
  }
}
