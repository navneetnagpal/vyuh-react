import { Action, ContentItem } from '@vyuh/react-core';

export const HINT_ACTION_TEXT_SCHEMA_TYPE = 'auth.hintActionText';

/**
 * Hint Action Text content item for authentication flows
 * 
 * This component provides a simple text with an action link, useful for:
 * - "Don't have an account? Sign up"
 * - "Already have an account? Sign in"
 * - "Forgot your password?"
 */
export interface HintActionText extends ContentItem {
  /**
   * The hint text to display
   */
  readonly hintText: string;

  /**
   * The action text that will be clickable
   */
  readonly actionText: string;

  /**
   * Action to perform when the action text is clicked
   */
  readonly action?: Action;
}
