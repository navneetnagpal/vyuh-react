import { ContentDescriptor } from '@vyuh/react-extension-content';
import { VideoPlayer, VIDEO_PLAYER_SCHEMA_TYPE } from './video-player';

/**
 * Descriptor for the VideoPlayer content type
 *
 * This descriptor configures:
 * - The schema type for video players
 * - Available layouts for video players
 * - Default configuration
 */
export class VideoPlayerDescriptor extends ContentDescriptor<VideoPlayer> {
  /**
   * Creates a new VideoPlayer descriptor
   *
   * @param options Configuration options for the descriptor
   */
  constructor(options?: Partial<VideoPlayerDescriptor>) {
    super({
      schemaType: VIDEO_PLAYER_SCHEMA_TYPE,
      title: 'Video Player',
      layouts: options?.layouts,
    });
  }
}