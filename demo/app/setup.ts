import { FeatureDescriptor, PluginDescriptor } from '@vyuh/react-core';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';

// Features
import { feature as system } from '@vyuh/react-feature-system';
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';

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
export const getFeatures = () => [counter, system];
