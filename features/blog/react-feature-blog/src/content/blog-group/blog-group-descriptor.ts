import { ContentDescriptor } from '@vyuh/react-extension-content';
import { BLOG_GROUP_SCHEMA_TYPE, BlogGroup } from './blog-group';

/**
 * Content type descriptor for Blog section content items
 */
export class BlogGroupDescriptor extends ContentDescriptor<BlogGroup> {
  constructor(props?: Partial<BlogGroupDescriptor>) {
    super({
      schemaType: BLOG_GROUP_SCHEMA_TYPE,
      title: 'Blog Section',
      layouts: props?.layouts,
    });
  }
}
