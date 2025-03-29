import { Blog } from '@/content/blog/blog';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface BlogPostCardProps {
  post: Blog['posts'][0];
  className?: string;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
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
        'flex flex-col overflow-hidden rounded-lg transition-all hover:shadow-md',
        'bg-gray-50',
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
      <div className="flex flex-1 flex-col p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {post.categories.map((category, idx) => (
              <span
                key={idx}
                className={cn(
                  'inline-block rounded-full px-3 py-1 text-xs font-medium',
                  'bg-gray-200 text-gray-700',
                )}
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>

        {/* Date and author */}
        <div className="mb-3 flex items-center justify-between text-sm text-gray-600"
        >
          <span>{formatDate(post.date)}</span>
          {post.author && (
            <div className={'flex items-center'}>
              {post.author.avatar && (
                <img
                  src={getImageUrl(post.author.avatar)}
                  alt={post.author.name}
                  className="mr-2 h-6 w-6 rounded-full"
                />
              )}
              <div className={'flex flex-col items-start justify-start'}>
                <span>{post.author.name}</span>

                {post.author.role && (
                  <span className="text-xs opacity-75">{post.author.role}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className={cn(
              'mb-4 flex-1 text-sm',
              'text-gray-600',
            )}
          >
            {post.excerpt}
          </p>
        )}

        {/* Read more link */}
        <div className="mt-auto">
          <span
            className={cn(
              'inline-flex items-center text-sm font-medium',
              'text-blue-600',
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
