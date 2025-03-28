import { ImageReference } from '@vyuh/react-core';
import { cn } from '@/shared/utils';
import React from 'react';
import { useMediaUtils } from '@/shared/MediaUtils';

interface StatsImageProps {
  image: ImageReference;
  alt?: string;
  className?: string;
}

export const StatsImage: React.FC<StatsImageProps> = ({
  image,
  alt = 'Stats image',
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  if (!image) {
    return null;
  }

  return (
    <div className={className}>
      <img
        src={getImageUrl(image)}
        alt={alt}
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  );
};
