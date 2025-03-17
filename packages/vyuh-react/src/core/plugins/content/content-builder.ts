import { ContentItem } from '@/core/content/content-item';
import React from 'react';
import { LayoutConfiguration } from '@/core/content/layout-configuration';
import { ContentDescriptor } from './content-descriptor';

/**
 * Builder for configuring and managing content types and their layouts.
 *
 * ContentBuilder is responsible for:
 * - Managing layout configurations for content types
 * - Building content widgets
 */
export class ContentBuilder<TContent extends ContentItem> {
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
   * List of all available layouts
   */
  private _layouts: LayoutConfiguration[] = [];

  /**
   * Get all available layouts
   */
  get layouts(): LayoutConfiguration[] {
    return this._layouts;
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
  init(descriptors: ContentDescriptor[]): void {
    // Extract layouts from descriptors
    const userLayouts = descriptors.flatMap(
      (descriptor) => descriptor.layouts || [],
    );

    // Combine default layout with user layouts, ensuring uniqueness
    const uniqueLayouts = new Set<LayoutConfiguration>([
      this.defaultLayout,
      ...userLayouts,
    ]);

    this._layouts = Array.from(uniqueLayouts);
  }

  /**
   * Build a widget for the given content item
   */
  render(content: TContent): React.ReactNode {
    // Get the layout from the content or use default
    const layoutType = content.layout || this.defaultLayout.schemaType;
    let layout = this._layouts.find((l) => l.schemaType === layoutType);

    if (!layout) {
      console.debug(`No layout found for ${this.schemaType}. Using default.`);
      layout = this.defaultLayout;
    }

    return layout.render(content);
  }

  /**
   * Set the default layout for this content builder
   */
  setDefaultLayout(layout: LayoutConfiguration): void {
    this._defaultLayout = layout;
  }

  /**
   * Register type descriptors with the content system
   *
   * This is a helper method for subclasses to register additional type descriptors
   * that may be needed for their specific content type.
   *
   * @param descriptors The type descriptors to register
   * @param checkUnique Whether to check for uniqueness (defaults to false)
   */
  protected registerDescriptors<T>(
    descriptors: any[],
    checkUnique: boolean = false,
  ): void {
    // This would be implemented to register descriptors with the content system
    // In a real implementation, this would likely call into a registry service

    // For now, just log the registration
    console.debug(
      `Registering ${descriptors.length} descriptors for ${this.schemaType}`,
    );
  }
}
