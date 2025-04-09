import { ContentDescriptor } from '@vyuh/react-extension-content';
import { BLOG_POST_SCHEMA_TYPE, BlogPost } from './blog-post';

/**
 * Content type descriptor for Blog Post content items
 */
export class BlogPostDescriptor extends ContentDescriptor<BlogPost> {
  constructor(props?: Partial<BlogPostDescriptor>) {
    super({
      schemaType: BLOG_POST_SCHEMA_TYPE,
      title: 'Blog Post',
      layouts: props?.layouts,
    });
  }
}
