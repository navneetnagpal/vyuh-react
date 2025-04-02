import { DefaultTeamLayout } from '@/content/team/default-team-layout';
import { Team as TeamContent } from '@/content/team/team';
import { Section } from '@/shared/components';
import { executeAction } from '@vyuh/react-core';
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

  const backgroundClasses = 'bg-base-100 text-base-content';

  const renderAction = () => {
    if (!content.action) return null;

    return (
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => executeAction(content.action)}
          className="btn btn-primary transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
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
