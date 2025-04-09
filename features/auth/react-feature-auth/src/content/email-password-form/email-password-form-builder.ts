import { ContentBuilder } from '@vyuh/react-extension-content';
import { EmailPasswordForm, EMAIL_PASSWORD_FORM_SCHEMA_TYPE } from './email-password-form';
import { DefaultEmailPasswordFormLayout } from './default-email-password-form-layout';

/**
 * Content builder for the Email/Password form
 */
export class EmailPasswordFormContentBuilder extends ContentBuilder<EmailPasswordForm> {
  constructor() {
    super({
      schemaType: EMAIL_PASSWORD_FORM_SCHEMA_TYPE,
      defaultLayout: new DefaultEmailPasswordFormLayout(),
      defaultLayoutDescriptor: DefaultEmailPasswordFormLayout.typeDescriptor,
    });
  }
}
