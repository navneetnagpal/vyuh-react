import { MiniBlogAuthorLayout } from '@/content/blog-author';
import React, { useState } from 'react';
import { BlogPost } from '../blog-post';
import { DefaultBlogPostLayout } from '@/content/blog-post';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { useVyuh } from '@vyuh/react-core';
import { formatDate } from './BlogPostComponent';

interface BlogPostHeroProps {
  content: BlogPost;
  layout: DefaultBlogPostLayout;
}

export const BlogPostHero: React.FC<BlogPostHeroProps> = ({
  content,
  layout,
}) => {
  const { getImageUrl } = useMediaUtils();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { plugins } = useVyuh();

  return (
    <div className="relative w-full">
      {/* Subtle gradient overlay only at the top */}
      <div className="absolute inset-0 z-10 h-1/3 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>

      {/* Featured image with fade-in effect */}
      <img
        src={getImageUrl(content.featuredImage)}
        alt={content.title}
        className={cn(
          'h-[60vh] w-full object-cover transition-opacity duration-1000',
          imageLoaded ? 'opacity-100' : 'opacity-0',
        )}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Title overlay on hero image */}
      <div className="container relative z-20 mx-auto -mt-40 px-4 pb-10">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Title */}
            <h1 className="font-bold text-4xl md:text-5xl">
              {content.title}
            </h1>

            {/* Metadata */}
            <div className="text-base-content/70 mt-4 flex flex-wrap items-center">
              {/* Author */}
              {content.author &&
                plugins.content.render(content.author, {
                  layout: new MiniBlogAuthorLayout(),
                })}

              {/* Publication Date */}
              {content.publishedAt && (
                <>
                  {content.author && (
                    <span className="text-base-content/40 mx-2">•</span>
                  )}
                  <div className="flex items-center">
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary mr-1.5 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {formatDate(content.publishedAt)}
                    </div>
                  </div>
                </>
              )}

              {content.categories &&
                content.categories.length > 0 &&
                (content.author || content.publishedAt) && (
                  <span className="text-base-content/40 mx-2">•</span>
                )}

              {/* Categories */}
              {content.categories &&
                content.categories.length > 0 && (
                  <div className="flex flex-wrap items-center">
                    {content.categories.map((category, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <span className="text-base-content/40 mx-1">•</span>
                        )}
                        <span className="text-primary text-sm">
                          {plugins.content.render(category)}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
