import { DefaultVideoPlayerLayout } from '@/content/video-player/default-video-player-layout';
import {
  VIDEO_PLAYER_SCHEMA_TYPE,
  VideoPlayer,
} from '@/content/video-player/video-player';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for VideoPlayer content items
 */
export class VideoPlayerContentBuilder extends ContentBuilder<VideoPlayer> {
  constructor() {
    super({
      schemaType: VIDEO_PLAYER_SCHEMA_TYPE,
      defaultLayout: new DefaultVideoPlayerLayout(),
      defaultLayoutDescriptor: DefaultVideoPlayerLayout.typeDescriptor,
    });
  }
}
