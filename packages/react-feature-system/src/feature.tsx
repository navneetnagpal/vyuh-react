import { CardContentBuilder } from '@/content/card/card-builder';
import { CardDescriptor } from '@/content/card/card-descriptor';
import { CarouselGroupLayout } from '@/content/group/carousel-group-layout';
import { GridGroupLayout } from '@/content/group/grid-group-layout';
import { GroupContentBuilder } from '@/content/group/group-builder';
import { GroupDescriptor } from '@/content/group/group-descriptor';
import { PortableTextContentBuilder } from '@/content/portable-text/portable-text-builder';
import { RouteContentBuilder } from '@/content/route/route-builder';
import { RouteDescriptor } from '@/content/route/route-descriptor';
import { UnknownContentBuilder } from '@/content/unknown';
import { FeatureDescriptor } from '@vyuh/react-core';
import {
  ContentExtensionBuilder,
  ContentExtensionDescriptor,
} from '@vyuh/react-extension-content';
import { Command } from 'lucide-react';
import React from 'react';

/**
 * System feature for Vyuh React
 *
 * Provides core content types and functionality:
 */
export const feature = new FeatureDescriptor({
  name: 'system',
  title: 'System',
  description: 'Core building blocks of the Vyuh React framework',
  icon: <Command />, // Using emoji as a simple icon
  extensions: [
    new ContentExtensionDescriptor({
      contents: [
        new RouteDescriptor(),
        new CardDescriptor(),
        new GroupDescriptor({
          layouts: [
            CarouselGroupLayout.typeDescriptor,
            GridGroupLayout.typeDescriptor,
          ],
        }),
      ],
      contentBuilders: [
        new RouteContentBuilder(),
        new UnknownContentBuilder(),
        new PortableTextContentBuilder(),
        new CardContentBuilder(),
        new GroupContentBuilder(),
      ],
    }),
  ],
  extensionBuilders: [new ContentExtensionBuilder()],
  init: async () => {
    console.log('System feature initialized with Tailwind CSS 4.0');
  },
});
