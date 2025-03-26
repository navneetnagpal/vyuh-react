import React from 'react';
import { Hero } from '../hero';
import {
  getBackgroundStyles,
  getImageUrl,
  HeroActions,
  HeroSubtitle,
  HeroTitle,
} from './HeroUtils';

export function HeroImageBelow(props: Hero) {
  const { title, subtitle, background, media, actions } = props;
  const bgStyles = getBackgroundStyles(background);
  const hasImage = media?.type === 'image' && media.image;
  const imageUrl = hasImage
    ? getImageUrl(
        media.image,
        'https://via.placeholder.com/2432x1442?text=App+Screenshot',
      )
    : '';

  return (
    <div className="relative isolate overflow-hidden" style={bgStyles}>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <HeroTitle title={title} />
            <HeroSubtitle subtitle={subtitle} />
            <HeroActions actions={actions} className="justify-center" />
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              {hasImage ? (
                <img
                  src={imageUrl}
                  alt="Hero Image"
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              ) : (
                <div className="h-[600px] w-full rounded-md bg-gray-200 shadow-2xl ring-1 ring-gray-900/10"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
