import { Header } from '@/content/header/header';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

// Mobile Menu Item Component
interface MobileMenuItemProps {
  item: NonNullable<Header['navigationItems']>[number];
}

export const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <a onClick={() => item.action && item.action.execute()}>
          {item.action?.title}
        </a>
      </li>
    );
  }

  return (
    <li>
      <details>
        <summary onClick={() => item.action && item.action.execute()}>
          {item.action?.title}
        </summary>
        <ul className="p-2">
          {item.children.map((child, childIndex) => (
            <li key={childIndex}>
              <a onClick={() => child.action && child.action.execute()}>
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
      <a onClick={() => actionItem.action && actionItem.action.execute()}>
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
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  id,
  navigationItems,
  actions,
}) => {
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor={id}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu menu-sm bg-base-100 text-base-content min-h-full w-80 gap-2 p-4">
        {navigationItems && navigationItems.length > 0 && (
          <>
            <li className="menu-title mb-2 text-lg font-bold">Menu</li>
            {navigationItems.map((item, index) => (
              <MobileMenuItem key={index} item={item} />
            ))}
          </>
        )}

        {actions && actions.length > 0 && (
          <>
            <li className="menu-title pt-4">
              <span>Actions</span>
            </li>
            {actions.map((actionItem, index) => (
              <MobileMenuActionItem key={index} actionItem={actionItem} />
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
