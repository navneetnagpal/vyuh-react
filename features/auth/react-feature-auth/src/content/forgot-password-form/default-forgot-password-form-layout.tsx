import { executeAction, LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
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
      if (content.action) {
        executeAction(content.action);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    }
  };

  return (
    <div className="card w-full max-w-md mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl justify-center">Forgot Password</h2>
        <p className="text-center opacity-70 mb-4">
          Enter your email to receive a password reset link
        </p>

        {error && content.showLoginError && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Password reset email sent. Please check your inbox.</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Reset Password
          </button>
        </form>

        {content.returnAction && (
          <div className="divider"></div>
        )}

        {content.returnAction && (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                executeAction(content.returnAction!);
              }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
  }
}
