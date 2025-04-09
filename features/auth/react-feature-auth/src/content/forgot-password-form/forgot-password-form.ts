import { Action, ContentItem } from '@vyuh/react-core';

export const FORGOT_PASSWORD_FORM_SCHEMA_TYPE = 'auth.forgotPasswordForm';

/**
 * Forgot Password form content item
 *
 * This component provides a form for users to:
 * - Request a password reset email
 * - Navigate back to login
 */
export interface ForgotPasswordForm extends ContentItem {
  /**
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to invoke after a successful password reset
   */
  readonly action?: Action;

  /**
   * Action to invoke if the user wants to return back
   */
  readonly returnAction?: Action;
}
