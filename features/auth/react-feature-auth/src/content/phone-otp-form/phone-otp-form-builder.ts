import { ContentBuilder } from '@vyuh/react-extension-content';
import { PhoneOtpForm, PHONE_OTP_FORM_SCHEMA_TYPE } from './phone-otp-form';
import { DefaultPhoneOtpFormLayout } from './default-phone-otp-form-layout';

/**
 * Content builder for the Phone OTP form
 */
export class PhoneOtpFormContentBuilder extends ContentBuilder<PhoneOtpForm> {
  constructor() {
    super({
      schemaType: PHONE_OTP_FORM_SCHEMA_TYPE,
      defaultLayout: new DefaultPhoneOtpFormLayout(),
      defaultLayoutDescriptor: DefaultPhoneOtpFormLayout.typeDescriptor,
    });
  }
}
