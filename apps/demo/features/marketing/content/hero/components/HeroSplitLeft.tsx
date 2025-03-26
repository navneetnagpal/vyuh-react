import React from 'react';
import { HeroComponentProps } from './HeroTypes';
import { HeroSplit } from './HeroSplit';

export function HeroSplitLeft({ content, layout }: HeroComponentProps) {
  return <HeroSplit content={content} layout={layout} imagePosition="left" />;
}
