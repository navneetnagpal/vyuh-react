import { useMediaUtils } from '@/content/shared/MediaUtils';
import { cn } from '@/content/shared/utils';
import { ImageReference } from '@vyuh/react-core';
import React from 'react';

interface CTAImageProps {
  image: ImageReference;
  alt?: string;
  className?: string;
}

export const CTAImage: React.FC<CTAImageProps> = ({
  image,
  alt = 'CTA image',
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  if (!image) {
    return null;
  }

  return (
    <div className={cn('overflow-hidden rounded-lg', className)}>
      <img
        src={getImageUrl(image)}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
