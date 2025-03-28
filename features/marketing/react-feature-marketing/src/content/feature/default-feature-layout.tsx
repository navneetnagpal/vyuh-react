import {
  FeatureCenteredGrid,
  FeatureSimple,
  FeatureThreeColumn,
  FeatureWithCodeExample,
  FeatureWithLeftScreenshot,
  FeatureWithScreenshot,
  FeatureWithScreenshotDark,
} from '@/content/feature/components';
import { FeatureWithMedia } from '@/content/feature/components/FeatureWithMedia';
import { Feature, FEATURE_SCHEMA_TYPE } from '@/content/feature/feature';
import {
  ImageReference,
  LayoutConfiguration,
  TypeDescriptor,
} from '@vyuh/react-core';
import React from 'react';

/**
 * Feature layout variant type
 */
export type FeatureVariant =
  | 'simple'
  | 'centered-grid'
  | 'three-column'
  | 'with-screenshot'
  | 'with-screenshot-dark'
  | 'with-media-left'
  | 'with-media-right';

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
    type: 'none' | 'color' | 'image' | 'gradient';
    color?: string;
    image?: ImageReference;
    gradient?: string;
  };

  constructor(props?: Partial<DefaultFeatureLayout>) {
    super({
      schemaType: DefaultFeatureLayout.schemaName,
      title: 'Default Feature Layout',
    });

    this.variant = props?.variant ?? 'with-screenshot';
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

    case 'centered-grid':
      return <FeatureCenteredGrid content={content} layout={layout} />;

    case 'three-column':
      return <FeatureThreeColumn content={content} layout={layout} />;

    case 'with-screenshot':
      return <FeatureWithScreenshot content={content} layout={layout} />;

    case 'with-screenshot-dark':
      return <FeatureWithScreenshotDark content={content} layout={layout} />;

    case 'with-media-left':
      return (
        <FeatureWithMedia
          content={content}
          layout={layout}
          mediaPosition="left"
        />
      );

    case 'with-media-right':
      return (
        <FeatureWithMedia
          content={content}
          layout={layout}
          mediaPosition="right"
        />
      );

    default:
      return <FeatureSimple content={content} layout={layout} />;
  }
};
