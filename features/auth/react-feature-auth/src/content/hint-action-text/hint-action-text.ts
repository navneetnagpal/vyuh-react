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
/**
 * Text alignment options
 */
export enum TextAlignment {
  Start = 'start',
  Center = 'center',
  End = 'end'
}

export interface HintActionText extends ContentItem {
  /**
   * Hint to be displayed to the user. Generally a question.
   */
  readonly hint: string;

  /**
   * Action to be performed if the hint is requested.
   */
  readonly action?: Action;

  /**
   * Alignment of the hint and the action within a given space.
   */
  readonly alignment?: TextAlignment;
}
