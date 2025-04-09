import { ContentDescriptor } from '@vyuh/react-extension-content';
import { FORGOT_PASSWORD_FORM_SCHEMA_TYPE } from './forgot-password-form';

/**
 * Descriptor for the Forgot Password form content item
 */
export class ForgotPasswordFormDescriptor extends ContentDescriptor {
  static readonly schemaType = FORGOT_PASSWORD_FORM_SCHEMA_TYPE;

  constructor(props?: Partial<ForgotPasswordFormDescriptor>) {
    super({
      schemaType: ForgotPasswordFormDescriptor.schemaType,
      title: 'Forgot Password Form',
      layouts: props?.layouts,
    });
  }
}
