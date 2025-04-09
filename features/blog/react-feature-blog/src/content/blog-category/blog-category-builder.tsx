import { ContentBuilder } from '@vyuh/react-extension-content';
import { BlogCategory, BLOG_CATEGORY_SCHEMA_TYPE } from './blog-category';
import { DefaultBlogCategoryLayout } from './default-blog-category-layout';

/**
 * Content builder for Blog Category content items
 */
export class BlogCategoryContentBuilder extends ContentBuilder<BlogCategory> {
  constructor() {
    super({
      schemaType: BLOG_CATEGORY_SCHEMA_TYPE,
      defaultLayout: new DefaultBlogCategoryLayout(),
      defaultLayoutDescriptor: DefaultBlogCategoryLayout.typeDescriptor,
    });
  }
}
