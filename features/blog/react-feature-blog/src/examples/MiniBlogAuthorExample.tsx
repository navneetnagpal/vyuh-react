import React from 'react';
import { BlogAuthor } from '../content/blog-author/blog-author';
import { MiniBlogAuthorLayout } from '../content/blog-author/mini-blog-author-layout';
import { useVyuh } from '@vyuh/react-core';

interface MiniBlogAuthorExampleProps {
  author: BlogAuthor;
}

export const MiniBlogAuthorExample: React.FC<MiniBlogAuthorExampleProps> = ({ author }) => {
  const { plugins } = useVyuh();

  // Create a mini layout for the author
  const miniLayout = new MiniBlogAuthorLayout();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Mini Author Layout</h2>
        <div className="border border-base-300 p-4 rounded-lg">
          {plugins.content.renderWithLayout(author, miniLayout)}
        </div>
      </div>
    </div>
  );
};
