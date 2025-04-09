import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React, { useState } from 'react';
import { ForgotPasswordForm, FORGOT_PASSWORD_FORM_SCHEMA_TYPE } from './forgot-password-form';

/**
 * Default layout for the Forgot Password form
 */
export class DefaultForgotPasswordFormLayout extends LayoutConfiguration<ForgotPasswordForm> {
  static readonly schemaName = `${FORGOT_PASSWORD_FORM_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultForgotPasswordFormLayout.schemaName,
      title: 'Default Forgot Password Form Layout',
    });
  }

  render(content: ForgotPasswordForm): React.ReactNode {
  const { plugins } = useVyuh();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await plugins.auth.sendPasswordResetEmail({
        email,
      });

      setSuccess(true);

      // If action is provided, execute it
      if (content.onSubmit) {
        plugins.content.executeAction(content.onSubmit);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
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

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Password reset email sent. Please check your inbox.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {content.submitButtonText}
        </button>
      </form>

      {content.backToLoginLink && (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              if (content.backToLoginLink?.action) {
                plugins.content.executeAction(content.backToLoginLink.action);
              }
            }}
          >
            {content.backToLoginLink.text}
          </button>
        </div>
      )}
    </div>
  );
  }
}
