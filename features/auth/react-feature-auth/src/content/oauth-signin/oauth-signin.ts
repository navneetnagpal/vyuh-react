import { Action, ContentItem, OAuthType } from '@vyuh/react-core';

export const OAUTH_SIGNIN_SCHEMA_TYPE = 'auth.oauthSignIn';

/**
 * OAuth sign-in options for authentication
 */
export interface OAuthSignIn extends ContentItem {
  /**
   * List of OAuth authentication types to display
   */
  readonly authTypes: string[];

  /**
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to invoke after a successful sign in
   */
  readonly action?: Action;
}
