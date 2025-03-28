import { Footer } from '@/content/footer/footer';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface FooterNavigationProps {
  navigationGroups: NonNullable<Footer['navigationGroups']>;
  headingClasses: string;
  linkClasses: string;
  className?: string;
}

export const FooterNavigation: React.FC<FooterNavigationProps> = ({
  navigationGroups,
  headingClasses,
  linkClasses,
  className,
}) => {
  if (navigationGroups.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {navigationGroups.map((group, index) => (
        <div key={index}>
          <h3 className={cn('mb-4 text-sm font-semibold', headingClasses)}>
            {group.title}
          </h3>
          {group.links && group.links.length > 0 && (
            <ul className="space-y-3">
              {group.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <button
                    className={cn('text-sm', linkClasses)}
                    onClick={() => new Action(link.action).execute()}
                  >
                    {link.action?.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
