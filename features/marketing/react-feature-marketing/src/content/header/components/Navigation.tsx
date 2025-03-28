import { Header } from '@/content/header/header';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface NavigationProps {
  items?: Header['navigationItems'];
  darkMode?: boolean;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  items, 
  darkMode = false,
  className 
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  // Navigation item classes
  const navItemClasses = darkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-500 hover:text-gray-900';

  // Active navigation item classes
  const activeNavItemClasses = darkMode
    ? 'text-white'
    : 'text-indigo-600';

  return (
    <nav className={cn("flex space-x-4 md:space-x-6", className)}>
      {items.map((item, index) => (
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
