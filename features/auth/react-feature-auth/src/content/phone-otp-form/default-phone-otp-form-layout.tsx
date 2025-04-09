import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
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
      if (content.onSuccess) {
        plugins.content.executeAction(content.onSuccess);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">{content.title}</h2>
      {content.description && (
        <p className="text-gray-600 mb-6 text-center">{content.description}</p>
      )}

      {error && content.showLoginError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : content.sendOtpButtonText}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the code sent to your phone"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : content.verifyOtpButtonText}
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="text-blue-500 hover:text-blue-700"
            >
              Change phone number
            </button>
          </div>
        </form>
      )}

      {content.alternateAuthLink && (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              if (content.alternateAuthLink?.action) {
                plugins.content.executeAction(content.alternateAuthLink.action);
              }
            }}
          >
            {content.alternateAuthLink.text}
          </button>
        </div>
      )}
    </div>
  );
  }
}
