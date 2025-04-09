import { Action, ContentItem, OAuthType } from '@vyuh/react-core';

export const OAUTH_SIGNIN_SCHEMA_TYPE = 'auth.oauthSignIn';

/**
 * OAuth sign-in options for authentication
 */
export interface OAuthSignIn extends ContentItem {
  /**
   * The title displayed at the top of the component
   */
  readonly title?: string;

  /**
   * Optional subtitle or description text
   */
  readonly description?: string;

  /**
   * List of OAuth providers to display
   */
  readonly providers: Array<{
    type: OAuthType;
    label?: string;
    icon?: string;
    customIcon?: string;
  }>;

  /**
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to perform on successful authentication
   */
  readonly onSuccess?: Action;

  /**
   * Optional divider text (e.g., "OR")
   */
  readonly dividerText?: string;
}
