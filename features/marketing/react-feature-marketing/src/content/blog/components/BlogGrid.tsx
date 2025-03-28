import { Blog } from '@/content/blog/blog';
import { cn } from '@/content/shared/utils';
import React from 'react';
import { BlogPostCard } from './BlogPostCard';
import { BlogFeaturedPost } from './BlogFeaturedPost';
import { BlogListItem } from './BlogListItem';
import { BlogImageListItem } from './BlogImageListItem';

interface BlogGridProps {
  posts: Blog['posts'];
  variant: string;
  columns: number;
  darkMode: boolean;
  className?: string;
}

export const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  variant,
  columns,
  darkMode,
  className,
}) => {
  if (variant === 'with-featured-post') {
    const featuredPost = posts.find((post) => post.featured);
    const regularPosts = posts.filter((post) => !post.featured);

    return (
      <div className={className}>
        {featuredPost && (
          <BlogFeaturedPost 
            post={featuredPost} 
            darkMode={darkMode} 
          />
        )}
        <div
          className={cn('grid gap-6', {
            'grid-cols-1': columns === 1,
            'grid-cols-1 md:grid-cols-2': columns === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
          })}
        >
          {regularPosts.map((post, index) => (
            <BlogPostCard 
              key={index} 
              post={post} 
              darkMode={darkMode} 
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'card-grid') {
    return (
      <div
        className={cn('grid gap-6', {
          'grid-cols-1': columns === 1,
          'grid-cols-1 md:grid-cols-2': columns === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
        }, className)}
      >
        {posts.map((post, index) => (
          <BlogPostCard 
            key={index} 
            post={post} 
            darkMode={darkMode} 
          />
        ))}
      </div>
    );
  }

  if (variant === 'list-with-image') {
    return (
      <div className={cn('space-y-8', className)}>
        {posts.map((post, index) => (
          <BlogImageListItem 
            key={index} 
            post={post} 
            darkMode={darkMode} 
          />
        ))}
      </div>
    );
  }

  if (variant === 'compact-list') {
    return (
      <div
        className={cn(
          'rounded-lg',
          darkMode ? 'bg-gray-800' : 'bg-gray-50',
          className
        )}
      >
        {posts.map((post, index) => (
          <BlogListItem 
            key={index} 
            post={post} 
            darkMode={darkMode} 
          />
        ))}
      </div>
    );
  }

  // Default to simple-grid
  return (
    <div
      className={cn('grid gap-6', {
        'grid-cols-1': columns === 1,
        'grid-cols-1 md:grid-cols-2': columns === 2,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
      }, className)}
    >
      {posts.map((post, index) => (
        <BlogPostCard 
          key={index} 
          post={post} 
          darkMode={darkMode} 
        />
      ))}
    </div>
  );
};
