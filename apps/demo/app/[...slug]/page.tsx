// import { fetchSlugs } from '@/app/[...slug]/fetchSlugs';
import { RouteLoader } from '@vyuh/react-extension-content';

// Use only if you want to pre-render all routes
// export async function generateStaticParams() {
//   return await fetchSlugs();
// }

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const allParams = await params;
  const slug = Array.isArray(allParams.slug)
    ? `/${allParams.slug.join('/')}`
    : `/${allParams.slug ?? ''}`;

  return <RouteLoader url={slug} allowRefresh={true} live={true} />;
}
