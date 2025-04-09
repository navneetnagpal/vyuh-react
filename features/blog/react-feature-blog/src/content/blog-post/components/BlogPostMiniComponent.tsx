import React from 'react';
import { BlogPost } from '../blog-post';
import { MiniBlogPostLayout } from '../mini-blog-post-layout';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { formatDate } from './BlogPostComponent';
import { MiniBlogAuthorLayout } from '../../blog-author/mini-blog-author-layout';
import { useVyuh } from '@vyuh/react-core';

interface BlogPostMiniComponentProps {
  content: BlogPost;
  layout: MiniBlogPostLayout;
  className?: string;
}

export const BlogPostMiniComponent: React.FC<BlogPostMiniComponentProps> = ({
  content,
  layout,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();
  const { plugins } = useVyuh();

  return (
    <div className={cn(
      "flex items-start gap-4",
      content.featured && "bg-primary/5 p-3 rounded-lg",
      className
    )}>
      {/* Thumbnail image */}
      {content.featuredImage && (
        <div className="flex-shrink-0">
          <div className="overflow-hidden rounded-md h-16 w-16">
            <img
              src={getImageUrl(content.featuredImage)}
              alt={content.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-medium line-clamp-2 text-base">
          {content.title}
        </h3>

        {/* Excerpt */}
        {content.excerpt && (
          <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
            {content.excerpt}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center mt-2 text-xs text-base-content/60">
          {/* Author */}
          {content.author && (
            <>
              {plugins.content.renderWithLayout(
                {
                  ...content.author,
                  featured: content.author.featured || content.featured
                },
                new MiniBlogAuthorLayout()
              )}
            </>
          )}

          {/* Date */}
          {content.publishedAt && (
            <>
              {content.author && (
                <span className="mx-2 text-base-content/40">•</span>
              )}
              <span>{formatDate(content.publishedAt)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
