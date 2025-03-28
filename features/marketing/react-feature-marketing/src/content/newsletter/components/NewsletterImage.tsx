import { ImageReference } from '@vyuh/react-core';
import { cn } from '@/shared/utils';
import React from 'react';
import { useMediaUtils } from '@/shared/MediaUtils';

interface NewsletterImageProps {
  image: ImageReference;
  alt?: string;
  className?: string;
}

export const NewsletterImage: React.FC<NewsletterImageProps> = ({
  image,
  alt = 'Newsletter image',
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
