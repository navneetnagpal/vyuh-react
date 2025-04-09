import {
  executeAction,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import React, { useState } from 'react';
import { PhoneOtpForm, PHONE_OTP_FORM_SCHEMA_TYPE } from './phone-otp-form';

/**
 * Default layout for the Phone OTP form
 */
export class DefaultPhoneOtpFormLayout extends LayoutConfiguration<PhoneOtpForm> {
  static readonly schemaName = `${PHONE_OTP_FORM_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultPhoneOtpFormLayout.schemaName,
      title: 'Default Phone OTP Form Layout',
    });
  }

  render(content: PhoneOtpForm): React.ReactNode {
    const { plugins } = useVyuh();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        await plugins.auth.sendOtp({
          phoneNumber,
        });
        setOtpSent(true);

        // Execute getOtpAction if provided
        if (content.getOtpAction) {
          executeAction(content.getOtpAction);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send OTP');
      } finally {
        setLoading(false);
      }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        await plugins.auth.loginWithPhoneOtp({
          phoneNumber,
          otp,
        });

        // If action is provided, execute it
        if (content.action) {
          executeAction(content.action);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid OTP');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="card w-full max-w-md mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">Phone Verification</h2>
          <p className="text-center opacity-70 mb-4">
            Verify your phone number with a one-time code
          </p>

          {error && content.showLoginError && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Verification Code</span>
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter the code sent to your phone"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="btn btn-link"
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}

          {content.signupAction && (
            <div className="divider">OR</div>
          )}

          {content.signupAction && (
            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  executeAction(content.signupAction!);
                }}
              >
                Don't have an account? Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
