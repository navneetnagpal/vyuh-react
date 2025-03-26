import React from 'react';
import { Hero } from '../hero';
import {
  useBackgroundStyles,
  HeroActions,
  HeroSubtitle,
  HeroTitle,
} from './HeroUtils';
import { HeroMedia } from './HeroMedia';

export function HeroImageTiles(props: Hero) {
  const { title, subtitle, background, media, actions } = props;
  const bgStyles = useBackgroundStyles(background);
  const hasMedia = media && media.type !== 'none';

  return (
    <div className="relative isolate overflow-hidden" style={bgStyles}>
      <div className="pb-24 pt-10 sm:pb-32 lg:pb-40 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <HeroTitle title={title} />
            <HeroSubtitle subtitle={subtitle} />
            <HeroActions actions={actions} />
          </div>
          {hasMedia && (
            <div className="mt-16 sm:mt-24 lg:mt-32">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <HeroMedia
                  media={media}
                  containerClassName="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
