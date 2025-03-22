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
 * const condition = new Condition({
 *   configuration: new UserRoleCondition({
 *     allowedRoles: ['admin', 'editor'],
 *   }),
 * });
 *
 * // Evaluate the condition
 * const result = await condition.configuration?.execute(context);
 * if (result === null) {
 *   // Condition passed
 * } else {
 *   // Condition failed with error message
 *   console.log('Access denied:', result);
 * }
 * ```
 */
export class Condition {
  /**
   * The configuration that defines the condition's logic.
   *
   * Only one configuration is allowed per condition. The configuration
   * determines how the condition is evaluated.
   */
  readonly configuration?: ConditionConfiguration;

  /**
   * Creates a new condition with the given configuration.
   */
  constructor(data?: Partial<Condition>) {
    const { content } = useVyuhStore.getState().plugins;

    const config = Array.isArray(data?.configuration)
      ? data?.configuration[0]
      : undefined;
    const schemaType = config ? content.provider.schemaType(config) : undefined;

    const TD = content.getItem(ConditionConfiguration, schemaType);
    this.configuration = TD ? new TD.fromJson(config) : undefined;
  }

  async execute(
    params?: Record<string, any>,
  ): Promise<string | null | undefined> {
    return this.configuration?.execute(params);
  }
}
