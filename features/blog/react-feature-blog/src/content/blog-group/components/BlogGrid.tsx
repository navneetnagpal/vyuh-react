import { useVyuh } from '@vyuh/react-core';
import React, { Fragment } from 'react';
import { cn } from '../../../shared/utils';
import { BlogGroup } from '../blog-group';

interface BlogGridProps {
  posts: BlogGroup['posts'];
  variant: string;
  columns: number;
  className?: string;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts, className }) => {
  const { plugins } = useVyuh();

  return (
    <div
      className={cn(
        'grid grid-flow-dense gap-8',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {posts.map((post, index) => (
        <Fragment key={index}>{plugins.content.render(post)}</Fragment>
      ))}
    </div>
  );
};
