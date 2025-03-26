import React from 'react';
import { Hero } from '../hero';
import { ImageReference, ObjectReference } from '@vyuh/react-core';
import { MediaImage, MediaVideo, useMediaUtils } from '@/features/marketing/content/shared/MediaUtils';

type HeroMediaProps = {
  media?: Hero['media'];
  className?: string;
  containerClassName?: string;
};

export function HeroMedia({
  media,
  className = '',
  containerClassName = '',
}: HeroMediaProps) {
  const { getImageUrl } = useMediaUtils();

  if (!media || media.type === 'none') {
    return null;
  }

  // Container with optional styling
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className={`${containerClassName}`}>{children}</div>
  );

  // Render based on media type
  switch (media.type) {
    case 'image':
      if (!media.image) return null;

      return (
        <Container>
          <MediaImage
            image={media.image}
            fallback="https://via.placeholder.com/1200x800?text=Hero+Image"
            alt="Hero Image"
            className={`rounded-md shadow-2xl ring-1 ring-gray-900/10 ${className}`}
          />
        </Container>
      );

    case 'video':
      if (!media.video) return null;

      return (
        <Container>
          <div
            className={`relative overflow-hidden rounded-md shadow-2xl ring-1 ring-gray-900/10 ${className}`}
          >
            <MediaVideo
              video={media.video}
              autoPlay
              muted
              loop
              controls={false}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      );

    case 'image-tiles':
      if (!media.imageTiles || media.imageTiles.length === 0) return null;

      // Check if we should use the special layout with first tile larger
      const useSpecialLayout = containerClassName.includes('w-full');

      return (
        <Container>
          <div
            className={`grid ${useSpecialLayout ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4 ${className}`}
          >
            {media.imageTiles.map((image, index) => {
              // Special class for the first tile in special layout
              const specialFirstTileClass =
                useSpecialLayout && index === 0
                  ? 'col-span-2 row-span-2 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-2'
                  : '';

              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-md shadow-md ring-1 ring-gray-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${specialFirstTileClass}`}
                >
                  <MediaImage
                    image={image}
                    fallback={`https://via.placeholder.com/400x300?text=Tile+${index + 1}`}
                    alt={`Image Tile ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </Container>
      );

    default:
      return null;
  }
}
