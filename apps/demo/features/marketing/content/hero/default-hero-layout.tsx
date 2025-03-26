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
import { ImageReference, LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
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
  readonly background?: {
    type: 'none' | 'color' | 'image' | 'gradient';
    color?: string;
    image?: ImageReference;
    gradient?: string;
  };

  constructor(props?: Partial<DefaultHeroLayout>) {
    super({
      schemaType: DefaultHeroLayout.schemaName,
      title: 'Default Hero Layout',
    });

    this.variant = props?.variant ?? 'centered';
    this.background = props?.background;
  }

  /**
   * Render the hero content based on the selected variant
   */
  render(content: Hero): React.ReactNode {
    return <HeroView
      content={content}
      layout={{
        variant: this.variant,
        background: this.background
      }}
    />;
  }
}

/**
 * HeroView component for rendering hero content with the appropriate variant
 */
interface HeroViewProps {
  content: Hero;
  layout: {
    variant: HeroVariant;
    background?: DefaultHeroLayout['background'];
  };
}

const HeroView: React.FC<HeroViewProps> = ({ content, layout }) => {
  const { plugins } = useVyuh();
  const { variant, background } = layout;

  // Render the appropriate variant
  switch (variant) {
    case 'centered':
      return <HeroCentered content={content} layout={layout} />;
    case 'split-right':
      return <HeroSplitRight content={content} layout={layout} />;
    case 'split-left':
      return <HeroSplitLeft content={content} layout={layout} />;
    case 'bg-image':
      return <HeroBackgroundImage content={content} layout={layout} />;
    case 'image-below':
      return <HeroImageBelow content={content} layout={layout} />;
    case 'image-tiles':
      return <HeroImageTiles content={content} layout={layout} />;
    case 'offset-image':
      return <HeroOffsetImage content={content} layout={layout} />;
    default:
      return <HeroCentered content={content} layout={layout} />;
  }
};
