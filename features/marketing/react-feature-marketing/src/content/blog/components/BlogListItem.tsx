import { Blog } from '@/content/blog/blog';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface BlogListItemProps {
  post: Blog['posts'][0];
  darkMode: boolean;
  className?: string;
}

export const BlogListItem: React.FC<BlogListItemProps> = ({
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
        'flex cursor-pointer flex-col border-b py-4 last:border-b-0 md:flex-row md:items-center',
        darkMode ? 'border-gray-700' : 'border-gray-200',
        className,
      )}
      onClick={() => new Action(post.action).execute()}
    >
      {/* Date */}
      <div
        className={cn(
          'mb-2 w-24 shrink-0 text-sm md:mb-0',
          darkMode ? 'text-gray-400' : 'text-gray-500',
        )}
      >
        {formatDate(post.date)}
      </div>

      {/* Title and categories */}
      <div className="flex-1">
        <h3 className="mb-1 font-medium">{post.title}</h3>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category, idx) => (
              <span
                key={idx}
                className={cn(
                  'inline-block rounded-full px-2 py-0.5 text-xs',
                  darkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-700',
                )}
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Author */}
      {post.author && (
        <div
          className={cn(
            'mt-2 flex items-center md:mt-0 md:w-40 md:justify-end',
            darkMode ? 'text-gray-400' : 'text-gray-500',
          )}
        >
          {post.author.avatar && (
            <img
              src={getImageUrl(post.author.avatar)}
              alt={post.author.name}
              className="mr-2 h-6 w-6 rounded-full"
            />
          )}
          <span className="text-sm">{post.author.name}</span>
        </div>
      )}
    </div>
  );
};
