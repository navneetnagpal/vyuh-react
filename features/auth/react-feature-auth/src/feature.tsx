import { FeatureDescriptor } from '@vyuh/react-core';
import { ContentExtensionDescriptor } from '@vyuh/react-extension-content';
import { UserCircle } from 'lucide-react';
import { EmailPasswordFormContentBuilder } from './content/email-password-form/email-password-form-builder';
import { ForgotPasswordFormContentBuilder } from './content/forgot-password-form/forgot-password-form-builder';
import { HintActionTextContentBuilder } from './content/hint-action-text/hint-action-text-builder';
import { OAuthSignInContentBuilder } from './content/oauth-signin/oauth-signin-builder';
import { PhoneOtpFormContentBuilder } from './content/phone-otp-form/phone-otp-form-builder';
import { ProfileCardContentBuilder } from './content/profile-card/profile-card-builder';

/**
 * Authentication feature descriptor
 * 
 * Provides components for building authentication flows:
 * - Email/Password login and registration
 * - Phone OTP verification
 * - OAuth sign-in options
 * - Password reset
 * - User profile display
 */
export const auth = new FeatureDescriptor({
  name: 'auth',
  title: 'Authentication',
  description: 'Authentication components for building login, registration, and profile pages',
  icon: <UserCircle />,
  extensions: [
    new ContentExtensionDescriptor({
      contentBuilders: [
        new EmailPasswordFormContentBuilder(),
        new ForgotPasswordFormContentBuilder(),
        new OAuthSignInContentBuilder(),
        new PhoneOtpFormContentBuilder(),
        new ProfileCardContentBuilder(),
        new HintActionTextContentBuilder(),
      ],
    }),
  ],
});
