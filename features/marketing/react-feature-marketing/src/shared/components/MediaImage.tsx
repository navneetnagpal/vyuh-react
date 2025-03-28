import { ImageReference } from '@vyuh/react-core';
import { cn } from '@/shared/utils';
import React from 'react';
import { useMediaUtils } from '@/shared/MediaUtils';

export interface MediaImageProps {
  /**
   * The image reference to display
   */
  image?: ImageReference;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Additional CSS classes to apply to the image container
   */
  className?: string;

  /**
   * Additional CSS classes to apply to the image element
   */
  imgClassName?: string;

  /**
   * Whether to make the image fill its container
   */
  fill?: boolean;

  /**
   * The object fit property for the image
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /**
   * Whether to apply a rounded border to the image
   */
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Whether to apply a shadow to the image
   */
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Whether to apply a border to the image
   */
  border?: boolean;
}

/**
 * A reusable component for displaying images
 */
export const MediaImage: React.FC<MediaImageProps> = ({
  image,
  alt = '',
  className,
  imgClassName,
  fill = false,
  objectFit = 'cover',
  rounded = false,
  shadow = false,
  border = false,
}) => {
  const { getImageUrl } = useMediaUtils();

  if (!image) {
    return null;
  }

  const roundedClasses = {
    true: 'rounded',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
    false: '',
  };

  const shadowClasses = {
    true: 'shadow',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    false: '',
  };

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  return (
    <div className={className}>
      <img
        src={getImageUrl(image)}
        alt={alt}
        className={cn(
          fill && 'h-full w-full',
          objectFitClasses[objectFit],
          roundedClasses[rounded as keyof typeof roundedClasses],
          shadowClasses[shadow as keyof typeof shadowClasses],
          border && 'border border-gray-200 dark:border-gray-700',
          imgClassName,
        )}
      />
    </div>
  );
};
