import { Header } from '@/content/header/header';
import { Action } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';

// Mobile Menu Item Component
interface MobileMenuItemProps {
  item: NonNullable<Header['navigationItems']>[number];
}

export const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <a
          onClick={() => item.action && new Action(item.action).execute()}
          className="transition-colors duration-200"
        >
          {item.action?.title}
        </a>
      </li>
    );
  }

  return (
    <li>
      <details>
        <summary
          onClick={() => item.action && new Action(item.action).execute()}
        >
          {item.action?.title}
        </summary>
        <ul className="menu">
          {item.children.map((child, childIndex) => (
            <li key={childIndex}>
              <a
                onClick={() => child.action && new Action(child.action).execute()}
                className="transition-colors duration-200"
              >
                {child.action?.title}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

// Mobile Menu Action Item Component
interface MobileMenuActionItemProps {
  actionItem: NonNullable<Header['actions']>[number];
}

export const MobileMenuActionItem: React.FC<MobileMenuActionItemProps> = ({
  actionItem,
}) => {
  return (
    <li>
      <a
        onClick={() => actionItem.action && new Action(actionItem.action).execute()}
        className="transition-colors duration-200"
      >
        {actionItem.icon && (
          <DynamicIcon
            name={actionItem.icon as IconName}
          />
        )}
        {actionItem.action?.title}
      </a>
    </li>
  );
};

// Mobile Menu Button Component
interface MobileMenuButtonProps {
  id: string;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ id }) => {
  return (
    <label htmlFor={id} className="btn btn-ghost drawer-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </label>
  );
};

// Main Mobile Menu Component
interface MobileMenuProps {
  id: string;
  navigationItems?: Header['navigationItems'];
  actions?: Header['actions'];
  showThemeSwitch?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  id,
  navigationItems,
  actions,
  showThemeSwitch = true,
}) => {
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor={id}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="bg-base-100 min-h-full w-80 overflow-y-auto">
        {/* Close button at the top right */}
        <div className="flex justify-end p-4">
          <label htmlFor={id} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </label>
        </div>

        <ul className="menu menu-lg text-base-content px-4 pb-4">
          {navigationItems && navigationItems.length > 0 && (
            <>
              {navigationItems.map((item, index) => (
                <MobileMenuItem key={index} item={item} />
              ))}
            </>
          )}

          {navigationItems && navigationItems.length > 0 && actions && actions.length > 0 && (
            <li>
              <div className="divider"></div>
            </li>
          )}

          {actions && actions.length > 0 && (
            <>
              {actions.map((actionItem, index) => (
                <MobileMenuActionItem key={index} actionItem={actionItem} />
              ))}
            </>
          )}

          {/* Theme toggle - only show if enabled */}
          {showThemeSwitch && (
            <>
              <li>
                <div className="divider"></div>
              </li>
              <li className="flex items-center">
                <span className="flex-grow">Theme</span>
                <ThemeToggle />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
