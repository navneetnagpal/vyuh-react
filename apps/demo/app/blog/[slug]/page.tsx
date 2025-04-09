'use client';

import { useVyuh } from '@/hooks/use-vyuh';
import {
  DocumentLoader,
  fetchSingleWithQuery,
} from '@vyuh/react-extension-content';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { plugins } = useVyuh();

  return (
    <DocumentLoader
      fetchContent={fetchSingleWithQuery(
        `*[_type == "blog.post" && slug.current == $slug][0]{
        ...,
        author->,
        categories[]->
        }`,
        { params: { slug }, live: true },
      )}
      renderContent={(post) => (
        <div className="container mx-auto px-4 py-8">
          {post && plugins.content.render(post)}
        </div>
      )}
      allowRefresh={true}
    />
  );
}
