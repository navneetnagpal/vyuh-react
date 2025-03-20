import { ContentItem, LayoutConfiguration } from '@vyuh/react-core';
import { TypeDescriptor } from '@vyuh/react-core';

/**
 * Descriptor for content types in the Vyuh system.
 *
 * Content descriptors define:
 * - Metadata about a content type (schema type, title)
 * - Available layouts for a content type
 *
 * They are used by ContentBuilder to initialize content types
 * with their available configurations.
 */
export class ContentDescriptor<TContent extends ContentItem = ContentItem> {
  /**
   * The schema type of the content
   */
  readonly schemaType: string;

  /**
   * The title of the content
   */
  readonly title: string;

  /**
   * Available layouts for this content type
   */
  readonly layouts?: TypeDescriptor<LayoutConfiguration<TContent>>[];

  /**
   * The feature that registered this content descriptor
   */
  private _sourceFeature?: string;

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Creates a new content descriptor
   */
  constructor({
    schemaType,
    title,
    layouts = [],
  }: {
    schemaType: string;
    title: string;
    layouts?: TypeDescriptor<LayoutConfiguration<TContent>>[];
  }) {
    this.schemaType = schemaType;
    this.title = title;
    this.layouts = layouts;
  }

  /**
   * Set the source feature
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;

    // Also set source feature on layouts
    if (this.layouts) {
      for (const layout of this.layouts) {
        if (typeof layout.setSourceFeature === 'function') {
          layout.setSourceFeature(featureName);
        }
      }
    }
  }

  /**
   * Creates a default content descriptor with standard conventions
   */
  static createDefault<TContent extends ContentItem = ContentItem>({
    schemaType,
    title,
  }: {
    schemaType: string;
    title: string;
  }) {
    return (layouts?: TypeDescriptor<LayoutConfiguration<TContent>>[]) =>
      new ContentDescriptor({
        schemaType,
        title,
        layouts,
      });
  }
}
