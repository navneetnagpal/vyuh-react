import { Blog } from '@/content/blog/blog';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface BlogFeaturedPostProps {
  post: Blog['posts'][0];
  darkMode: boolean;
  className?: string;
}

export const BlogFeaturedPost: React.FC<BlogFeaturedPostProps> = ({
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
        'mb-8 grid grid-cols-1 gap-8 overflow-hidden rounded-lg md:grid-cols-2',
        darkMode ? 'bg-gray-800' : 'bg-gray-50',
        'cursor-pointer',
        className,
      )}
      onClick={() => new Action(post.action).execute()}
    >
      {/* Featured image */}
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={getImageUrl(post.image)}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-center p-6">
        <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          Featured
        </div>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {post.categories.map((category, idx) => (
              <span
                key={idx}
                className={cn(
                  'inline-block rounded-full px-3 py-1 text-xs font-medium',
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

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold">{post.title}</h3>

        {/* Date and author */}
        <div
          className={cn(
            'mb-4 flex items-center text-sm',
            darkMode ? 'text-gray-400' : 'text-gray-600',
          )}
        >
          <span>{formatDate(post.date)}</span>
          {post.author && (
            <>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                {post.author.avatar && (
                  <img
                    src={getImageUrl(post.author.avatar)}
                    alt={post.author.name}
                    className="mr-2 h-6 w-6 rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
                {post.author.role && (
                  <span className="ml-1 text-xs opacity-75">
                    {post.author.role}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className={cn(
              'mb-6 text-base',
              darkMode ? 'text-gray-300' : 'text-gray-600',
            )}
          >
            {post.excerpt}
          </p>
        )}

        {/* Read more link */}
        <div>
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
    </div>
  );
};
