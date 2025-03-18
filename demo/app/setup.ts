import { DefaultContentPlugin } from '@vyuh/extension-content';
import {
  FeatureDescriptor,
  PluginDescriptor,
  SanityContentProvider,
} from '@vyuh/react';

// Features
import * as system from '@vyuh/feature-system';
import '@vyuh/feature-system/styles.css';

/**
 * Counter feature definition
 */
export const counter = new FeatureDescriptor({
  name: 'counter',
  title: 'Counter',
  init: () => Promise.resolve(),
});

/**
 * Configure Sanity content provider
 */
const sanityProvider = SanityContentProvider.withConfig({
  config: {
    projectId: '8b76lu9s',
    dataset: 'production',
    perspective: 'drafts',
    useCdn: false,
    token:
      'skt2tSTitRob9TonNNubWg09bg0dACmwE0zHxSePlJisRuF1mWJOvgg3ZF68CAWrqtSIOzewbc56dGavACyznDTsjm30ws874WoSH3E5wPMFrqVW8C0Hc0pJGzpYQiehfL9GTRrIyoO3y2aBQIxHpegGspzxAevZcchleelaH5uM6LAnOJT1',
  },
  cacheDuration: 300000, // 5 minutes
});

/**
 * Plugin configuration
 */
export const plugins = new PluginDescriptor({
  content: new DefaultContentPlugin(sanityProvider),
});

/**
 * Feature configuration
 * Returns all features used in the application
 */
export const getFeatures = () => [counter, system.feature];
