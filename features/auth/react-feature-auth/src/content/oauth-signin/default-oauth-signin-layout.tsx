import {
  executeAction,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import React, { useState } from 'react';
import {
  FaGoogle,
  FaApple,
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaMicrosoft,
} from 'react-icons/fa';
import { BsQuestionCircle } from 'react-icons/bs';
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
    const [loadingAuth, setLoadingAuth] = useState<string | null>(null);

    const handleOAuthLogin = async (type: string) => {
      setError(null);
      setLoadingAuth(type);

      try {
        await plugins.auth.loginWithOAuth(type as any);

        // If action is provided, execute it
        if (content.action) {
          executeAction(content.action);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setLoadingAuth(null);
      }
    };

    // Map of provider types to their respective button styles
    const providerStyles: Record<
      string,
      { color: string; icon: React.ReactNode }
    > = {
      google: {
        color: 'btn-default',
        icon: <FaGoogle className="h-5 w-5" />,
      },
      apple: {
        color: 'btn-neutral',
        icon: <FaApple className="h-5 w-5" />,
      },
      facebook: {
        color: 'btn-primary',
        icon: <FaFacebook className="h-5 w-5" />,
      },
      github: {
        color: 'btn-default',
        icon: <FaGithub className="h-5 w-5" />,
      },
      twitter: {
        color: 'btn-info',
        icon: <FaTwitter className="h-5 w-5" />,
      },
      linkedin: {
        color: 'btn-info',
        icon: <FaLinkedin className="h-5 w-5" />,
      },
      microsoft: {
        color: 'btn-accent',
        icon: <FaMicrosoft className="h-5 w-5" />,
      },
      custom: {
        color: 'btn-secondary',
        icon: <BsQuestionCircle className="h-5 w-5" />,
      },
    };

    return (
      <div className="card bg-base-100 mx-auto w-full max-w-md shadow-xl">
        <div className="card-body">
          {error && content.showLoginError && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {content.authTypes.map((authType, index) => {
              const style = providerStyles[authType] || providerStyles.custom;

              const isLoading = loadingAuth === authType;
              return (
                <button
                  key={index}
                  onClick={() => handleOAuthLogin(authType)}
                  className={`btn ${style.color} w-full gap-2`}
                  disabled={loadingAuth !== null}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    style.icon
                  )}
                  Continue with{' '}
                  {authType.charAt(0).toUpperCase() + authType.slice(1)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
