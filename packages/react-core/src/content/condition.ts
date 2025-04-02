import { ConditionConfiguration } from '@/content/condition-configuration';
import { useVyuhStore } from '@/hooks/use-vyuh';

/**
 * A conditional expression that can be evaluated at runtime.
 *
 * Conditions are used to make dynamic decisions in the application based
 * on the current state or user input. They can be used for:
 * - Navigation guards
 * - Content visibility
 * - Feature flags
 * - A/B testing
 *
 * Example usage:
 * ```typescript
 * const condition: Condition = {
 *   configuration: new UserRoleCondition({
 *     allowedRoles: ['admin', 'editor'],
 *   }),
 * };
 *
 * // Evaluate the condition
 * const result = await executeCondition(condition);
 * if (result === null) {
 *   // Condition passed
 * } else {
 *   // Condition failed with error message
 *   console.log('Access denied:', result);
 * }
 * ```
 */
export interface Condition {
  /**
   * The configuration that defines the condition's logic.
   *
   * Only one configuration is allowed per condition. The configuration
   * determines how the condition is evaluated.
   */
  readonly configuration?: ConditionConfiguration;
}

/**
 * Implementation of the Condition interface.
 * This class is used internally by the executeCondition function.
 */
class ConditionImpl implements Condition {
  /**
   * The configuration that defines the condition's logic.
   */
  readonly configuration?: ConditionConfiguration;

  /**
   * Creates a new condition with the given configuration.
   */
  constructor(data?: Partial<Condition>) {
    const { content } = useVyuhStore.getState().plugins;

    const config = Array.isArray(data?.configuration)
      ? data?.configuration[0]
      : data?.configuration;
    const schemaType = config ? content.provider.schemaType(config) : undefined;

    const TD = content.getItem(ConditionConfiguration, schemaType);
    this.configuration = TD ? new TD.fromJson(config) : undefined;
  }

  /**
   * Executes the condition with the given parameters.
   *
   * @param params Optional parameters for the condition
   * @returns A promise that resolves to the condition result
   */
  async execute(
    params?: Record<string, any>,
  ): Promise<string | null | undefined> {
    return this.configuration?.execute(params);
  }
}

/**
 * Executes a condition with the given parameters.
 *
 * @param condition The condition to execute (optional)
 * @param params Optional parameters for the condition
 * @returns A promise that resolves to the condition result
 */
export async function executeCondition(
  condition?: Condition,
  params?: Record<string, any>,
): Promise<string | null | undefined> {
  if (!condition) return undefined;

  const conditionImpl = new ConditionImpl(condition);
  return conditionImpl.execute(params);
}
