import { Blog as BlogContent } from '@/content/blog/blog';
import { DefaultBlogLayout } from '@/content/blog/default-blog-layout';
import { cn } from '@/content/shared/utils';
import React from 'react';
import { BlogHeader } from './BlogHeader';
import { BlogGrid } from './BlogGrid';
import { BlogAction } from './BlogAction';

interface BlogProps {
  content: BlogContent;
  layout: DefaultBlogLayout;
  className?: string;
}

export const Blog: React.FC<BlogProps> = ({
  content,
  layout,
  className,
}) => {
  const variant = layout.variant || 'simple-grid';
  const darkMode = layout.darkMode || false;
  const columns = layout.columns || 3;

  // Background color classes based on dark mode
  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  return (
    <section
      className={cn(
        'px-6 py-12',
        backgroundClasses,
        className
      )}
    >
      <div className="container mx-auto">
        {/* Section header */}
        <BlogHeader
          content={content}
          darkMode={darkMode}
          className="mb-10"
        />

        {/* Blog posts */}
        <BlogGrid
          posts={content.posts}
          variant={variant}
          columns={columns}
          darkMode={darkMode}
        />

        {/* Call-to-action button */}
        {content.action && (
          <div className="mt-10 text-center">
            <BlogAction action={content.action} />
          </div>
        )}
      </div>
    </section>
  );
};
