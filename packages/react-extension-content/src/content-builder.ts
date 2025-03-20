import { ContentDescriptor } from '@/content-descriptor';
import {
  ContentItem,
  LayoutConfiguration,
  SchemaItem,
  TypeDescriptor,
  useVyuhStore,
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
  }: {
    schemaType: string;
    defaultLayout: LayoutConfiguration;
  }) {
    this.schemaType = schemaType;
    this._defaultLayout = defaultLayout;
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
  render(content: TContent): React.ReactNode {
    const store = useVyuhStore.getState();
    const contentPlugin = store.plugins.content;
    const telemetry = store.plugins.telemetry;

    const layoutConfig = this.getLayout(content);
    const layoutType = layoutConfig
      ? contentPlugin.provider.schemaType(layoutConfig)
      : undefined;

    const layoutDescriptor: TypeDescriptor<LayoutConfiguration> =
      contentPlugin.getItem(TypeDescriptor<LayoutConfiguration>, layoutType);

    if (!layoutDescriptor) {
      telemetry?.log(
        `No layout found for ${this.schemaType}. Using default.`,
        'debug',
      );

      return this.defaultLayout.render(content);
    }

    const layout = new layoutDescriptor.fromJson(layoutConfig);
    return layout.render(content);
  }

  /**
   * Set the default layout for this content builder
   */
  setDefaultLayout(layout: LayoutConfiguration): void {
    this._defaultLayout = layout;
  }
}
