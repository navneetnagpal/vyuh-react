'use client';

import { RouterProvider } from '@/components/router-provider';
import { marketing } from '@/features/marketing';
import { misc } from '@/features/misc-feature';
import { NextNavigationPlugin } from '@/plugins/next-navigation-plugin';
import { PluginDescriptor, VyuhProvider } from '@vyuh/react-core';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';

// Features
import { feature as system } from '@vyuh/react-feature-system';
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';
import { ReactNode } from 'react';

import '@/app/globals.css';

/**
 * Configure Sanity content provider
 */
const sanityProvider = new SanityContentProvider({
  projectId: 'm8cqo9kc',
  dataset: 'production',
  perspective: 'drafts',
  useCdn: false,
  token:
    'skk8YG2dC0Zo6J6L2QUK0kwNk4HWbTPSCRyJazFDLwuPXvBGC3d1eYpkycCtCkUxbOHG9QA0PSQhBuoHRU2wIJ3sWvArJWbY4ggVlC3c6oLWGzvNe9AHVKfM1DfFs4qVokeFVY3IlSSgqrOp69c9IjEMy5tO1ifLPJlr9vhyAdHsCTbz9tlQ',
});

/**
 * Plugin configuration
 */
const plugins = new PluginDescriptor({
  content: new DefaultContentPlugin(sanityProvider),
  navigation: new NextNavigationPlugin(),
});

/**
 * Feature configuration
 * Returns all features used in the application
 */
const getFeatures = () => [system, misc, marketing];

export default function ClientApp({ children }: { children: ReactNode }) {
  return (
    <VyuhProvider features={getFeatures} plugins={plugins}>
      <RouterProvider>{children}</RouterProvider>
    </VyuhProvider>
  );
}
