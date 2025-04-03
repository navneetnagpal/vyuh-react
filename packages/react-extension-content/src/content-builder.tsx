import { ContentDescriptor } from '@/content-descriptor';
import {
  ContentItem,
  LayoutConfiguration,
  SchemaItem,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import React from 'react';

/**
 * Builder for configuring and managing content types and their layouts.
 *
 * ContentBuilder is responsible for:
 * - Managing layout configurations for content types
 * - Building content widgets
 */
export class ContentBuilder<TContent extends ContentItem = ContentItem>
  implements SchemaItem
{
  /**
   * The schema type for this builder
   */
  readonly schemaType: string;

  /**
   * The default layout for this content type
   */
  private _defaultLayout: LayoutConfiguration;

  /**
   * Get the default layout
   */
  get defaultLayout(): LayoutConfiguration {
    return this._defaultLayout;
  }

  private readonly _defaultLayoutDescriptor: TypeDescriptor<LayoutConfiguration>;

  /**
   * Get the default layout descriptor
   */
  get defaultLayoutDescriptor(): TypeDescriptor<LayoutConfiguration> {
    return this._defaultLayoutDescriptor;
  }

  /**
   * The feature that registered this content builder
   */
  private _sourceFeature?: string;

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Set the source feature
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;
  }

  /**
   * Creates a new content builder
   */
  constructor({
    schemaType,
    defaultLayout,
    defaultLayoutDescriptor,
  }: {
    schemaType: string;
    defaultLayout: LayoutConfiguration;
    defaultLayoutDescriptor: TypeDescriptor<LayoutConfiguration>;
  }) {
    this.schemaType = schemaType;
    this._defaultLayout = defaultLayout;
    this._defaultLayoutDescriptor = defaultLayoutDescriptor;
  }

  /**
   * Initialize this content builder with the given content descriptors
   *
   * This method:
   * 1. Collects all available layouts from descriptors
   * 2. Combines them with the default layout
   * 3. Registers any additional type descriptors
   *
   * @param descriptors Content descriptors for this content type
   */
  init(descriptors: ContentDescriptor[]): void {}

  getLayout(content: TContent): LayoutConfiguration | undefined {
    return Array.isArray(content.layout) ? content.layout[0] : undefined;
  }

  /**
   * Build a widget for the given content item
   */
  render(
    content: TContent,
    layout: LayoutConfiguration | undefined,
  ): React.ReactNode {
    // Using getState() here since this is not inside a React component's render function
    const { plugins } = useVyuh();
    const contentPlugin = plugins.content;
    const telemetry = plugins.telemetry;

    if (layout) {
      return layout.render(content);
    }

    const layoutConfig = this.getLayout(content);
    const layoutType = layoutConfig
      ? contentPlugin.provider.schemaType(layoutConfig)
      : undefined;

    const layoutDescriptor = layoutType
      ? contentPlugin.getItem(LayoutConfiguration, layoutType)
      : undefined;

    if (!layoutDescriptor) {
      telemetry?.log(
        `No layout found for ${this.schemaType}. Using default.`,
        'debug',
      );

      return this.defaultLayout.render(content);
    }

    const contentLayout = new layoutDescriptor.fromJson(layoutConfig);
    return contentLayout.render(content);
  }

  /**
   * Set the default layout for this content builder
   */
  setDefaultLayout(layout: LayoutConfiguration): void {
    this._defaultLayout = layout;
  }
}
