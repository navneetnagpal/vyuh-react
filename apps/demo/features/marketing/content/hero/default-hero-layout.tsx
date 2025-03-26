import {
  HeroBackgroundImage,
  HeroCentered,
  HeroImageBelow,
  HeroImageTiles,
  HeroOffsetImage,
  HeroSplitLeft,
  HeroSplitRight,
} from '@/features/marketing/content/hero/components';
import { Hero, HERO_SCHEMA_TYPE } from '@/features/marketing/content/hero/hero';
import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Hero layout variant type
 */
export type HeroVariant =
  | 'centered'
  | 'split-right'
  | 'split-left'
  | 'bg-image'
  | 'image-below'
  | 'image-tiles'
  | 'offset-image';

/**
 * Default layout for hero content items
 *
 * Features:
 * - Support for multiple variants
 * - Responsive design
 * - Tailwind CSS styling
 */
export class DefaultHeroLayout extends LayoutConfiguration<Hero> {
  static readonly schemaName = `${HERO_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant: HeroVariant;

  constructor(props?: Partial<DefaultHeroLayout>) {
    super({
      schemaType: DefaultHeroLayout.schemaName,
      title: 'Default Hero Layout',
    });

    this.variant = props?.variant ?? 'centered';
  }

  /**
   * Render the hero content based on the selected variant
   */
  render(content: Hero): React.ReactNode {
    return <HeroView content={content} variant={this.variant} />;
  }
}

/**
 * HeroView component for rendering hero content with the appropriate variant
 */
interface HeroViewProps {
  content: Hero;
  variant: HeroVariant;
}

const HeroView: React.FC<HeroViewProps> = ({ content, variant }) => {
  const { plugins } = useVyuh();

  // Process image URLs if needed
  const processedContent = {
    ...content,
    background: content.background && {
      ...content.background,
      image: content.background.image && {
        ...content.background.image,
        url:
          content.background.image.url ||
          plugins.content.provider.image(content.background.image),
      },
    },
    media: content.media && {
      ...content.media,
      image: content.media.image && {
        ...content.media.image,
        url:
          content.media.image.url ||
          plugins.content.provider.image(content.media.image),
      },
      imageTiles: content.media.imageTiles?.map((img) => ({
        ...img,
        url: img.url || plugins.content.provider.image(img),
      })),
    },
  };

  // Render the appropriate variant
  switch (variant) {
    case 'centered':
      return <HeroCentered {...processedContent} />;
    case 'split-right':
      return <HeroSplitRight {...processedContent} />;
    case 'split-left':
      return <HeroSplitLeft {...processedContent} />;
    case 'bg-image':
      return <HeroBackgroundImage {...processedContent} />;
    case 'image-below':
      return <HeroImageBelow {...processedContent} />;
    case 'image-tiles':
      return <HeroImageTiles {...processedContent} />;
    case 'offset-image':
      return <HeroOffsetImage {...processedContent} />;
    default:
      return <HeroCentered {...processedContent} />;
  }
};
