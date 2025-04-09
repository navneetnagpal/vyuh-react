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
   * Whether to show error messages inline
   */
  readonly showLoginError?: boolean;

  /**
   * Action to invoke after signing in successfully
   */
  readonly action?: Action;

  /**
   * Action to invoke when user requests for OTP
   */
  readonly getOtpAction?: Action;

  /**
   * Action to invoke when user wants to sign up for a new account
   */
  readonly signupAction?: Action;
}
