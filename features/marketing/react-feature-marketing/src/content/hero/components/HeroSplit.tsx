import { Section } from '@/shared/components';
import React from 'react';
import { HeroComponentProps } from './HeroTypes';
import {
  HeroActions,
  HeroMedia,
  HeroSubtitle,
  HeroTitle,
  useBackgroundStyles,
} from './HeroUtils';

type HeroSplitProps = HeroComponentProps & {
  imagePosition: 'left' | 'right';
};

export function HeroSplit({ content, layout, imagePosition }: HeroSplitProps) {
  const { title, subtitle, media, actions } = content;
  const { background } = layout;
  const hasMedia = media && media.type !== 'none';

  // Determine order classes based on image position
  const contentOrderClass = imagePosition === 'left' ? 'order-2' : 'order-1';
  const mediaOrderClass = imagePosition === 'left' ? 'order-1' : 'order-2';

  return (
    <Section>
      <div className="mx-auto items-stretch gap-16 pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-16 lg:py-40">
        {/* Content section */}
        <div className={`pb-16 lg:py-4 lg:pb-0 ${contentOrderClass}`}>
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <HeroTitle title={title} />
              <HeroSubtitle subtitle={subtitle} />
              <HeroActions actions={actions} />
            </div>
          </div>
        </div>

        {/* Media section */}
        <div className={`${mediaOrderClass}`}>
          {hasMedia && (
            <HeroMedia
              media={media}
              className="h-full ring-1 ring-white/10 md:w-auto"
              containerClassName="w-full h-full md:w-auto"
            />
          )}
        </div>
      </div>
    </Section>
  );
}
