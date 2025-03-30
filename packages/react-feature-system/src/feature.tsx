import { ACCORDION_SCHEMA_TYPE } from '@/content/accordion/accordion';
import { AccordionContentBuilder } from '@/content/accordion/accordion-builder';
import { AccordionDescriptor } from '@/content/accordion/accordion-descriptor';
import { CARD_SCHEMA_TYPE } from '@/content/card/card';
import { CardContentBuilder } from '@/content/card/card-builder';
import { CardDescriptor } from '@/content/card/card-descriptor';
import { CONDITIONAL_CONTENT_SCHEMA_TYPE } from '@/content/conditional-content/conditional-content';
import { ConditionalContentBuilder } from '@/content/conditional-content/conditional-content-builder';
import { ConditionalContentDescriptor } from '@/content/conditional-content/conditional-content-descriptor';
import { ConditionalRouteBuilder } from '@/content/conditional-route/conditional-route-builder';
import { ConditionalRouteDescriptor } from '@/content/conditional-route/conditional-route-descriptor';
import { DIVIDER_SCHEMA_TYPE } from '@/content/divider/divider';
import { DividerContentBuilder } from '@/content/divider/divider-builder';
import { DividerDescriptor } from '@/content/divider/divider-descriptor';
import { CarouselGroupLayout } from '@/content/group/carousel-group-layout';
import { GridGroupLayout } from '@/content/group/grid-group-layout';
import { GROUP_SCHEMA_TYPE } from '@/content/group/group';
import { GroupContentBuilder } from '@/content/group/group-builder';
import { GroupDescriptor } from '@/content/group/group-descriptor';
import { PortableTextContentBuilder } from '@/content/portable-text/portable-text-builder';
import { PortableTextConfig } from '@/content/portable-text/portable-text-config';
import { PortableTextDescriptor } from '@/content/portable-text/portable-text-descriptor';
import { RouteContentBuilder } from '@/content/route/route-builder';
import { RouteDescriptor } from '@/content/route/route-descriptor';
import { SingleItemLayout } from '@/content/route/single-item-layout';
import { UnknownContentBuilder } from '@/content/unknown';
import { VIDEO_PLAYER_SCHEMA_TYPE } from '@/content/video-player/video-player';
import { VideoPlayerContentBuilder } from '@/content/video-player/video-player-builder';
import { VideoPlayerDescriptor } from '@/content/video-player/video-player-descriptor';
import { FeatureDescriptor } from '@vyuh/react-core';
import {
  ContentExtensionBuilder,
  ContentExtensionDescriptor,
} from '@vyuh/react-extension-content';
import { Command } from 'lucide-react';
import React from 'react';
import { NavigateAction } from './action/navigate-action';
import { OpenUrlAction } from './action/open-url-action';
import { BooleanCondition } from './condition/boolean-condition';
import {
  API_CONTENT_SCHEMA_TYPE,
  APIContentDescriptor,
} from './content/api-content/api-content';
import { APIContentBuilder } from './content/api-content/api-content-builder';

/**
 * System feature for Vyuh React
 *
 * Provides core content types and functionality:
 */
export const system = new FeatureDescriptor({
  name: 'system',
  title: 'System',
  description: 'Core building blocks of the Vyuh React framework',
  icon: <Command />, // Using emoji as a simple icon
  extensions: [
    new ContentExtensionDescriptor({
      contents: [
        new RouteDescriptor({
          layouts: [SingleItemLayout.typeDescriptor],
        }),
        new ConditionalRouteDescriptor(),
        new ConditionalContentDescriptor(),
        new CardDescriptor(),
        new GroupDescriptor({
          layouts: [
            CarouselGroupLayout.typeDescriptor,
            GridGroupLayout.typeDescriptor,
          ],
        }),
        new AccordionDescriptor(),
        new PortableTextDescriptor({
          blockTypes: [
            {
              type: CARD_SCHEMA_TYPE,
              component: PortableTextConfig.shared.renderContentItem,
            },
            {
              type: GROUP_SCHEMA_TYPE,
              component: PortableTextConfig.shared.renderContentItem,
            },
            {
              type: DIVIDER_SCHEMA_TYPE,
              component: PortableTextConfig.shared.renderContentItem,
            },
            {
              type: CONDITIONAL_CONTENT_SCHEMA_TYPE,
              component: PortableTextConfig.shared.renderContentItem,
            },
            {
              type: API_CONTENT_SCHEMA_TYPE,
              component: PortableTextConfig.shared.renderContentItem,
            },
            {
              type: VIDEO_PLAYER_SCHEMA_TYPE,
              component: PortableTextConfig.shared.renderContentItem,
            },
            {
              type: ACCORDION_SCHEMA_TYPE,
              component: PortableTextConfig.shared.renderContentItem,
            },
          ],
        }),
        new DividerDescriptor(),
        new VideoPlayerDescriptor(),
        new APIContentDescriptor(),
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
        new APIContentBuilder(),
        new AccordionContentBuilder(),
      ],
      actions: [
        NavigateAction.typeDescriptor,
        OpenUrlAction.typeDescriptor, // Add the new OpenUrlAction
      ],
      conditions: [BooleanCondition.typeDescriptor],
    }),
  ],
  extensionBuilders: [new ContentExtensionBuilder()],
  init: async () => {
    console.log('System feature initialized with Tailwind CSS 4.0');
  },
});
