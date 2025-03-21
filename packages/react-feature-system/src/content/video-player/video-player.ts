import { ContentItem, FileReference } from '@vyuh/react-core';

/**
 * Type of video link source
 */
export enum VideoLinkType {
  url = 'url',
  file = 'file',
}

export const VIDEO_PLAYER_SCHEMA_TYPE = 'vyuh.videoPlayer';

/**
 * A content item that plays video content from various sources.
 *
 * Features:
 * * Network video playback
 * * File reference video playback (e.g., from CMS)
 * * Autoplay, loop, and mute controls
 * * Optional title/caption
 * * Full-screen support
 * * Playback controls
 */
export interface VideoPlayer extends ContentItem {
  /**
   * Optional title for the video that can be used as a caption
   */
  readonly title?: string;

  /**
   * The type of link for the video
   */
  readonly linkType: VideoLinkType;

  /**
   * The File reference of the video
   */
  readonly file?: FileReference;

  /**
   * The URL of the video
   */
  readonly url?: string;

  /**
   * Whether the video should loop
   */
  readonly loop: boolean;

  /**
   * Whether the video should autoplay
   */
  readonly autoplay: boolean;

  /**
   * Whether the video should be muted
   */
  readonly muted: boolean;
}
