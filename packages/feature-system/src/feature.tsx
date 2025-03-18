import { PortableTextContentBuilder } from '@/content/portable-text-builder';
import { UnknownContentBuilder } from '@/content/unknown';
import {
  ContentExtensionBuilder,
  ContentExtensionDescriptor,
} from '@vyuh/extension-content';
import { FeatureDescriptor } from '@vyuh/react';
import React from 'react';
import { RouteContentBuilder } from './content/route-builder';
import { RouteDescriptor } from './content/route-descriptor';
import './styles.css'; // Import Tailwind CSS

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
    // @ts-ignore
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
