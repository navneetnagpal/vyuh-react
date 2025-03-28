import { Header as HeaderItem } from '@/content/header/header';
import { DefaultHeaderLayout } from '@/content/header/default-header-layout';
import { cn } from '@/content/shared/utils';
import { Action, useVyuh } from '@vyuh/react-core';
import React from 'react';

interface HeaderProps {
  content: HeaderItem;
  layout: DefaultHeaderLayout;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  content,
  layout,
  className,
}) => {
  const { plugins } = useVyuh();
  const variant = layout.variant || 'simple';
  const darkMode = layout.darkMode || false;
  const sticky = layout.sticky || false;

  // Background color classes based on dark mode
  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  // Navigation item classes
  const navItemClasses = darkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-500 hover:text-gray-900';

  // Active navigation item classes
  const activeNavItemClasses = darkMode ? 'text-white' : 'text-gray-900';

  // Button classes
  const primaryButtonClasses = darkMode
    ? 'bg-white text-gray-900 hover:bg-gray-100'
    : 'bg-indigo-600 text-white hover:bg-indigo-700';

  const secondaryButtonClasses = darkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-500 hover:text-gray-900';

  // Render logo
  const renderLogo = () => {
    return (
      <div className="flex items-center">
        {content.logo && (
          <img
            src={plugins.content.provider.image(content.logo, {
              width: 200,
              height: 50,
            })}
            alt={content.logoText || 'Logo'}
            className="h-8 w-auto"
          />
        )}
        {content.logoText && (
          <span
            className={cn('ml-2 text-lg font-semibold', {
              'ml-0': !content.logo,
            })}
          >
            {content.logoText}
          </span>
        )}
      </div>
    );
  };

  // Render navigation items
  const renderNavItems = () => {
    if (!content.navigationItems || content.navigationItems.length === 0) {
      return null;
    }

    return (
      <nav className="flex space-x-4 md:space-x-6">
        {content.navigationItems.map((item, index) => (
          <div key={index} className="group relative">
            <button
              className={cn(
                'cursor-pointer text-sm font-medium',
                item.isActive ? activeNavItemClasses : navItemClasses,
              )}
              onClick={() => new Action(item.action).execute()}
            >
              {item.action.title}
            </button>

            {/* Dropdown for items with children */}
            {item.children && item.children.length > 0 && (
              <div className="absolute left-0 z-10 mt-2 hidden w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block">
                {item.children.map((child, childIndex) => (
                  <button
                    key={childIndex}
                    className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => new Action(child.action).execute()}
                  >
                    <div className="flex items-center">
                      {child.icon && <span className="mr-2">{child.icon}</span>}
                      <div>
                        <div>{child.action.title}</div>
                        {child.description && (
                          <p className="text-xs text-gray-500">
                            {child.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  };

  // Render action buttons
  const renderActions = () => {
    if (!content.actions || content.actions.length === 0) {
      return null;
    }

    return (
      <div className="flex items-center space-x-4">
        {content.actions.map((action, index) => (
          <button
            key={index}
            className={cn(
              'cursor-pointer rounded-md px-4 py-2 text-sm font-medium',
              index === 0 ? primaryButtonClasses : secondaryButtonClasses,
            )}
            onClick={() => new Action(action).execute()}
          >
            {action.title}
          </button>
        ))}
      </div>
    );
  };

  // Render search box
  const renderSearch = () => {
    if (variant !== 'with-search') {
      return null;
    }

    return (
      <div className="w-full max-w-xs">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            className={cn(
              'block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm',
              darkMode && 'border-gray-700 bg-gray-800 text-white',
            )}
            placeholder="Search"
          />
        </div>
      </div>
    );
  };

  // Render the header based on the variant
  const renderHeader = () => {
    switch (variant) {
      case 'simple':
        return (
          <div className="flex items-center justify-between">
            {renderLogo()}
          </div>
        );

      case 'with-navigation':
        return (
          <div className="flex items-center justify-between">
            {renderLogo()}
            {renderNavItems()}
          </div>
        );

      case 'with-navigation-buttons':
        return (
          <div className="flex items-center justify-between">
            {renderLogo()}
            <div className="flex items-center space-x-6">
              {renderNavItems()}
              {renderActions()}
            </div>
          </div>
        );

      case 'with-search':
        return (
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            {renderLogo()}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
              {renderSearch()}
              {renderNavItems()}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-between">
            {renderLogo()}
          </div>
        );
    }
  };

  return (
    <header
      className={cn(
        'px-6 py-4',
        backgroundClasses,
        sticky && 'sticky top-0 z-50',
        className,
      )}
    >
      <div className="container mx-auto">{renderHeader()}</div>
    </header>
  );
};
