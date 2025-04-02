import React from 'react';
import { cn } from '../../../shared/utils';
import { BlogGroup } from '../blog-group';

interface BlogHeaderProps {
  content: Pick<BlogGroup, 'title' | 'subtitle'>;
  className?: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  content,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <h2 className="text-base-content mb-4 text-3xl font-bold">
        {content.title}
      </h2>
      {content.subtitle && (
        <p className="text-base-content/70 mx-auto max-w-2xl text-lg">
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
