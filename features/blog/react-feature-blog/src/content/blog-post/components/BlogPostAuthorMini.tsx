import React from 'react';
import { BlogAuthor } from '../../blog-author/blog-author';
import { MiniBlogAuthorLayout } from '../../blog-author/mini-blog-author-layout';
import { useVyuh } from '@vyuh/react-core';

interface BlogPostAuthorMiniProps {
  author: BlogAuthor;
}

export const BlogPostAuthorMini: React.FC<BlogPostAuthorMiniProps> = ({ author }) => {
  const { plugins } = useVyuh();

  // Create a mini layout for the author
  const miniLayout = new MiniBlogAuthorLayout();

  return plugins.content.renderWithLayout(author, miniLayout);
};
