import React from 'react';
import { HeroComponentProps } from './HeroTypes';
import { HeroSplit } from './HeroSplit';

export function HeroSplitRight({ content, layout }: HeroComponentProps) {
  return <HeroSplit content={content} layout={layout} imagePosition="right" />;
}
