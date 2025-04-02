'use client';

import { DocumentLoader, fetchWithQuery } from '@vyuh/react-extension-content';

export default function Home() {
  // Load the homepage route from CMS
  return (
    <DocumentLoader
      fetchContent={fetchWithQuery(
        '*[_type == "vyuh.route" && path == "/chakra"][0]',
        {
          live: true,
        },
      )}
      allowRefresh={true}
    />
  );
}
