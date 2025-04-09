import { ContentDescriptor } from '@vyuh/react-extension-content';
import { EMAIL_PASSWORD_FORM_SCHEMA_TYPE } from './email-password-form';

/**
 * Descriptor for the Email/Password form content item
 */
export class EmailPasswordFormDescriptor extends ContentDescriptor {
  static readonly schemaType = EMAIL_PASSWORD_FORM_SCHEMA_TYPE;

  constructor(props?: Partial<EmailPasswordFormDescriptor>) {
    super({
      schemaType: EmailPasswordFormDescriptor.schemaType,
      title: 'Email Password Form',
      layouts: props?.layouts,
    });
  }
}
