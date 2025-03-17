import { SchemaItem } from '@/core/content/schema-item';

/**
 * Base class for all condition configurations.
 *
 * Condition configurations define the evaluation logic for a condition.
 * Each type of configuration extends this class and provides its own
 * execution logic.
 */
export abstract class ConditionConfiguration implements SchemaItem {
  /**
   * The schema type of this configuration.
   *
   * Must match the type name defined in the CMS schema.
   */
  readonly schemaType: string;

  /**
   * Optional title for this configuration.
   *
   * Used for debugging and UI display purposes.
   */
  readonly title?: string;

  /**
   * The feature that registered this condition configuration
   */
  private _sourceFeature?: string;

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Creates a new condition configuration.
   */
  protected constructor({
    schemaType,
    title,
  }: {
    schemaType: string;
    title?: string;
  }) {
    this.schemaType = schemaType;
    this.title = title;
  }

  /**
   * Set the source feature
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;
  }

  /**
   * Evaluates this condition configuration.
   *
   * Returns:
   * - null if the condition passes
   * - an error message string if the condition fails
   */
  abstract execute(context: any): Promise<string | null> | string | null;

  /**
   * Creates a condition from a JSON object.
   */
  static fromJson(json: Record<string, any>): ConditionConfiguration {
    throw new Error(
      'Method not implemented. Each subclass must implement fromJson.',
    );
  }
}
