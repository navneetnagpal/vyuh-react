import React from 'react';
import { BlogPost } from '../blog-post';
import { cn } from '@/shared/utils';
import { useVyuh } from '@vyuh/react-core';

interface BlogPostContentProps {
  content: BlogPost;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({
  content,
}) => {
  const { plugins } = useVyuh();

  return (
    <div
      className={cn(
        'prose prose-lg max-w-none mt-8',
        'prose-headings:font-bold prose-headings:text-primary',
        'prose-a:text-secondary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-secondary/80',
        'prose-img:rounded-lg prose-img:shadow-md prose-img:transition-all prose-img:duration-300 hover:prose-img:shadow-lg',
        'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-base-200 prose-blockquote:p-4 prose-blockquote:italic',
        'prose-code:text-secondary prose-code:bg-base-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-base-300 prose-pre:text-base-content prose-pre:shadow-md',
        'prose-hr:border-base-300',
        'prose-table:border-collapse prose-table:border prose-table:border-base-300',
        'prose-th:bg-base-200 prose-th:border prose-th:border-base-300 prose-th:p-2',
        'prose-td:border prose-td:border-base-300 prose-td:p-2',
      )}
    >
      {plugins.content.render(content.content)}
    </div>
  );
};
