import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React, { useState } from 'react';
import { OAuthSignIn, OAUTH_SIGNIN_SCHEMA_TYPE } from './oauth-signin';

/**
 * Default layout for the OAuth Sign-in component
 */
export class DefaultOAuthSignInLayout extends LayoutConfiguration<OAuthSignIn> {
  static readonly schemaName = `${OAUTH_SIGNIN_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultOAuthSignInLayout.schemaName,
      title: 'Default OAuth Sign-in Layout',
    });
  }

  render(content: OAuthSignIn): React.ReactNode {
  const { plugins } = useVyuh();
  const [error, setError] = useState<string | null>(null);

  const handleOAuthLogin = async (type: string) => {
    setError(null);

    try {
      await plugins.auth.loginWithOAuth(type as any);

      // If action is provided, execute it
      if (content.onSuccess) {
        plugins.content.executeAction(content.onSuccess);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  // Map of provider types to their respective button styles
  const providerStyles: Record<string, { bg: string; hover: string; text: string }> = {
    google: { bg: 'bg-white', hover: 'hover:bg-gray-100', text: 'text-gray-700' },
    apple: { bg: 'bg-black', hover: 'hover:bg-gray-900', text: 'text-white' },
    facebook: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-white' },
    github: { bg: 'bg-gray-800', hover: 'hover:bg-gray-900', text: 'text-white' },
    twitter: { bg: 'bg-blue-400', hover: 'hover:bg-blue-500', text: 'text-white' },
    linkedin: { bg: 'bg-blue-700', hover: 'hover:bg-blue-800', text: 'text-white' },
    microsoft: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-white' },
    custom: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-white' },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {content.title && (
        <h2 className="text-2xl font-bold mb-2 text-center">{content.title}</h2>
      )}

      {content.description && (
        <p className="text-gray-600 mb-6 text-center">{content.description}</p>
      )}

      {error && content.showLoginError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {content.dividerText && (
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">{content.dividerText}</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      )}

      <div className="space-y-3">
        {content.providers.map((provider, index) => {
          const style = providerStyles[provider.type] || providerStyles.custom;

          return (
            <button
              key={index}
              onClick={() => handleOAuthLogin(provider.type)}
              className={`w-full ${style.bg} ${style.hover} ${style.text} font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center`}
            >
              <span className="mr-2">
                {/* Icon would be rendered here based on provider.icon or provider.customIcon */}
              </span>
              {provider.label || `Continue with ${provider.type.charAt(0).toUpperCase() + provider.type.slice(1)}`}
            </button>
          );
        })}
      </div>
    </div>
  );
  }
}
