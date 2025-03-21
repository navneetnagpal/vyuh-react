import { NavigateAction } from '@/action/navigate-action';
import { BooleanCondition } from '@/condition/boolean-condition';
import { CardContentBuilder } from '@/content/card/card-builder';
import { CardDescriptor } from '@/content/card/card-descriptor';
import { ConditionalContentBuilder } from '@/content/conditional-content/conditional-content-builder';
import { ConditionalContentDescriptor } from '@/content/conditional-content/conditional-content-descriptor';
import { ConditionalRouteBuilder } from '@/content/conditional-route/conditional-route-builder';
import { ConditionalRouteDescriptor } from '@/content/conditional-route/conditional-route-descriptor';
import { DividerContentBuilder } from '@/content/divider/divider-builder';
import { DividerDescriptor } from '@/content/divider/divider-descriptor';
import { CarouselGroupLayout } from '@/content/group/carousel-group-layout';
import { GridGroupLayout } from '@/content/group/grid-group-layout';
import { GroupContentBuilder } from '@/content/group/group-builder';
import { GroupDescriptor } from '@/content/group/group-descriptor';
import { PortableTextContentBuilder } from '@/content/portable-text/portable-text-builder';
import { RouteContentBuilder } from '@/content/route/route-builder';
import { RouteDescriptor } from '@/content/route/route-descriptor';
import { UnknownContentBuilder } from '@/content/unknown';
import { VideoPlayerContentBuilder } from '@/content/video-player/video-player-builder';
import { VideoPlayerDescriptor } from '@/content/video-player/video-player-descriptor';
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
        new ConditionalRouteDescriptor(),
        new ConditionalContentDescriptor(),
        new CardDescriptor(),
        new GroupDescriptor({
          layouts: [
            CarouselGroupLayout.typeDescriptor,
            GridGroupLayout.typeDescriptor,
          ],
        }),
        new DividerDescriptor(),
        new VideoPlayerDescriptor(),
      ],
      contentBuilders: [
        new RouteContentBuilder(),
        new ConditionalRouteBuilder(),
        new ConditionalContentBuilder(),
        new UnknownContentBuilder(),
        new PortableTextContentBuilder(),
        new CardContentBuilder(),
        new GroupContentBuilder(),
        new DividerContentBuilder(),
        new VideoPlayerContentBuilder(),
      ],
      actions: [NavigateAction.typeDescriptor],
      conditions: [BooleanCondition.typeDescriptor],
    }),
  ],
  extensionBuilders: [new ContentExtensionBuilder()],
  init: async () => {
    console.log('System feature initialized with Tailwind CSS 4.0');
  },
});
