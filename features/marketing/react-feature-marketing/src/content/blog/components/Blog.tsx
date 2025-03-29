import { Blog as BlogContent } from '@/content/blog/blog';
import { DefaultBlogLayout } from '@/content/blog/default-blog-layout';
import { Section } from '@/shared/components/Section';
import { cn } from '@/shared/utils';
import React from 'react';
import { BlogAction } from './BlogAction';
import { BlogGrid } from './BlogGrid';
import { BlogHeader } from './BlogHeader';

interface BlogProps {
  content: BlogContent;
  layout: DefaultBlogLayout;
  className?: string;
}

export const Blog: React.FC<BlogProps> = ({ content, layout, className }) => {
  const variant = layout.variant || 'simple-grid';
  const columns = layout.columns || 3;

  // Background color classes
  const backgroundClasses = 'bg-white text-gray-900';

  return (
    <Section className={className} padding="lg">
      {/* Section header */}
      <BlogHeader content={content} className="mb-10" />

      {/* Blog posts */}
      <BlogGrid
        posts={content.posts}
        variant={variant}
        columns={columns}
      />

      {/* Call-to-action button */}
      {content.action && (
        <div className="mt-10 text-center">
          <BlogAction action={content.action} />
        </div>
      )}
    </Section>
  );
};
