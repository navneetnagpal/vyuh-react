import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React, { useState } from 'react';
import { EmailPasswordForm, EMAIL_PASSWORD_FORM_SCHEMA_TYPE } from './email-password-form';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Default layout for the Email/Password form
 */
export class DefaultEmailPasswordFormLayout extends LayoutConfiguration<EmailPasswordForm> {
  static readonly schemaName = `${EMAIL_PASSWORD_FORM_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultEmailPasswordFormLayout.schemaName,
      title: 'Default Email Password Form Layout',
    });
  }

  render(content: EmailPasswordForm): React.ReactNode {
  const { plugins } = useVyuh();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (content.isRegistration) {
        await plugins.auth.registerWithEmailPassword({
          email,
          password,
        });
      } else {
        await plugins.auth.loginWithEmailPassword({
          email,
          password,
        });
      }

      // If action is provided, execute it
      if (content.onSubmit) {
        plugins.content.executeAction(content.onSubmit);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
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

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {content.showPasswordToggle && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
        </div>

        {content.forgotPasswordLink && (
          <div className="mb-4 text-right">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 text-sm"
              onClick={() => {
                if (content.forgotPasswordLink?.action) {
                  plugins.content.executeAction(content.forgotPasswordLink.action);
                }
              }}
            >
              {content.forgotPasswordLink.text}
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {content.submitButtonText}
        </button>
      </form>

      {content.alternateFormLink && (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              if (content.alternateFormLink?.action) {
                plugins.content.executeAction(content.alternateFormLink.action);
              }
            }}
          >
            {content.alternateFormLink.text}
          </button>
        </div>
      )}
    </div>
  );
  }
}
