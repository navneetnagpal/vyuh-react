import { FeatureDescriptor } from '@vyuh/react-core';
import { ContentExtensionDescriptor } from '@vyuh/react-extension-content';
import { FaPagelines as Icon } from 'react-icons/fa6';
import { BlogGroupContentBuilder } from './content/blog-group/blog-group-builder';
import { BlogPostSummaryContentBuilder } from './content/blog-post-summary/blog-post-summary-builder';

// Export content types and components
export * from './content/blog-group';
export * from './content/blog-post-summary';

export const blog = new FeatureDescriptor({
  name: 'blog',
  title: 'Blog',
  description: 'Blog components for building Blog pages',
  icon: <Icon />,
  extensions: [
    new ContentExtensionDescriptor({
      contentBuilders: [
        new BlogGroupContentBuilder(),
        new BlogPostSummaryContentBuilder(),
      ],
    }),
  ],
});
