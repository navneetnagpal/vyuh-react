import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';
import { ProfileCard, PROFILE_CARD_SCHEMA_TYPE } from './profile-card';
import { UserCircle } from 'lucide-react';

/**
 * Default layout for the Profile Card
 */
export class DefaultProfileCardLayout extends LayoutConfiguration<ProfileCard> {
  static readonly schemaName = `${PROFILE_CARD_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultProfileCardLayout.schemaName,
      title: 'Default Profile Card Layout',
    });
  }

  render(content: ProfileCard): React.ReactNode {
  const { plugins } = useVyuh();
  const user = plugins.auth.currentUser;

  const handleSignOut = async () => {
    try {
      await plugins.auth.logout();

      // If action is provided, execute it
      if (content.onSignOut) {
        plugins.content.executeAction(content.onSignOut);
      }
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  // If user is not authenticated, show a placeholder or nothing
  if (!user || user.isUnknown) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600">Not signed in</p>
      </div>
    );
  }

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {content.title && (
        <h2 className="text-2xl font-bold mb-4 text-center">{content.title}</h2>
      )}

      <div className="flex flex-col items-center mb-6">
        {content.showAvatar && (
          <div className="mb-4">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name || 'User'}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircle size={48} className="text-gray-500" />
              </div>
            )}
          </div>
        )}

        <h3 className="text-xl font-semibold">{user.name || 'User'}</h3>

        {content.showEmail && user.email && (
          <p className="text-gray-600 mt-1">{user.email}</p>
        )}

        {content.showPhone && user.phoneNumber && (
          <p className="text-gray-600 mt-1">{user.phoneNumber}</p>
        )}

        {content.showLastSignIn && user.lastSignInTime && (
          <p className="text-gray-500 text-sm mt-2">
            Last sign in: {formatDate(user.lastSignInTime)}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleSignOut}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {content.signOutButtonText}
        </button>

        {content.profileSettingsLink && (
          <button
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => {
              if (content.profileSettingsLink?.action) {
                plugins.content.executeAction(content.profileSettingsLink.action);
              }
            }}
          >
            {content.profileSettingsLink.text}
          </button>
        )}
      </div>
    </div>
  );
  }
}
