import { PortableTextContentBuilder } from '@/content/portable-text-builder';
import { UnknownContentBuilder } from '@/content/unknown';
import { FeatureDescriptor } from '@vyuh/react-core';
import React from 'react';
import {
  ContentExtensionBuilder,
  ContentExtensionDescriptor,
} from '@vyuh/react-extension-content';
import { RouteContentBuilder } from '@/content/route-builder';
import { RouteDescriptor } from '@/content/route-descriptor';

/**
 * System feature for Vyuh React
 *
 * Provides core content types and functionality:
 */
export const feature = new FeatureDescriptor({
  name: 'system',
  title: 'System',
  description: 'Core building blocks of the Vyuh React framework',
  icon: <span>🧩</span>, // Using emoji as a simple icon
  extensions: [
    new ContentExtensionDescriptor({
      contents: [new RouteDescriptor()],
      contentBuilders: [
        new RouteContentBuilder(),
        new UnknownContentBuilder(),
        new PortableTextContentBuilder(),
      ],
    }),
  ],
  extensionBuilders: [new ContentExtensionBuilder()],
  init: async () => {
    console.log('System feature initialized with Tailwind CSS 4.0');
  },
});
