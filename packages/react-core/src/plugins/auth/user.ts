/**
 * Represents the method used to login
 */
export enum LoginMethod {
  unknown = 'unknown',
  anonymous = 'anonymous',
  emailPassword = 'emailPassword',
  phoneOtp = 'phoneOtp',
  emailLink = 'emailLink',
  google = 'google',
  facebook = 'facebook',
  apple = 'apple',
  twitter = 'twitter',
  github = 'github',
  linkedin = 'linkedin',
  microsoft = 'microsoft',
  custom = 'custom',
}

/**
 * Represents a user of the application
 */
export class User {
  /**
   * The unique identifier of the user
   */
  readonly id: string;

  /**
   * The name of the user
   */
  readonly name?: string;

  /**
   * The email of the user
   */
  readonly email?: string;

  /**
   * The phone number of the user
   */
  readonly phoneNumber?: string;

  /**
   * The URL of the user's photo
   */
  readonly photoUrl?: string;

  /**
   * The method used to login
   */
  readonly loginMethod: LoginMethod;

  /**
   * The last sign-in time of the user
   */
  readonly lastSignInTime?: Date;

  /**
   * The creation time of the user
   */
  readonly creationTime?: Date;

  /**
   * Create a new user
   */
  constructor(params: {
    id: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    photoUrl?: string;
    loginMethod: LoginMethod;
    lastSignInTime?: Date;
    creationTime?: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.phoneNumber = params.phoneNumber;
    this.photoUrl = params.photoUrl;
    this.loginMethod = params.loginMethod;
    this.lastSignInTime = params.lastSignInTime;
    this.creationTime = params.creationTime;
  }

  /**
   * Returns true if this user is the unknown user
   */
  get isUnknown(): boolean {
    return this === User.unknown;
  }

  /**
   * A constant unknown user
   */
  static readonly unknown = new User({
    id: 'unknown',
    name: 'Unknown User',
    loginMethod: LoginMethod.unknown,
  });
}

/**
 * OAuth provider types
 */
export enum OAuthType {
  google = 'google',
  apple = 'apple',
  meta = 'meta',
  github = 'github',
  twitter = 'twitter',
  linkedin = 'linkedin',
  microsoft = 'microsoft',
  custom = 'custom',
}

/**
 * Maps OAuth types to login methods
 */
export function oauthTypeToLoginMethod(type: OAuthType): LoginMethod {
  switch (type) {
    case OAuthType.google:
      return LoginMethod.google;
    case OAuthType.apple:
      return LoginMethod.apple;
    case OAuthType.meta:
      return LoginMethod.facebook;
    case OAuthType.github:
      return LoginMethod.github;
    case OAuthType.twitter:
      return LoginMethod.twitter;
    case OAuthType.linkedin:
      return LoginMethod.linkedin;
    case OAuthType.microsoft:
      return LoginMethod.microsoft;
    case OAuthType.custom:
      return LoginMethod.custom;
  }
}
