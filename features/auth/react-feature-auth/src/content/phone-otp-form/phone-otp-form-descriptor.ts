import { ContentDescriptor } from '@vyuh/react-extension-content';
import { PHONE_OTP_FORM_SCHEMA_TYPE } from './phone-otp-form';

/**
 * Descriptor for the Phone OTP form content item
 */
export class PhoneOtpFormDescriptor extends ContentDescriptor {
  static readonly schemaType = PHONE_OTP_FORM_SCHEMA_TYPE;

  constructor(props?: Partial<PhoneOtpFormDescriptor>) {
    super({
      schemaType: PhoneOtpFormDescriptor.schemaType,
      title: 'Phone OTP Form',
      layouts: props?.layouts,
    });
  }
}
