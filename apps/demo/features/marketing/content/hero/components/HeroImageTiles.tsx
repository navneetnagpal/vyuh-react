import React from 'react';
import { Hero } from '../hero';
import {
  getBackgroundStyles,
  getImageUrl,
  HeroActions,
  HeroSubtitle,
  HeroTitle,
} from './HeroUtils';

export function HeroImageTiles(props: Hero) {
  const { title, subtitle, background, media, actions } = props;
  const bgStyles = getBackgroundStyles(background);
  const hasImageTiles =
    media?.type === 'image-tiles' &&
    media.imageTiles &&
    media.imageTiles.length > 0;

  // Create placeholder tiles if no images are provided
  const placeholderTiles = [
    {
      url: 'https://via.placeholder.com/280x320?text=Image+1',
      alt: 'Placeholder 1',
    },
    {
      url: 'https://via.placeholder.com/280x320?text=Image+2',
      alt: 'Placeholder 2',
    },
    {
      url: 'https://via.placeholder.com/280x320?text=Image+3',
      alt: 'Placeholder 3',
    },
    {
      url: 'https://via.placeholder.com/280x320?text=Image+4',
      alt: 'Placeholder 4',
    },
    {
      url: 'https://via.placeholder.com/280x320?text=Image+5',
      alt: 'Placeholder 5',
    },
  ];

  const tiles = hasImageTiles
    ? media.imageTiles.map((img) => ({
        url: getImageUrl(img, 'https://via.placeholder.com/280x320?text=Image'),
        alt: img.alt || 'Image',
      }))
    : placeholderTiles;

  return (
    <div className="relative isolate overflow-hidden" style={bgStyles}>
      <div className="pb-24 pt-10 sm:pb-32 lg:pb-40 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <HeroTitle title={title} />
            <HeroSubtitle subtitle={subtitle} />
            <HeroActions actions={actions} />
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-32">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {tiles.map((tile, index) => (
                  <div
                    key={index}
                    className={`${index === 0 ? 'col-span-2 row-span-2 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-2' : ''}`}
                  >
                    <img
                      src={tile.url}
                      alt={tile.alt || `Image ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
