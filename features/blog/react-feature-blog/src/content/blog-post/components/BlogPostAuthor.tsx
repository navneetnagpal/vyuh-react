import { BlogAuthor } from '@/content/blog-author';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import React from 'react';

interface BlogPostAuthorProps {
  author: BlogAuthor;
}

export const BlogPostAuthor: React.FC<BlogPostAuthorProps> = ({ author }) => {
  const { getImageUrl } = useMediaUtils();

  return (
    <div className="flex items-start">
      {author.avatar && (
        <div className="avatar mr-4">
          <div
            className={cn(
              'h-16 w-16 overflow-hidden rounded-full',
              author.featured && 'ring-primary ring-2 ring-offset-2',
            )}
          >
            <img
              src={getImageUrl(author.avatar)}
              alt={author.name}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="text-base-content text-xl font-semibold">
          {author.name}
        </h3>
        {author.role && (
          <span className="text-base-content/70 mt-1 text-sm">
            {author.role}
          </span>
        )}
        {author.bio && (
          <p className="text-base-content/80 mt-2 text-sm">{author.bio}</p>
        )}
      </div>
    </div>
  );
};
