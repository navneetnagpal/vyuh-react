import React from 'react';
import { HeroSplit } from './HeroSplit';
import { HeroComponentProps } from './HeroTypes';

export function HeroSplitLeft({ content, layout }: HeroComponentProps) {
  return <HeroSplit content={content} layout={layout} imagePosition="left" />;
}
