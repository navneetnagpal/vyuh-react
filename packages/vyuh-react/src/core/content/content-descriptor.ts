/**
 * Describes a content type in the Vyuh platform.
 * Content descriptors define the structure and behavior of content types.
 */
export class ContentDescriptor {
  /**
   * Human-readable title of the content type
   */
  readonly title: string;

  /**
   * Schema type identifier from the CMS
   * Must match the type name defined in the CMS schema
   */
  readonly schemaType: string;

  /**
   * Optional list of available layouts for this content type
   */
  readonly layouts?: string[];

  /**
   * The feature that this content descriptor was registered by
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
  setSourceFeature(featureName: string): void {
    this._sourceFeature = featureName;
  }

  /**
   * Creates a new content descriptor
   */
  constructor({
    title,
    schemaType,
    layouts,
  }: {
    title: string;
    schemaType: string;
    layouts?: string[];
  }) {
    this.title = title;
    this.schemaType = schemaType;
    this.layouts = layouts;
  }
}
