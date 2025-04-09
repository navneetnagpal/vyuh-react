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
   * The title displayed at the top of the form
   */
  readonly title: string;

  /**
   * Optional subtitle or description text
   */
  readonly description?: string;

  /**
   * The text to display on the submit button
   */
  readonly submitButtonText: string;

  /**
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to perform on successful form submission
   */
  readonly onSubmit?: Action;

  /**
   * Optional link back to the login form
   */
  readonly backToLoginLink?: {
    text: string;
    action?: Action;
  };
}
