import { Blog as BlogItem } from '@/content/blog/blog';
import { DefaultBlogLayout } from '@/content/blog/default-blog-layout';
import { cn } from '@/content/shared/utils';
import { useMediaUtils } from '@/content/shared/MediaUtils';
import { Action, useVyuh } from '@vyuh/react-core';
import React from 'react';

interface BlogProps {
  content: BlogItem;
  layout: DefaultBlogLayout;
  className?: string;
}

export const Blog: React.FC<BlogProps> = ({
  content,
  layout,
  className,
}) => {
  const { plugins } = useVyuh();
  const { getImageUrl } = useMediaUtils();
  const variant = layout.variant || 'simple-grid';
  const darkMode = layout.darkMode || false;
  const columns = layout.columns || 3;

  // Background color classes based on dark mode
  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Render a blog post card
  const renderPostCard = (post: BlogItem['posts'][0], index: number) => {
    return (
      <div
        key={index}
        className={cn(
          'flex flex-col overflow-hidden rounded-lg transition-all hover:shadow-md',
          darkMode ? 'bg-gray-800' : 'bg-gray-50',
          'cursor-pointer'
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
                    darkMode
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-200 text-gray-700'
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
          <div
            className={cn(
              'mb-3 flex items-center text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-600'
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
                'mb-4 flex-1 text-sm',
                darkMode ? 'text-gray-300' : 'text-gray-600'
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
                darkMode ? 'text-blue-400' : 'text-blue-600'
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

  // Render a featured post (larger)
  const renderFeaturedPost = (post: BlogItem['posts'][0]) => {
    return (
      <div
        className={cn(
          'mb-8 grid grid-cols-1 gap-8 overflow-hidden rounded-lg md:grid-cols-2',
          darkMode ? 'bg-gray-800' : 'bg-gray-50',
          'cursor-pointer'
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
                      : 'bg-gray-200 text-gray-700'
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
              darkMode ? 'text-gray-400' : 'text-gray-600'
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
                darkMode ? 'text-gray-300' : 'text-gray-600'
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
                darkMode ? 'text-blue-400' : 'text-blue-600'
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

  // Render a list item (for compact-list variant)
  const renderListItem = (post: BlogItem['posts'][0], index: number) => {
    return (
      <div
        key={index}
        className={cn(
          'flex cursor-pointer flex-col border-b py-4 last:border-b-0 md:flex-row md:items-center',
          darkMode ? 'border-gray-700' : 'border-gray-200'
        )}
        onClick={() => new Action(post.action).execute()}
      >
        {/* Date */}
        <div
          className={cn(
            'mb-2 w-24 shrink-0 text-sm md:mb-0',
            darkMode ? 'text-gray-400' : 'text-gray-500'
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
                      : 'bg-gray-200 text-gray-700'
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
              darkMode ? 'text-gray-400' : 'text-gray-500'
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

  // Render the blog posts based on the variant
  const renderPosts = () => {
    switch (variant) {
      case 'with-featured-post': {
        const featuredPost = content.posts.find((post) => post.featured);
        const regularPosts = content.posts.filter((post) => !post.featured);

        return (
          <div>
            {featuredPost && renderFeaturedPost(featuredPost)}
            <div
              className={cn('grid gap-6', {
                'grid-cols-1': columns === 1,
                'grid-cols-1 md:grid-cols-2': columns === 2,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
              })}
            >
              {regularPosts.map((post, index) => renderPostCard(post, index))}
            </div>
          </div>
        );
      }

      case 'card-grid':
        return (
          <div
            className={cn('grid gap-6', {
              'grid-cols-1': columns === 1,
              'grid-cols-1 md:grid-cols-2': columns === 2,
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
            })}
          >
            {content.posts.map((post, index) => renderPostCard(post, index))}
          </div>
        );

      case 'list-with-image':
        return (
          <div className="space-y-8">
            {content.posts.map((post, index) => (
              <div
                key={index}
                className={cn(
                  'grid cursor-pointer grid-cols-1 gap-6 md:grid-cols-3',
                  darkMode ? 'border-gray-700' : 'border-gray-200'
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
                      darkMode ? 'text-gray-400' : 'text-gray-600'
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
                      className={cn(
                        'mb-3',
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      )}
                    >
                      {post.excerpt}
                    </p>
                  )}
                  <span
                    className={cn(
                      'inline-flex items-center font-medium',
                      darkMode ? 'text-blue-400' : 'text-blue-600'
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
            ))}
          </div>
        );

      case 'compact-list':
        return (
          <div
            className={cn(
              'rounded-lg',
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            )}
          >
            {content.posts.map((post, index) => renderListItem(post, index))}
          </div>
        );

      case 'simple-grid':
      default:
        return (
          <div
            className={cn('grid gap-6', {
              'grid-cols-1': columns === 1,
              'grid-cols-1 md:grid-cols-2': columns === 2,
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
            })}
          >
            {content.posts.map((post, index) => renderPostCard(post, index))}
          </div>
        );
    }
  };

  return (
    <section
      className={cn(
        'px-6 py-12',
        backgroundClasses,
        className
      )}
    >
      <div className="container mx-auto">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
          {content.subtitle && (
            <p className={cn('mx-auto max-w-2xl text-lg', darkMode ? 'text-gray-300' : 'text-gray-600')}>
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Blog posts */}
        {renderPosts()}

        {/* Call-to-action button */}
        {content.action && (
          <div className="mt-10 text-center">
            <button
              className={cn(
                'rounded-md bg-primary px-4 py-2 text-white shadow-sm hover:bg-primary/90'
              )}
              onClick={() => new Action(content.action!).execute()}
            >
              {content.action.title}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
