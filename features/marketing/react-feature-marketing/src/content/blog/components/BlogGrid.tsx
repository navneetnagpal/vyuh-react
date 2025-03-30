import { Blog } from '@/content/blog/blog';
import { cn } from '@/shared/utils';
import React from 'react';
import { BlogPostCard } from './BlogPostCard';

interface BlogGridProps {
  posts: Blog['posts'];
  variant: string;
  columns: number;
  className?: string;
}

export const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  variant,
  columns,
  className,
}) => {
  // All posts are displayed in the grid, featured posts will stand out with styling

  // Default to simple-grid
  return (
    <div
      className={cn(
        'grid grid-flow-dense gap-8',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {posts.map((post, index) => (
        <BlogPostCard key={index} post={post} />
      ))}
    </div>
  );
};
