import React from 'react';
import { Hero } from '../hero';
import {
  getBackgroundStyles,
  getImageUrl,
  HeroActions,
  HeroSubtitle,
  HeroTitle,
} from './HeroUtils';

export function HeroSplitRight(props: Hero) {
  const { title, subtitle, background, media, actions } = props;
  const bgStyles = getBackgroundStyles(background);
  const hasImage = media?.type === 'image' && media.image;
  const imageUrl = hasImage
    ? getImageUrl(
        media.image,
        'https://via.placeholder.com/640x360?text=Hero+Image',
      )
    : '';

  return (
    <div className="relative isolate overflow-hidden" style={bgStyles}>
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <HeroTitle title={title} />
              <HeroSubtitle subtitle={subtitle} />
              <HeroActions actions={actions} />
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div className="shadow-lg md:rounded-3xl">
            <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div
                className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                {hasImage ? (
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <img
                      src={imageUrl}
                      alt=""
                      className="w-full rounded-xl shadow-xl ring-1 ring-white/10 md:w-auto"
                    />
                  </div>
                ) : (
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="h-80 w-full rounded-xl bg-gray-200 md:w-auto"></div>
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
