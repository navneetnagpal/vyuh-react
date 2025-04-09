import { Action, ContentItem } from '@vyuh/react-core';

export const PHONE_OTP_FORM_SCHEMA_TYPE = 'auth.phoneOtpForm';

/**
 * Phone OTP form content item for authentication
 * 
 * This component provides a form for users to:
 * - Enter their phone number
 * - Receive an OTP (One-Time Password)
 * - Verify the OTP to authenticate
 */
export interface PhoneOtpForm extends ContentItem {
  /**
   * The title displayed at the top of the form
   */
  readonly title: string;

  /**
   * Optional subtitle or description text
   */
  readonly description?: string;

  /**
   * The text to display on the send OTP button
   */
  readonly sendOtpButtonText: string;

  /**
   * The text to display on the verify OTP button
   */
  readonly verifyOtpButtonText: string;

  /**
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to perform on successful authentication
   */
  readonly onSuccess?: Action;

  /**
   * Optional link to an alternate authentication method
   */
  readonly alternateAuthLink?: {
    text: string;
    action?: Action;
  };
}
