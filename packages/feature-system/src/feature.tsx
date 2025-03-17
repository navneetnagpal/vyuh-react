import { ContentExtensionBuilder } from '@vyuh/react';
import React from 'react';
import { FeatureDescriptor } from '@vyuh/react';
import { ContentExtensionDescriptor } from '@vyuh/react';
import { RouteContentBuilder } from './content/route-builder';
import { RouteDescriptor } from './content/route-descriptor';

/**
 * System feature for Vyuh React
 *
 * Provides core content types and functionality:
 * - Routes: Basic route content type
 */
export const feature = new FeatureDescriptor({
  name: 'system',
  title: 'System',
  description: 'Core building blocks of the Vyuh React framework',
  icon: <span>🧩</span>, // Using emoji as a simple icon
  extensions: [
    new ContentExtensionDescriptor({
      contents: [new RouteDescriptor()],
      contentBuilders: [new RouteContentBuilder()],
    }),
  ],
  extensionBuilders: [new ContentExtensionBuilder()],
});
