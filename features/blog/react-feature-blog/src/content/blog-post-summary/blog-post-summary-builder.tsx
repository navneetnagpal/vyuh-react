import { BlogPostSummary, BLOG_POST_SUMMARY_SCHEMA_TYPE } from './blog-post-summary';
import { DefaultBlogPostSummaryLayout } from './default-blog-post-summary-layout';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Blog Post Summary content items
 */
export class BlogPostSummaryContentBuilder extends ContentBuilder<BlogPostSummary> {
  constructor() {
    super({
      schemaType: BLOG_POST_SUMMARY_SCHEMA_TYPE,
      defaultLayout: new DefaultBlogPostSummaryLayout(),
      defaultLayoutDescriptor: DefaultBlogPostSummaryLayout.typeDescriptor,
    });
  }
}
