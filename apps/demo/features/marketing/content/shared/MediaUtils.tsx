import { ImageReference, ObjectReference, useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Utility functions for handling media references in marketing components
 */

/**
 * Get an image URL from an ImageReference
 * 
 * @param imageRef The image reference object
 * @param fallback Optional fallback URL if the image reference is invalid
 * @returns The resolved image URL or fallback
 */
export function getImageUrl(
  imageRef?: ImageReference,
  fallback: string = '',
): string {
  const { plugins } = useVyuh();
  
  if (!imageRef || !plugins.content) {
    return fallback;
  }
  
  return plugins.content.provider.image(imageRef) || fallback;
}

/**
 * Get a video URL from an ObjectReference
 * 
 * @param videoRef The video/file reference object
 * @param fallback Optional fallback URL if the video reference is invalid
 * @returns The resolved video URL or fallback
 */
export function getVideoUrl(
  videoRef?: ObjectReference,
  fallback: string = '',
): string {
  const { plugins } = useVyuh();
  
  if (!videoRef || !plugins.content) {
    return fallback;
  }
  
  return plugins.content.provider.fileUrl(videoRef) || fallback;
}

/**
 * React hook for getting media URLs
 * 
 * @returns Object with utility functions for getting media URLs
 */
export function useMediaUtils() {
  const { plugins } = useVyuh();
  
  return React.useMemo(() => ({
    /**
     * Get an image URL from an ImageReference
     */
    getImageUrl: (imageRef?: ImageReference, fallback: string = ''): string => {
      if (!imageRef || !plugins.content) {
        return fallback;
      }
      
      return plugins.content.provider.image(imageRef) || fallback;
    },
    
    /**
     * Get a video URL from an ObjectReference
     */
    getVideoUrl: (videoRef?: ObjectReference, fallback: string = ''): string => {
      if (!videoRef || !plugins.content) {
        return fallback;
      }
      
      return plugins.content.provider.fileUrl(videoRef) || fallback;
    },
  }), [plugins.content]);
}

/**
 * Image component that handles ImageReference objects
 */
export const MediaImage: React.FC<{
  image?: ImageReference;
  fallback?: string;
  alt?: string;
  className?: string;
}> = ({ image, fallback, alt = '', className = '' }) => {
  const { getImageUrl } = useMediaUtils();
  const imageUrl = getImageUrl(image, fallback);
  
  if (!imageUrl) {
    return null;
  }
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
    />
  );
};

/**
 * Video component that handles ObjectReference objects
 */
export const MediaVideo: React.FC<{
  video?: ObjectReference;
  fallback?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}> = ({
  video,
  fallback,
  className = '',
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
}) => {
  const { getVideoUrl } = useMediaUtils();
  const videoUrl = getVideoUrl(video, fallback);
  
  if (!videoUrl) {
    return null;
  }
  
  return (
    <video
      src={videoUrl}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
    >
      Your browser does not support the video tag.
    </video>
  );
};
