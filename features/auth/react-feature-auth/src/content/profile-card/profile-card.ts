import { Action, ContentItem } from '@vyuh/react-core';

export const PROFILE_CARD_SCHEMA_TYPE = 'auth.profileCard';

/**
 * Profile card content item for displaying user information
 * 
 * This component provides a card to:
 * - Display user profile information
 * - Allow users to sign out
 * - Navigate to profile settings
 */
export interface ProfileCard extends ContentItem {
  /**
   * The title displayed at the top of the card
   */
  readonly title?: string;

  /**
   * Whether to show the user's avatar
   */
  readonly showAvatar?: boolean;

  /**
   * Whether to show the user's email
   */
  readonly showEmail?: boolean;

  /**
   * Whether to show the user's phone number
   */
  readonly showPhone?: boolean;

  /**
   * Whether to show when the user last signed in
   */
  readonly showLastSignIn?: boolean;

  /**
   * The text to display on the sign out button
   */
  readonly signOutButtonText: string;

  /**
   * Action to perform after signing out
   */
  readonly onSignOut?: Action;

  /**
   * Optional link to profile settings
   */
  readonly profileSettingsLink?: {
    text: string;
    action?: Action;
  };
}
