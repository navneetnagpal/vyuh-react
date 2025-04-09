import { Action, ContentItem } from '@vyuh/react-core';

export const EMAIL_PASSWORD_FORM_SCHEMA_TYPE = 'auth.emailPasswordForm';

/**
 * Email/Password form content item for login and registration
 * 
 * This component provides a form for users to:
 * - Login with email and password
 * - Register with email and password
 * - Navigate to forgot password or other auth methods
 */
export interface EmailPasswordForm extends ContentItem {
  /**
   * The title displayed at the top of the form
   */
  readonly title: string;

  /**
   * Optional subtitle or description text
   */
  readonly description?: string;

  /**
   * Whether this form is for registration (true) or login (false)
   */
  readonly isRegistration: boolean;

  /**
   * The text to display on the submit button
   */
  readonly submitButtonText: string;

  /**
   * Whether to show the password visibility toggle
   */
  readonly showPasswordToggle?: boolean;

  /**
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to perform on successful form submission
   */
  readonly onSubmit?: Action;

  /**
   * Optional link to the alternate form (login/register)
   */
  readonly alternateFormLink?: {
    text: string;
    action?: Action;
  };

  /**
   * Optional link to the forgot password form
   */
  readonly forgotPasswordLink?: {
    text: string;
    action?: Action;
  };
}
