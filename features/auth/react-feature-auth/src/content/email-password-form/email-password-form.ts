import { Action, ContentItem } from '@vyuh/react-core';

export const EMAIL_PASSWORD_FORM_SCHEMA_TYPE = 'auth.emailPasswordForm';

/**
 * Auth action type for email/password form
 */
export enum AuthActionType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

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
   * The type of authentication action to perform
   */
  readonly actionType: AuthActionType;

  /**
   * Whether to show the password visibility toggle
   */
  readonly showPasswordVisibilityToggle?: boolean;

  /**
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to invoke after signing in or after registering a new user
   */
  readonly action?: Action;

  /**
   * Action to invoke when user requests to reset their password
   * Only applicable when actionType is SignIn
   */
  readonly forgotPasswordAction?: Action;

  /**
   * Action to invoke when user wants to sign up for a new account
   * Only applicable when actionType is SignIn
   */
  readonly signupAction?: Action;

  /**
   * Action to invoke when user wants to login to an existing account
   * Only applicable when actionType is SignUp
   */
  readonly loginAction?: Action;
}
