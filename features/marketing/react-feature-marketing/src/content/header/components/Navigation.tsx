import { Header } from '@/content/header/header';
import { cn } from '@/shared/utils';
import { executeAction } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

// Types
type NavigationItem = NonNullable<Header['navigationItems']>[number];
type NavigationChild = NonNullable<NavigationItem['children']>[number];

// Simple Navigation Item Component (no children)
interface SimpleNavItemProps {
  item: NavigationItem;
}

const SimpleNavItem: React.FC<SimpleNavItemProps> = ({ item }) => {
  return (
    <li>
      <div
        role="button"
        onClick={() => executeAction(item.action)}
        className={cn(
          'btn btn-ghost px-3 text-base normal-case',
          item.isActive ? 'btn-active' : '',
        )}
      >
        {item.action.title}
      </div>
    </li>
  );
};

// Navigation Child Item Component
interface NavChildItemProps {
  child: NavigationChild;
}

const NavChildItem: React.FC<NavChildItemProps> = ({ child }) => {
  return (
    <li>
      <a onClick={() => executeAction(child.action)}>{child.action?.title}</a>
    </li>
  );
};

// Navigation Item with Submenu Component
interface NavItemWithSubmenuProps {
  item: NavigationItem;
}

const NavItemWithSubmenu: React.FC<NavItemWithSubmenuProps> = ({ item }) => {
  if (!item.children || item.children.length === 0) {
    return null;
  }

  // Filter out children without an action or title
  const validItems = item.children.filter(
    (child) => child.action && child.action.title,
  );

  const hasChildren = validItems.length > 0;

  return (
    <li className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className={cn(
          'btn btn-ghost flex items-center gap-1 px-3 text-base normal-case',
          item.isActive ? 'btn-active' : '',
        )}
        onClick={() => executeAction(item.action)}
      >
        {item.action.title}
        {hasChildren && (
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        )}
      </div>
      {hasChildren && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {validItems.map((child, childIndex) => (
            <NavChildItem key={childIndex} child={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

// Desktop Navigation Component
interface DesktopNavigationProps {
  items?: Header['navigationItems'];
  className?: string;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  items,
  className,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;

        if (hasChildren) {
          return <NavItemWithSubmenu key={index} item={item} />;
        }

        return <SimpleNavItem key={index} item={item} />;
      })}
    </ul>
  );
};

// Mobile Navigation Item Component
interface MobileNavItemProps {
  item: NavigationItem;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <a onClick={() => item.action && executeAction(item.action)}>
          {item.action?.title}
        </a>
      </li>
    );
  }

  return (
    <li>
      <details>
        <summary onClick={() => executeAction(item.action)}>
          {item.action?.title}
        </summary>
        <ul className="p-2">
          {item.children.map((child, childIndex) => (
            <li key={childIndex}>
              <a onClick={() => executeAction(child.action)}>
                {child.action?.title}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

// Mobile Navigation Component
interface MobileNavigationProps {
  items?: Header['navigationItems'];
  actions?: Header['actions'];
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  actions,
  className,
}) => {
  if ((!items || items.length === 0) && (!actions || actions.length === 0)) {
    return null;
  }

  return (
    <ul
      className={cn(
        'menu menu-sm bg-base-100 text-base-content min-h-full w-80 gap-2 p-4',
        className,
      )}
    >
      {items && items.length > 0 && (
        <>
          <li className="menu-title mb-2 text-lg font-bold">Menu</li>
          {items.map((item, index) => (
            <MobileNavItem key={index} item={item} />
          ))}
        </>
      )}

      {actions && actions.length > 0 && (
        <>
          {actions.map((actionItem, index) => (
            <li key={`action-${index}`}>
              <a onClick={() => executeAction(actionItem.action)}>
                {actionItem.icon && (
                  <span className="mr-2">
                    <DynamicIcon
                      name={actionItem.icon as IconName}
                      className="h-4 w-4"
                    />
                  </span>
                )}
                {actionItem.action?.title}
              </a>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

// Main Navigation Component (for backward compatibility)
export const Navigation = DesktopNavigation;
