import { AuthPlugin } from './auth-plugin';
import { User, LoginMethod, OAuthType, oauthTypeToLoginMethod } from './user';
import { Subject, Observable } from 'rxjs';

/**
 * Default implementation of AuthPlugin that provides basic authentication functionality
 */
export class DefaultAuthPlugin extends AuthPlugin {
  private _currentUser: User = User.unknown;
  private _userChangesSubject: Subject<User> = new Subject<User>();
  private _initialized = false;

  /**
   * Creates a new DefaultAuthPlugin
   */
  constructor() {
    super('vyuh.plugin.auth.default', 'Default Auth Plugin');
  }

  /**
   * The current authenticated user
   */
  get currentUser(): User {
    return this._currentUser;
  }

  /**
   * A stream of user changes
   */
  get userChanges(): Observable<User> {
    if (!this._initialized) {
      throw new Error(
        'AuthPlugin is not yet initialized. Call init() before accessing userChanges.',
      );
    }
    return this._userChangesSubject.asObservable();
  }

  /**
   * Set the current user and notify listeners
   */
  protected setCurrentUser(user: User): void {
    this._currentUser = user;
    this._userChangesSubject.next(user);
  }

  /**
   * Initialize the plugin
   */
  async init(): Promise<void> {
    if (this._initialized) {
      return;
    }

    this._userChangesSubject = new Subject<User>();
    this._initialized = true;
  }

  /**
   * Clean up resources
   */
  async dispose(): Promise<void> {
    this._initialized = false;
    this._userChangesSubject.complete();
  }

  /**
   * Login anonymously
   */
  async loginAnonymously(): Promise<void> {
    await this.simulateNetworkDelay();

    this.setCurrentUser(
      new User({
        id: 'anonymous-user',
        name: 'Anonymous User',
        loginMethod: LoginMethod.anonymous,
      }),
    );
  }

  /**
   * Send OTP to a phone number
   */
  async sendOtp({ phoneNumber }: { phoneNumber: string }): Promise<void> {
    await this.simulateNetworkDelay();
    console.log(`OTP sent to ${phoneNumber}`);
  }

  /**
   * Login with phone OTP
   */
  async loginWithPhoneOtp({
    phoneNumber,
    otp,
  }: {
    phoneNumber: string;
    otp: string;
  }): Promise<void> {
    await this.simulateNetworkDelay();

    this.setCurrentUser(
      new User({
        id: 'phone-user',
        phoneNumber,
        loginMethod: LoginMethod.phoneOtp,
      }),
    );
  }

  /**
   * Login with email and password
   */
  async loginWithEmailPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    await this.simulateNetworkDelay();

    this.setCurrentUser(
      new User({
        id: 'email-user',
        email,
        name: email.split('@')[0],
        loginMethod: LoginMethod.emailPassword,
      }),
    );
  }

  /**
   * Register with email and password
   */
  async registerWithEmailPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    await this.simulateNetworkDelay();

    this.setCurrentUser(
      new User({
        id: 'email-user',
        email,
        name: email.split('@')[0],
        loginMethod: LoginMethod.emailPassword,
        creationTime: new Date(),
      }),
    );
  }

  /**
   * Send email link for authentication
   */
  async sendEmailLink({
    email,
    clientId,
  }: {
    email: string;
    clientId: string;
  }): Promise<void> {
    await this.simulateNetworkDelay();
    console.log(`Email link sent to ${email} for client ${clientId}`);
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail({ email }: { email: string }): Promise<void> {
    await this.simulateNetworkDelay();
    console.log(`Password reset email sent to ${email}`);
  }

  /**
   * Login with email link
   */
  async loginWithEmailLink({
    email,
    link,
  }: {
    email: string;
    link: string;
  }): Promise<void> {
    await this.simulateNetworkDelay();

    this.setCurrentUser(
      new User({
        id: 'email-link-user',
        email,
        name: email.split('@')[0],
        loginMethod: LoginMethod.emailLink,
      }),
    );
  }

  /**
   * Login with OAuth provider
   */
  async loginWithOAuth(type: OAuthType): Promise<void> {
    await this.simulateNetworkDelay();

    this.setCurrentUser(
      new User({
        id: `${type}-user`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} User`,
        loginMethod: oauthTypeToLoginMethod(type),
      }),
    );
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    await this.simulateNetworkDelay();
    this.setCurrentUser(User.unknown);
  }

  /**
   * Delete the current user account
   */
  async deleteAccount(): Promise<void> {
    await this.simulateNetworkDelay();
    this.setCurrentUser(User.unknown);
  }

  /**
   * Helper to simulate network delay
   */
  private async simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
