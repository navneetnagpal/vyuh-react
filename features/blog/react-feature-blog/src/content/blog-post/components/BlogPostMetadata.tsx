import React, { Fragment } from 'react';
import { BlogCategory } from '../../blog-category/blog-category';
import { useVyuh } from '@vyuh/react-core';
import { formatDate } from './BlogPostComponent';

interface BlogPostMetadataProps {
  publishedAt: string;
  categories?: Array<BlogCategory>;
}

export const BlogPostMetadata: React.FC<BlogPostMetadataProps> = ({
  publishedAt,
  categories,
}) => {
  const { plugins } = useVyuh();

  return (
    <>
      {/* Publication Date */}
      {publishedAt && (
        <div className="flex items-center">
          <div className="text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formatDate(publishedAt)}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap items-center">
          {categories.map((category, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="mx-1 text-base-content/40">•</span>}
              <span className="text-primary text-sm">
                {plugins.content.render(category)}
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};
