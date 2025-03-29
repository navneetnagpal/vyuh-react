import { Blog } from '@/content/blog/blog';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface BlogImageListItemProps {
  post: Blog['posts'][0];
  darkMode: boolean;
  className?: string;
}

export const BlogImageListItem: React.FC<BlogImageListItemProps> = ({
  post,
  darkMode,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  // Format date to a readable string
  const formatDate = (dateString: string) => {
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
        'grid cursor-pointer grid-cols-1 gap-6 md:grid-cols-3',
        darkMode ? 'border-gray-700' : 'border-gray-200',
        className,
      )}
      onClick={() => new Action(post.action).execute()}
    >
      {post.image && (
        <div className="aspect-video overflow-hidden rounded-lg">
          <img
            src={getImageUrl(post.image)}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className={cn('md:col-span-2', !post.image && 'md:col-span-3')}>
        <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
        <div
          className={cn(
            'mb-3 flex items-center text-sm',
            darkMode ? 'text-gray-400' : 'text-gray-600',
          )}
        >
          <span>{formatDate(post.date)}</span>
          {post.author && (
            <>
              <span className="mx-2">•</span>
              <span>{post.author.name}</span>
            </>
          )}
        </div>
        {post.excerpt && (
          <p
            className={cn('mb-3', darkMode ? 'text-gray-300' : 'text-gray-600')}
          >
            {post.excerpt}
          </p>
        )}
        <span
          className={cn(
            'inline-flex items-center font-medium',
            darkMode ? 'text-blue-400' : 'text-blue-600',
          )}
        >
          Read more
          <svg
            className="ml-1 h-4 w-4"
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
        </span>
      </div>
    </div>
  );
};
