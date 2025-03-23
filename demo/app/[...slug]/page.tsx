'use client';

import { RouteBuilder } from '@vyuh/react-extension-content';
import { useParams } from 'next/navigation';

export default function DynamicRoute() {
  const params = useParams<{ slug: string | string[] }>();
  const slug = Array.isArray(params.slug)
    ? `/${params.slug.join('/')}`
    : `/${params.slug}`;

  return <RouteBuilder url={slug} allowRefresh={true} live={true} />;
}
