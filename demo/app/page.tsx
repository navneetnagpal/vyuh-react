'use client';

import { RouteBuilder } from '@vyuh/react';

export default function Home() {
  return <RouteBuilder url={'/chakra'} allowRefresh={true} />;
}
