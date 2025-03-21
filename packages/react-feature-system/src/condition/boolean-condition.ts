import { ConditionConfiguration, TypeDescriptor } from '@vyuh/react-core';

/**
 * A simple boolean condition that returns a fixed value.
 *
 * This condition can be used for:
 * - Feature flags
 * - Testing conditional routes
 * - Temporarily enabling/disabling features
 * - Simulating network delays with the evaluationDelayInSeconds property
 *
 * Example:
 * ```typescript
 * const condition = new Condition({
 *   configuration: new BooleanCondition({
 *     value: true,
 *     evaluationDelayInSeconds: 2 // 2 second delay
 *   }),
 * });
 * ```
 */
export class BooleanCondition extends ConditionConfiguration {
  static readonly schemaType = 'vyuh.condition.boolean';

  /**
   * The boolean value this condition will return
   */
  readonly value: boolean;

  /**
   * Optional delay in seconds before returning the result
   * Useful for testing loading states
   */
  readonly evaluationDelayInSeconds?: number;

  /**
   * Type descriptor for the boolean condition
   */
  static readonly typeDescriptor = new TypeDescriptor(this.schemaType, this);

  /**
   * Creates a new boolean condition
   */
  constructor(data?: Partial<BooleanCondition>) {
    super({
      schemaType: BooleanCondition.schemaType,
      title: 'Boolean Condition',
    });

    this.value = data?.value ?? false;
    this.evaluationDelayInSeconds = data?.evaluationDelayInSeconds;
  }

  /**
   * Executes the condition and returns the result
   *
   * @param params Optional parameters for condition evaluation
   * @returns null if the condition is true (passes), or an error message if false
   */
  async execute(params?: Record<string, any>): Promise<string | null> {
    // Simulate network delay if specified (convert seconds to milliseconds)
    if (this.evaluationDelayInSeconds && this.evaluationDelayInSeconds > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.evaluationDelayInSeconds! * 1000),
      );
    }

    return `${this.value}`;
  }
}
