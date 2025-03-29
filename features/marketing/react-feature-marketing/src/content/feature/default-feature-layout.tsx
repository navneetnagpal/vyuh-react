import { FeatureSimple, FeatureWithMedia } from '@/content/feature/components';
import { Feature, FEATURE_SCHEMA_TYPE } from '@/content/feature/feature';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Feature layout variant type
 */
export type FeatureVariant = 'simple' | 'with-media';

/**
 * Default layout for feature content items
 *
 * Features:
 * - Support for multiple variants
 * - Responsive design
 * - Tailwind CSS styling
 */
export class DefaultFeatureLayout extends LayoutConfiguration<Feature> {
  static readonly schemaName = `${FEATURE_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant: FeatureVariant;
  readonly background?: {
    type: 'none' | 'color' | 'gradient';
    color?: string;
    gradient?: string;
  };

  constructor(props?: Partial<DefaultFeatureLayout>) {
    super({
      schemaType: DefaultFeatureLayout.schemaName,
      title: 'Default Feature Layout',
    });

    this.variant = props?.variant ?? 'with-media';
    this.background = props?.background;
  }

  /**
   * Render the feature content based on the selected variant
   */
  render(content: Feature): React.ReactNode {
    return <FeatureView content={content} layout={this} />;
  }
}

/**
 * FeatureView component for rendering feature content with the appropriate variant
 */
interface FeatureViewProps {
  content: Feature;
  layout: DefaultFeatureLayout;
}

const FeatureView: React.FC<FeatureViewProps> = ({ content, layout }) => {
  const { variant, background } = layout;

  // Render the appropriate variant
  switch (variant) {
    case 'simple':
      return <FeatureSimple content={content} layout={layout} />;

    case 'with-media':
      return <FeatureWithMedia content={content} layout={layout} />;

    default:
      return <FeatureSimple content={content} layout={layout} />;
  }
};
