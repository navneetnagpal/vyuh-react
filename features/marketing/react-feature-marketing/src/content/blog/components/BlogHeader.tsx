import { Blog } from '@/content/blog/blog';
import { cn } from '@/shared/utils';
import React from 'react';

interface BlogHeaderProps {
  content: Pick<Blog, 'title' | 'subtitle'>;
  className?: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  content,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
      {content.subtitle && (
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
