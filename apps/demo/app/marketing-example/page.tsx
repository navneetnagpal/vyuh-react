'use client';

import React from 'react';
import { Action, ContentItem } from '@vyuh/react-core';
import { marketing, HERO_SCHEMA_TYPE, DefaultHeroLayout } from '@/features/marketing';

export default function MarketingExample() {
  // Example hero content item
  const heroContent: ContentItem = {
    _type: HERO_SCHEMA_TYPE,
    title: 'Data to enrich your online business',
    subtitle: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.',
    actions: [
      {
        _type: 'vyuh.action',
        label: 'Get started',
        url: '#',
        variant: 'primary',
      } as Action,
      {
        _type: 'vyuh.action',
        label: 'Learn more',
        url: '#',
        variant: 'secondary',
      } as Action,
    ],
  };

  // Get the hero content builder
  const heroBuilder = marketing.extensions[0].contents[0].builders[0];

  // Create different hero layouts with different variants
  const centeredLayout = new DefaultHeroLayout('centered');
  const splitRightLayout = new DefaultHeroLayout('split-right');
  const imageBelowLayout = new DefaultHeroLayout('image-below');

  // Build the hero content with different layouts
  const centeredHero = heroBuilder.buildWithLayout(heroContent, centeredLayout);
  const splitRightHero = heroBuilder.buildWithLayout(heroContent, splitRightLayout);
  const imageBelowHero = heroBuilder.buildWithLayout(heroContent, imageBelowLayout);

  return (
    <div className="min-h-screen">
      {centeredHero}
      
      <div className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold">Marketing Feature Example</h2>
        <p className="mt-4 text-lg">
          This page demonstrates the marketing feature with different hero variants.
        </p>
      </div>
      
      {splitRightHero}
      {imageBelowHero}
    </div>
  );
}
