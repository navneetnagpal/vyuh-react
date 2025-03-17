/**
 * Base abstract class for all extension descriptors in the Vyuh system.
 *
 * Extensions are modular components that add functionality to the Vyuh framework.
 * This class should not be instantiated directly - use a specific extension type.
 */
export abstract class ExtensionDescriptor {
  /**
   * The type of the extension
   */
  readonly type: string;

  /**
   * The feature that registered this extension
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
   * Creates a new extension descriptor
   * @protected - Constructor should only be called by subclasses
   */
  protected constructor({ type }: { type: string }) {
    this.type = type;
  }
}
