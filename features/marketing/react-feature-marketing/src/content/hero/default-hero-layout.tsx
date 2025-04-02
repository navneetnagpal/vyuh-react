import { HeroCentered, HeroSplitRight } from '@/content/hero/components';
import { Hero, HERO_SCHEMA_TYPE } from '@/content/hero/hero';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Hero layout variant type
 */
export type HeroVariant = 'centered' | 'split-right';

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
    return <HeroView content={content} layout={this} />;
  }
}

/**
 * HeroView component for rendering hero content with the appropriate variant
 */
interface HeroViewProps {
  content: Hero;
  layout: DefaultHeroLayout;
}

const HeroView: React.FC<HeroViewProps> = ({ content, layout }) => {
  const { variant } = layout;

  // Render the appropriate variant
  switch (variant) {
    case 'centered':
      return <HeroCentered content={content} layout={layout} />;
    case 'split-right':
      return <HeroSplitRight content={content} layout={layout} />;
    default:
      return <HeroCentered content={content} layout={layout} />;
  }
};
