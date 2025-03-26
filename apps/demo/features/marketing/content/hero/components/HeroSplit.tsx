import React from 'react';
import { HeroComponentProps } from './HeroTypes';
import {
  useBackgroundStyles,
  HeroActions,
  HeroSubtitle,
  HeroTitle,
} from './HeroUtils';
import { HeroMedia } from './HeroMedia';

type HeroSplitProps = HeroComponentProps & {
  imagePosition: 'left' | 'right';
};

export function HeroSplit({ content, layout, imagePosition }: HeroSplitProps) {
  const { title, subtitle, media, actions } = content;
  const { background } = layout;
  const bgStyles = useBackgroundStyles(background);
  const hasMedia = media && media.type !== 'none';

  // Determine order classes based on image position
  const contentOrderClass = imagePosition === 'left' ? 'order-2' : 'order-1';
  const mediaOrderClass = imagePosition === 'left' ? 'order-1' : 'order-2';

  return (
    <div className="relative isolate overflow-hidden" style={bgStyles}>
      {/* Main container with 80% width */}
      <div className="mx-auto pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        {/* Content section */}
        <div className={`px-6 lg:px-0 lg:pt-4 ${contentOrderClass}`}>
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <HeroTitle title={title} />
              <HeroSubtitle subtitle={subtitle} />
              <HeroActions actions={actions} />
            </div>
          </div>
        </div>

        {/* Media section */}
        <div
          className={`mt-20 sm:mt-24 lg:mt-0 lg:flex-shrink-0 ${mediaOrderClass}`}
        >
          {hasMedia && (
            <HeroMedia
              media={media}
              className="w-full rounded-xl shadow-xl ring-1 ring-white/10 md:w-auto"
              containerClassName="w-full md:w-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
