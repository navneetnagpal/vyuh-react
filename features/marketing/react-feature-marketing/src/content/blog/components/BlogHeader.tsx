import { Blog } from '@/content/blog/blog';
import { cn } from '@/content/shared/utils';
import React from 'react';

interface BlogHeaderProps {
  content: Pick<Blog, 'title' | 'subtitle'>;
  darkMode: boolean;
  className?: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  content,
  darkMode,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
      {content.subtitle && (
        <p
          className={cn(
            'mx-auto max-w-2xl text-lg',
            darkMode ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
