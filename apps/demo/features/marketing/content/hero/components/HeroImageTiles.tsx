import React from 'react';
import {
  useBackgroundStyles,
  HeroActions,
  HeroSubtitle,
  HeroTitle,
} from './HeroUtils';
import { HeroMedia } from './HeroMedia';
import { HeroComponentProps } from './HeroTypes';

export function HeroImageTiles({ content, layout }: HeroComponentProps) {
  const { title, subtitle, media, actions } = content;
  const { background } = layout;
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
