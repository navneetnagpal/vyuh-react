import { SchemaItem } from '@/core/content/schema-item';

/**
 * Base class for all action configurations.
 *
 * Action configurations define the behavior of an action. Each type of
 * configuration extends this class and provides its own execution
 * logic.
 */
export abstract class ActionConfiguration implements SchemaItem {
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
   * Whether to await this configuration's execution.
   *
   * If true, the action will wait for this configuration to complete
   * before executing the next one. Defaults to false.
   */
  readonly isAwaited?: boolean;

  /**
   * The feature that registered this action configuration
   */
  private _sourceFeature?: string;

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Creates a new action configuration.
   */
  protected constructor({
    schemaType,
    title,
    isAwaited = false,
  }: {
    schemaType: string;
    title?: string;
    isAwaited?: boolean;
  }) {
    this.schemaType = schemaType;
    this.title = title;
    this.isAwaited = isAwaited;
  }

  /**
   * Set the source feature
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;
  }

  /**
   * Executes this configuration.
   *
   * The optional arguments object contains parameters for the execution.
   */
  abstract execute(
    context: any,
    params?: Record<string, any>,
  ): Promise<void> | void;
}
