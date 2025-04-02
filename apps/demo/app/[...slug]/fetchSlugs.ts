import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: 'vX',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN!,
  perspective: 'drafts',
});

export async function fetchSlugs() {
  const slugs: string[] = await client.fetch(
    `*[_type == "vyuh.route"]{path}.path`,
  );

  const paths = slugs
    .map((slug: string) => slug.replace(/^\/|\/$/g, ''))
    .map((slug: string) => ({ slug: slug.split('/') }));

  console.log(paths);

  return paths;
}
