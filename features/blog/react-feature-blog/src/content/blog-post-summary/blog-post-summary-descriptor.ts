import { BlogPostSummary, BLOG_POST_SUMMARY_SCHEMA_TYPE } from './blog-post-summary';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Blog Post Summary content items
 */
export class BlogPostSummaryDescriptor extends ContentDescriptor<BlogPostSummary> {
  constructor(props?: Partial<BlogPostSummaryDescriptor>) {
    super({
      schemaType: BLOG_POST_SUMMARY_SCHEMA_TYPE,
      title: 'Blog Post Summary',
      layouts: props?.layouts,
    });
  }
}
