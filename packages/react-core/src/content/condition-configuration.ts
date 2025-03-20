import { SchemaItem } from '@/content/schema-item';

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
   * Evaluates this condition configuration.
   *
   * Returns:
   * - null if the condition passes
   * - an error message string if the condition fails
   */
  abstract execute(
    params?: Record<string, any>,
  ): Promise<string | null | undefined>;
}
