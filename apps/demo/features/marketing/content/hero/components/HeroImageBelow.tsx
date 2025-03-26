import React from 'react';
import { Hero } from '../hero';
import {
  useBackgroundStyles,
  HeroActions,
  HeroSubtitle,
  HeroTitle,
} from './HeroUtils';
import { HeroMedia } from './HeroMedia';

export function HeroImageBelow(props: Hero) {
  const { title, subtitle, background, media, actions } = props;
  const bgStyles = useBackgroundStyles(background);
  const hasMedia = media && media.type !== 'none';

  return (
    <div className="relative isolate overflow-hidden" style={bgStyles}>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <HeroTitle title={title} />
            <HeroSubtitle subtitle={subtitle} />
            <HeroActions actions={actions} className="justify-center" />
          </div>
          {hasMedia && (
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <HeroMedia
                  media={media}
                  className={media?.type === 'image-tiles' ? '' : 'w-full'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
