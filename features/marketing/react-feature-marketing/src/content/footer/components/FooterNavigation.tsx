import { Footer } from '@/content/footer/footer';
import { cn } from '@/shared/utils';
import { executeAction } from '@vyuh/react-core';
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
        'grid gap-16 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
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
                    onClick={() => executeAction(link.action)}
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
