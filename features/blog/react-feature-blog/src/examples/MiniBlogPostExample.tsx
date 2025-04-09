import React from 'react';
import { BlogPost } from '../content/blog-post/blog-post';
import { MiniBlogPostLayout } from '../content/blog-post/mini-blog-post-layout';
import { useVyuh } from '@vyuh/react-core';

interface MiniBlogPostExampleProps {
  post: BlogPost;
}

export const MiniBlogPostExample: React.FC<MiniBlogPostExampleProps> = ({ post }) => {
  const { plugins } = useVyuh();

  // Create a mini layout
  const miniLayout = new MiniBlogPostLayout();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Mini Blog Post Layout</h2>
        <div className="border border-base-300 p-4 rounded-lg">
          {plugins.content.renderWithLayout(post, miniLayout)}
        </div>
      </div>
    </div>
  );
};
