import { Team } from '@/content/team/team';
import { cn } from '@/shared/utils';
import React from 'react';

interface TeamHeaderProps {
  content: Team;
  className?: string;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({
  content,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {content.title}
      </h2>
      {content.subtitle && (
        <p className="mt-4 text-lg text-gray-600">
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
