'use client';

import { RouterProvider } from '@/components/router-provider';
import { misc } from '@/features/misc-feature';

// Plugins
import { NextNavigationPlugin } from '@/plugins/next-navigation-plugin';
import { PluginDescriptor, VyuhProvider } from '@vyuh/react-core';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';
import { blog } from '@vyuh/react-feature-blog';
import { marketing } from '@vyuh/react-feature-marketing';

// Features
import { system } from '@vyuh/react-feature-system';
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';
import { ReactNode } from 'react';

import '@/app/globals.css';

/**
 * Configure Sanity content provider
 */
const oldSanityProvider = new SanityContentProvider({
  projectId: '8b76lu9s',
  dataset: 'production',
  perspective: 'drafts',
  useCdn: false,
  token:
    'skt2tSTitRob9TonNNubWg09bg0dACmwE0zHxSePlJisRuF1mWJOvgg3ZF68CAWrqtSIOzewbc56dGavACyznDTsjm30ws874WoSH3E5wPMFrqVW8C0Hc0pJGzpYQiehfL9GTRrIyoO3y2aBQIxHpegGspzxAevZcchleelaH5uM6LAnOJT1',
});

const newSanityProvider = new SanityContentProvider({
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
  // content: new DefaultContentPlugin(oldSanityProvider),
  content: new DefaultContentPlugin(newSanityProvider),
  navigation: new NextNavigationPlugin(),
});

/**
 * Feature configuration
 * Returns all features used in the application
 */
const getFeatures = () => [system, misc, marketing, blog];

export default function ClientApp({ children }: { children: ReactNode }) {
  return (
    <VyuhProvider features={getFeatures} plugins={plugins}>
      <RouterProvider>{children}</RouterProvider>
    </VyuhProvider>
  );
}
