import { ExtensionDescriptor } from './extension-descriptor';

/**
 * Base class for extension builders.
 * Extension builders create extensions dynamically at runtime.
 */
export abstract class ExtensionBuilder {
  /**
   * The type of extension this builder creates
   */
  readonly type: string;

  /**
   * The feature that this extension builder was registered by
   */
  private _sourceFeature?: string;

  /**
   * Creates a new extension builder
   */
  protected constructor({ type }: { type: string }) {
    this.type = type;
  }

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Set the source feature for this extension builder
   * This is called by the FeatureDescriptor when the builder is registered
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;
  }

  /**
   * Build an extension descriptor
   * This method should be implemented by subclasses
   */
  abstract build(descriptors: ExtensionDescriptor[]): void;
}
