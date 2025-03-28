import { Blog, BLOG_SCHEMA_TYPE } from '@/content/blog/blog';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Blog section content items
 */
export class BlogDescriptor extends ContentDescriptor<Blog> {
  constructor(props?: Partial<BlogDescriptor>) {
    super({
      schemaType: BLOG_SCHEMA_TYPE,
      title: 'Blog Section',
      layouts: props?.layouts,
    });
  }
}
