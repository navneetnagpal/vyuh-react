import { ContentBuilder } from '@vyuh/react-extension-content';
import { ForgotPasswordForm, FORGOT_PASSWORD_FORM_SCHEMA_TYPE } from './forgot-password-form';
import { DefaultForgotPasswordFormLayout } from './default-forgot-password-form-layout';

/**
 * Content builder for the Forgot Password form
 */
export class ForgotPasswordFormContentBuilder extends ContentBuilder<ForgotPasswordForm> {
  constructor() {
    super({
      schemaType: FORGOT_PASSWORD_FORM_SCHEMA_TYPE,
      defaultLayout: new DefaultForgotPasswordFormLayout(),
      defaultLayoutDescriptor: DefaultForgotPasswordFormLayout.typeDescriptor,
    });
  }
}
