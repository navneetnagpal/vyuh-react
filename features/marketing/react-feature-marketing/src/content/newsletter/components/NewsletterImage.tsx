import { MediaImage } from '@/shared/components';
import { ImageReference } from '@vyuh/react-core';
import React from 'react';

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
  if (!image) {
    return null;
  }

  return (
    <MediaImage
      image={image}
      alt={alt}
      className={className}
      fill
      rounded="lg"
    />
  );
};
