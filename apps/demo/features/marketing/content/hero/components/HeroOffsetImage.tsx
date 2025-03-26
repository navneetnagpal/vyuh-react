import React from 'react';
import { HeroMedia } from './HeroMedia';
import { HeroComponentProps } from './HeroTypes';
import {
  HeroActions,
  HeroSubtitle,
  HeroTitle,
  useBackgroundStyles,
} from './HeroUtils';

export function HeroOffsetImage({ content, layout }: HeroComponentProps) {
  const { title, subtitle, media, actions } = content;
  const { background } = layout;
  const bgStyles = useBackgroundStyles(background);
  const hasMedia = media && media.type !== 'none';

  return (
    <div className="relative isolate overflow-hidden" style={bgStyles}>
      {/* Main container with 80% width */}
      <div className="mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        {/* Content section */}
        <div className="lg:flex-2/3 mx-auto max-w-2xl lg:mx-0">
          <HeroTitle title={title} />
          <HeroSubtitle subtitle={subtitle} />
          <HeroActions actions={actions} />
        </div>

        {/* Media section - floating box with rounded edges and shadows */}
        <div className="lg:flex-1/3 mt-16 sm:mt-24 lg:mt-0">
          <div className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl lg:float-right">
            {hasMedia && (
              <HeroMedia
                media={media}
                className="w-full rounded-2xl shadow-xl ring-1 ring-gray-900/10 transition-all duration-300 hover:shadow-2xl md:w-auto"
                containerClassName="w-full md:w-auto"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
