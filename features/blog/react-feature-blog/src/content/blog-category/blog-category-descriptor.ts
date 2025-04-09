import { ContentDescriptor } from '@vyuh/react-extension-content';
import { BLOG_CATEGORY_SCHEMA_TYPE, BlogCategory } from './blog-category';

/**
 * Content type descriptor for Blog Category content items
 */
export class BlogCategoryDescriptor extends ContentDescriptor<BlogCategory> {
  constructor(props?: Partial<BlogCategoryDescriptor>) {
    super({
      schemaType: BLOG_CATEGORY_SCHEMA_TYPE,
      title: 'Blog Category',
      layouts: props?.layouts,
    });
  }
}
