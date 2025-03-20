import { SchemaItem } from '@/content/schema-item';

/**
 * Type descriptor for a type in the Vyuh system.
 *
 * This class provides a way to describe a type and its constructor,
 * allowing for runtime type checking and instantiation.
 *
 * The type parameter T is covariant, meaning that a TypeDescriptor<Derived>
 * can be assigned to a TypeDescriptor<Base> if Derived extends Base.
 */
export class TypeDescriptor<out T extends SchemaItem> implements SchemaItem {
  /**
   * The schema type of the described type
   */
  readonly schemaType: string;

  /**
   * Constructor function for the described type
   */
  readonly fromJson: new (props?: any) => T;

  /**
   * The feature that registered this type descriptor
   */
  private _sourceFeature?: string;

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Creates a new type descriptor
   */
  constructor(schemaType: string, fromJson: new (props?: Partial<T>) => T) {
    this.schemaType = schemaType;
    this.fromJson = fromJson;
  }

  /**
   * Set the source feature
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;
  }
}
