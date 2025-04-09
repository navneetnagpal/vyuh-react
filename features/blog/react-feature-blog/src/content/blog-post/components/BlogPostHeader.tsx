import React from 'react';
import { BlogPost } from '../blog-post';
import { DefaultBlogPostLayout } from '../default-blog-post-layout';
import { cn } from '@/shared/utils';
import { BlogPostAuthorMini } from './BlogPostAuthorMini';
import { BlogPostMetadata } from './BlogPostMetadata';

interface BlogPostHeaderProps {
  content: BlogPost;
  layout: DefaultBlogPostLayout;
  inHero?: boolean;
}

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  content,
  layout,
  inHero = false,
}) => {
  return (
    <div className={cn(!inHero && "mb-10")}>
      {/* Title */}
      <h1
        className={cn(
          'font-bold text-4xl md:text-5xl',
          inHero && 'card-title'
        )}
      >
        {content.title}
      </h1>

      {/* Metadata */}
      <div className={cn(
        "flex flex-wrap items-center",
        inHero ? "mt-4 text-base-content/70" : "mt-6 text-base-content/70"
      )}>
        {/* Author */}
        {content.author && (
          <BlogPostAuthorMini
            author={{
              ...content.author,
              featured: content.author.featured || content.featured
            }}
          />
        )}

        {content.publishedAt && content.author && (
          <span className="mx-2 text-base-content/40">•</span>
        )}

        {/* Publication Date and Categories */}
        <BlogPostMetadata
          publishedAt={content.publishedAt}
          categories={content.categories}
        />
      </div>
    </div>
  );
};
