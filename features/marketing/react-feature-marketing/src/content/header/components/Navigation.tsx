import { Header } from '@/content/header/header';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

// DropdownItem Component
interface DropdownItemProps {
  action: Action;
  icon?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ action, icon }) => {
  if (!action) return null;

  return (
    <li>
      <button
        onClick={() => new Action(action).execute()}
        className="w-full text-left"
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <div>{action.title}</div>
        </div>
      </button>
    </li>
  );
};

// NavigationDropdown Component
interface NavigationDropdownProps {
  children: NonNullable<Header['navigationItems']>[number]['children'];
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
  children,
}) => {
  if (!children || children.length === 0) {
    return null;
  }

  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
    >
      {children.map((child, childIndex) => (
        <DropdownItem
          key={childIndex}
          action={child.action}
          icon={child.icon}
        />
      ))}
    </ul>
  );
};

// NavigationItem Component
interface NavigationItemProps {
  item: NonNullable<Header['navigationItems']>[number];
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={hasChildren ? 'dropdown dropdown-hover' : ''}>
      <button
        role={'button'}
        className={cn(
          'btn btn-ghost',
          item.isActive ? 'text-primary' : '',
          hasChildren ? 'dropdown-toggle' : '',
        )}
        onClick={() => new Action(item.action).execute()}
        tabIndex={0}
      >
        {item.action.title}
      </button>

      {/* Dropdown for items with children using DaisyUI */}
      {hasChildren && <NavigationDropdown children={item.children} />}
    </div>
  );
};

// Main Navigation Component
interface NavigationProps {
  items?: Header['navigationItems'];
  darkMode?: boolean;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  darkMode = false,
  className,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={cn('flex gap-0', className)}>
      {items.map((item, index) => (
        <NavigationItem key={index} item={item} />
      ))}
    </nav>
  );
};
