import {
  executeAction,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
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
        if (content.action) {
          executeAction(content.action);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    // Map of provider types to their respective button styles
    const providerStyles: Record<
      string,
      { color: string; icon: React.ReactNode }
    > = {
      google: {
        color: 'btn-neutral',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        ),
      },
      apple: {
        color: 'btn-neutral',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.37 3.51 7.01 9.07 6.5c1.66.02 2.8 1.13 3.73 1.15.93-.12 2.65-1.35 4.47-.96.76.15 2.78.96 4.09 3.24-3.52 2.14-2.9 6.88.08 8.49-.8 1.36-1.66 2.86-3.39 1.86zm-4.35-16.7c-.12 2.3-2.36 4.19-4.96 3.98-.23-2.58 2.16-4.29 4.96-3.98z" />
          </svg>
        ),
      },
      facebook: {
        color: 'btn-primary',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
          </svg>
        ),
      },
      github: {
        color: 'btn-neutral',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
          </svg>
        ),
      },
      twitter: {
        color: 'btn-info',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
        ),
      },
      linkedin: {
        color: 'btn-info',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        ),
      },
      microsoft: {
        color: 'btn-accent',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path d="M2 3h9v9H2V3m11 0h9v9h-9V3M2 14h9v7H2v-7m11 0h9v7h-9v-7z" />
          </svg>
        ),
      },
      custom: {
        color: 'btn-secondary',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        ),
      },
    };

    return (
      <div className="card bg-base-100 mx-auto w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Sign in with</h2>
          <p className="mb-4 text-center opacity-70">
            Choose your preferred sign in method
          </p>

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

              return (
                <button
                  key={index}
                  onClick={() => handleOAuthLogin(authType)}
                  className={`btn ${style.color} w-full gap-2`}
                >
                  {style.icon}
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
