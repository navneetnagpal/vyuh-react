import { RouteLoader } from '@vyuh/react-extension-content';

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const allParams = await params;
  const slug = Array.isArray(allParams.slug)
    ? `/${allParams.slug.join('/')}`
    : `/${allParams.slug}`;

  return <RouteLoader url={slug} allowRefresh={true} live={true} />;
}
