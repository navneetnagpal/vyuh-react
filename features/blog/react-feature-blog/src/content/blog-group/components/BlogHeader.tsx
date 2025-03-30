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
      <h2 className="mb-4 text-3xl font-bold text-base-content">{content.title}</h2>
      {content.subtitle && (
        <p className="mx-auto max-w-2xl text-lg text-base-content/70">
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
