import React from 'react';
import { Section } from '../../../shared/components';
import { BlogGroup } from '../blog-group';
import { DefaultBlogGroupLayout } from '../default-blog-group-layout';
import { BlogAction } from './BlogAction';
import { BlogGrid } from './BlogGrid';
import { BlogHeader } from './BlogHeader';

interface BlogProps {
  content: BlogGroup;
  layout: DefaultBlogGroupLayout;
  className?: string;
}

export const BlogPostGroup: React.FC<BlogProps> = ({
  content,
  layout,
  className,
}) => {
  const variant = layout.variant || 'simple-grid';
  const columns = layout.columns || 3;

  // Background color classes using Daisy UI theme variables
  const backgroundClasses = 'bg-base-100 text-base-content';

  return (
    <Section className={className}>
      {/* Section header */}
      <BlogHeader content={content} className="mb-10" />

      {/* Blog posts */}
      <BlogGrid posts={content.posts} variant={variant} columns={columns} />

      {/* Call-to-action button */}
      {content.action && (
        <div className="mt-10 text-center">
          <BlogAction action={content.action} />
        </div>
      )}
    </Section>
  );
};
