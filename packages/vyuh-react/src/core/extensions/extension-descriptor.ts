/**
 * Base class for extension descriptors.
 * Extensions allow features to extend the functionality of other features.
 */
export class ExtensionDescriptor {
  /**
   * The type of extension
   */
  readonly type: string;

  /**
   * The feature that this extension descriptor was registered by
   */
  private _sourceFeature?: string;

  /**
   * Creates a new extension descriptor
   */
  constructor({ type }: { type: string }) {
    this.type = type;
  }

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Set the source feature for this extension descriptor
   * This is called by the FeatureDescriptor when the extension is registered
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;
  }
}