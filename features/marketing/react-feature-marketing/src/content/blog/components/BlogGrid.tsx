import { Blog } from '@/content/blog/blog';
import { cn } from '@/shared/utils';
import React from 'react';
import { BlogFeaturedPost } from './BlogFeaturedPost';
import { BlogPostCard } from './BlogPostCard';

interface BlogGridProps {
  posts: Blog['posts'];
  variant: string;
  columns: number;
  className?: string;
}

export const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  variant,
  columns,
  className,
}) => {
  if (variant === 'with-featured-post') {
    const featuredPost = posts.find((post) => post.featured);
    const regularPosts = posts.filter((post) => !post.featured);

    return (
      <div className={className}>
        {featuredPost && (
          <BlogFeaturedPost post={featuredPost} />
        )}
        <div
          className={cn('grid gap-16', {
            'grid-cols-1': columns === 1,
            'grid-cols-1 md:grid-cols-2': columns === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
          })}
        >
          {regularPosts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
      </div>
    );
  }

  // Default to simple-grid
  return (
    <div
      className={cn(
        'grid gap-16',
        {
          'grid-cols-1': columns === 1,
          'grid-cols-1 md:grid-cols-2': columns === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
        },
        className,
      )}
    >
      {posts.map((post, index) => (
        <BlogPostCard key={index} post={post} />
      ))}
    </div>
  );
};
