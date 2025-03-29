import { DefaultTeamLayout } from '@/content/team/default-team-layout';
import { Team as TeamContent } from '@/content/team/team';
import { Section } from '@/shared/components';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';
import { TeamHeader } from './TeamHeader';
import { TeamMember } from './TeamMember';

interface TeamProps {
  content: TeamContent;
  layout: DefaultTeamLayout;
  className?: string;
}

export const Team: React.FC<TeamProps> = ({ content, layout, className }) => {
  const variant = layout.variant || 'simple-grid';

  const backgroundClasses = 'bg-white text-gray-900';

  const renderAction = () => {
    if (!content.action) return null;

    const buttonClasses = 'bg-indigo-600 text-white hover:bg-indigo-500';

    return (
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => new Action(content.action).execute()}
          className={cn(
            'rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm',
            buttonClasses,
          )}
        >
          {content.action.title || 'Learn more'}
        </button>
      </div>
    );
  };

  switch (variant) {
    case 'simple-grid':
      return (
        <Section>
          <TeamHeader content={content} />

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {content.members &&
              content.members.length > 0 &&
              content.members.map((member, index) => (
                <TeamMember key={index} member={member} variant={variant} />
              ))}
          </div>

          {renderAction()}
        </Section>
      );

    case 'with-large-images':
      return (
        <Section>
          <TeamHeader content={content} />

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {content.members &&
              content.members.length > 0 &&
              content.members.map((member, index) => (
                <TeamMember key={index} member={member} variant={variant} />
              ))}
          </div>

          {renderAction()}
        </Section>
      );

    default:
      return (
        <Section>
          <TeamHeader content={content} />

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {content.members &&
              content.members.length > 0 &&
              content.members.map((member, index) => (
                <TeamMember key={index} member={member} variant="simple-grid" />
              ))}
          </div>

          {renderAction()}
        </Section>
      );
  }
};
