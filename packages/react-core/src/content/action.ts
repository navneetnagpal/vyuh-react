import { ActionConfiguration } from '@/content/action-configuration';
import { useVyuhStore } from '@/hooks/use-vyuh';

/**
 * An action that can be executed at runtime.
 *
 * Actions are used to perform operations in response to user interactions
 * or system events. They can be used for:
 * - Navigation
 * - Form submissions
 * - API calls
 * - UI state changes
 *
 * Example usage:
 * ```typescript
 * const action = new Action({
 *   configurations: [
 *     new NavigateAction({
 *       path: '/dashboard',
 *     }),
 *     new TrackEventAction({
 *       eventName: 'navigation',
 *       properties: { destination: 'dashboard' }
 *     })
 *   ],
 * });
 *
 * // Execute the action
 * await action.execute();
 * ```
 */
export class Action {
  /**
   * Optional title for the action.
   */
  readonly title?: string;

  /**
   * The configurations that define the action's logic.
   *
   * Multiple configurations can be provided to execute a series of operations
   * when the action is triggered.
   */
  readonly configurations: ActionConfiguration[];

  /**
   * Creates a new action with the given configurations.
   */
  constructor(data?: Partial<Action>) {
    const { content } = useVyuhStore.getState().plugins;
    this.configurations = [];

    // Handle array of configurations
    const configsArray = Array.isArray(data?.configurations)
      ? data?.configurations
      : [];

    for (const config of configsArray) {
      const schemaType = content.provider.schemaType(config);
      const TD = content.getItem(ActionConfiguration, schemaType);

      if (TD) {
        this.configurations.push(new TD.fromJson(config));
      }
    }
  }

  /**
   * Executes all configurations in this action with the given parameters.
   *
   * @param params Optional parameters for the action
   */
  async execute(params?: Record<string, any>): Promise<void> {
    if (this.configurations.length === 0) {
      return;
    }

    for (const config of this.configurations) {
      if (config.isAwaited) {
        // Collect awaited configurations to run in parallel
        await config.execute(params);
      } else {
        // Fire and forget for non-awaited configurations
        config.execute(params);
      }
    }
  }
}
