import { Action } from '@vyuh/react-core';
import React from 'react';
import { useMediaUtils } from '../../../shared/MediaUtils';
import { cn } from '../../../shared/utils';
import { BlogPostSummary } from '../blog-post-summary';

interface BlogPostCardProps {
  content: BlogPostSummary;
  className?: string;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  content,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  // Format date to a readable string
  const formatDate = (dateString: string | undefined) => {
    if (!dateString || dateString.trim() === '') {
      return null;
    }

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg transition-all hover:shadow-md',
        content.featured
          ? 'bg-primary/15 border-primary/20 border'
          : 'bg-base-100 border-base-300 border',
        'cursor-pointer',
        className,
      )}
      onClick={() => new Action(content.action).execute()}
    >
      {/* Featured image */}
      {content.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={getImageUrl(content.image)}
            alt={content.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Categories */}
        {content.categories && content.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {content.categories.map((category, idx) => (
              <span
                key={idx}
                className={cn(
                  'inline-block rounded-full px-3 py-1 text-xs font-medium',
                  content.featured
                    ? 'bg-primary/10 text-primary'
                    : 'bg-base-300 text-base-content',
                )}
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <span className={'text-base-content/60 text-xs'}>
          {formatDate(content.date)}
        </span>

        {/* Title */}
        <h3 className={cn('mb-2 font-semibold')}>{content.title}</h3>

        {/* Date and author */}
        <div className="text-base-content/60 mb-3 flex items-center justify-between text-xs">
          {content.author && (
            <div className={'flex items-center'}>
              {content.author.avatar && (
                <img
                  src={getImageUrl(content.author.avatar)}
                  alt={content.author.name}
                  className="mr-2 h-6 w-6 rounded-full"
                />
              )}
              <div className={'flex flex-col items-start justify-start'}>
                <span>{content.author.name}</span>

                {content.author.role && (
                  <span className="text-[10px] opacity-75">
                    {content.author.role}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {content.excerpt && (
          <p className={cn('mb-4 flex-1 text-sm', 'text-base-content/70')}>
            {content.excerpt}
          </p>
        )}

        {/* Read more button */}
        <div className="mt-auto">
          <button
            className={cn(
              'btn btn-link btn-sm group h-auto min-h-0 p-0 no-underline',
              content.featured ? 'text-primary' : 'text-primary',
            )}
            onClick={(e) => {
              e.stopPropagation();
              new Action(content.action).execute();
            }}
          >
            Read more
            <svg
              className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
