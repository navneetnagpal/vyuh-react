import { Plugin } from '@/core/plugin';
import { User, LoginMethod, OAuthType } from './user';
import { Observable } from 'rxjs';

/**
 * Plugin for handling authentication in Vyuh applications
 */
export abstract class AuthPlugin extends Plugin {
  /**
   * The current authenticated user
   */
  abstract get currentUser(): User;

  /**
   * A stream of user changes
   */
  abstract get userChanges(): Observable<User>;

  /**
   * Initialize the plugin
   */
  abstract init(): Promise<void>;

  /**
   * Login anonymously
   */
  abstract loginAnonymously(): Promise<void>;

  /**
   * Send OTP to a phone number
   */
  abstract sendOtp(params: { phoneNumber: string }): Promise<void>;

  /**
   * Login with phone OTP
   */
  abstract loginWithPhoneOtp(params: {
    phoneNumber: string;
    otp: string;
  }): Promise<void>;

  /**
   * Login with email and password
   */
  abstract loginWithEmailPassword(params: {
    email: string;
    password: string;
  }): Promise<void>;

  /**
   * Register with email and password
   */
  abstract registerWithEmailPassword(params: {
    email: string;
    password: string;
  }): Promise<void>;

  /**
   * Send email link for authentication
   */
  abstract sendEmailLink(params: {
    email: string;
    clientId: string;
  }): Promise<void>;

  /**
   * Send password reset email
   */
  abstract sendPasswordResetEmail(params: { email: string }): Promise<void>;

  /**
   * Login with email link
   */
  abstract loginWithEmailLink(params: {
    email: string;
    link: string;
  }): Promise<void>;

  /**
   * Login with OAuth provider
   */
  abstract loginWithOAuth(type: OAuthType): Promise<void>;

  /**
   * Logout the current user
   */
  abstract logout(): Promise<void>;

  /**
   * Delete the current user account
   */
  abstract deleteAccount(): Promise<void>;
}
