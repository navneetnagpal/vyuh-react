import React from 'react';
import { BlogAuthor } from '../blog-author';
import { MiniBlogAuthorLayout } from '../mini-blog-author-layout';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';

interface BlogAuthorMiniComponentProps {
  content: BlogAuthor;
  layout: MiniBlogAuthorLayout;
  className?: string;
}

export const BlogAuthorMiniComponent: React.FC<BlogAuthorMiniComponentProps> = ({
  content,
  layout,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  return (
    <div className={cn(
      "flex items-start",
      content.featured && "text-primary",
      className
    )}>
      {/* Avatar */}
      {content.avatar && (
        <div className="avatar mr-2">
          <div className={cn(
            "rounded-full overflow-hidden h-6 w-6",
            content.featured && "ring-1 ring-primary ring-offset-1"
          )}>
            <img
              src={getImageUrl(content.avatar)}
              alt={content.name}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Author Name and Role */}
      <div className="flex flex-col justify-center">
        <span className="text-xs font-medium leading-tight">
          {content.name}
        </span>
        {content.role && (
          <span className="text-[10px] opacity-75 leading-tight mt-0.5">
            {content.role}
          </span>
        )}
      </div>
    </div>
  );
};
