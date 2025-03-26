import {
  FeatureCenteredGrid,
  FeatureSimple,
  FeatureThreeColumn,
  FeatureWithCodeExample,
  FeatureWithLeftScreenshot,
  FeatureWithScreenshot,
  FeatureWithScreenshotDark,
} from '@/features/marketing/content/feature/components';
import {
  Feature,
  FEATURE_SCHEMA_TYPE,
} from '@/features/marketing/content/feature/feature';
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
  | 'with-screenshot'
  | 'centered-grid'
  | 'with-screenshot-dark'
  | 'three-column'
  | 'with-left-screenshot'
  | 'with-code-example'
  | 'simple';

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
    return (
      <FeatureView
        content={content}
        layout={{
          variant: this.variant,
          background: this.background,
        }}
      />
    );
  }
}

/**
 * FeatureView component for rendering feature content with the appropriate variant
 */
interface FeatureViewProps {
  content: Feature;
  layout: {
    variant: FeatureVariant;
    background?: DefaultFeatureLayout['background'];
  };
}

const FeatureView: React.FC<FeatureViewProps> = ({ content, layout }) => {
  const { variant, background } = layout;

  // Render the appropriate variant
  switch (variant) {
    case 'with-screenshot':
      return <FeatureWithScreenshot content={content} layout={layout} />;
    case 'centered-grid':
      return <FeatureCenteredGrid content={content} layout={layout} />;
    case 'with-screenshot-dark':
      return <FeatureWithScreenshotDark content={content} layout={layout} />;
    case 'three-column':
      return <FeatureThreeColumn content={content} layout={layout} />;
    case 'with-left-screenshot':
      return <FeatureWithLeftScreenshot content={content} layout={layout} />;
    case 'with-code-example':
      return <FeatureWithCodeExample content={content} layout={layout} />;
    case 'simple':
      return <FeatureSimple content={content} layout={layout} />;
    default:
      return <FeatureWithScreenshot content={content} layout={layout} />;
  }
};
