import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import { AsyncContentContainer } from '@vyuh/react-extension-content';
import React from 'react';
import {
  VIDEO_PLAYER_SCHEMA_TYPE,
  VideoLinkType,
  VideoPlayer,
} from './video-player';

/**
 * Default layout for video player content.
 *
 * Features:
 * * Responsive aspect ratio
 * * Rounded corners
 * * Optional title/caption display
 * * Loading and error states
 * * Playback controls overlay
 */
export class DefaultVideoPlayerLayout extends LayoutConfiguration<VideoPlayer> {
  static readonly schemaName = `${VIDEO_PLAYER_SCHEMA_TYPE}.layout.default`;

  static readonly typeDescriptor = new TypeDescriptor(
    DefaultVideoPlayerLayout.schemaName,
    DefaultVideoPlayerLayout,
  );

  constructor() {
    super({
      schemaType: DefaultVideoPlayerLayout.schemaName,
      title: 'Default Video Player Layout',
    });
  }

  /**
   * Render the video player with default styling
   */
  render(content: VideoPlayer): React.ReactNode {
    return <VideoPlayerComponent content={content} />;
  }
}

interface VideoPlayerComponentProps {
  content: VideoPlayer;
}

/**
 * Video player component that handles different video sources and controls
 */
const VideoPlayerComponent: React.FC<VideoPlayerComponentProps> = ({
  content,
}) => {
  const { plugins, components } = useVyuh();

  // Function to load the video URL
  const loadVideoUrl = async () => {
    let url: string | null = null;

    if (content.linkType === VideoLinkType.file && content.file) {
      // Get URL from file reference using content provider
      url = await plugins.content?.provider.fileUrl(content.file);
    } else if (content.linkType === VideoLinkType.url && content.url) {
      url = content.url;
    }

    if (!url) {
      throw new Error('Unable to determine video URL');
    }

    return url;
  };

  // Function to render the video with the loaded URL
  const renderVideo = (url: string) => {
    return (
      <div className="w-full">
        {content.title && (
          <div className="mb-2 text-lg font-medium">{content.title}</div>
        )}
        <div className="relative overflow-hidden rounded-lg">
          <VideoElement
            url={url}
            loop={content.loop}
            muted={content.muted}
            autoplay={content.autoplay}
          />
        </div>
      </div>
    );
  };

  return (
    <AsyncContentContainer
      fetchContent={loadVideoUrl}
      renderContent={renderVideo}
      errorTitle="Failed to load video"
    />
  );
};

interface VideoElementProps {
  url: string;
  loop: boolean;
  muted: boolean;
  autoplay: boolean;
}

/**
 * Video element component that handles the actual video playback
 */
const VideoElement: React.FC<VideoElementProps> = ({
  url,
  loop,
  muted,
  autoplay,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (muted) {
        videoRef.current.muted = true;
      }

      if (autoplay) {
        videoRef.current.autoplay = true;
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked by browser
          console.warn('Autoplay was prevented by the browser');
        });
      }
    }
  }, [muted, autoplay]);

  return (
    <video
      ref={videoRef}
      className="aspect-video w-full object-cover"
      src={url}
      controls
      loop={loop}
      muted={muted}
      playsInline
    />
  );
};
