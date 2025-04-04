import { Team } from '@/content/team/team';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import React from 'react';

interface TeamMemberProps {
  member: Team['members'][0];
  className?: string;
  variant?: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  member,
  className,
  variant = 'simple-grid',
}) => {
  const { getImageUrl } = useMediaUtils();

  const nameColor = 'text-base-content';
  const roleColor = 'text-base-content/70';
  const bioColor = 'text-base-content/60';

  const isCardVariant = variant === 'card-grid';
  const isLargeImageVariant = variant === 'with-large-images';
  const showSocial = variant === 'with-roles-social' || variant === 'card-grid';

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <TwitterIcon className="h-5 w-5" />;
      case 'linkedin':
        return <LinkedinIcon className="h-5 w-5" />;
      case 'github':
        return <GithubIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        isCardVariant && 'card p-6',
        isCardVariant && 'bg-base-100 border-base-300 border',
        member.featured && 'border-primary border-2',
        className,
      )}
    >
      <div className="avatar mx-auto">
        <div
          className={cn(
            'ring-base-200 rounded-full ring-4 ring-offset-0 transition-all duration-300 hover:ring-offset-2',
            isLargeImageVariant ? 'h-56 w-56' : 'h-24 w-24',
          )}
        >
          <img src={getImageUrl(member.image)} alt={member.name} />
        </div>
      </div>
      <div className={cn('mt-4', isLargeImageVariant ? 'mt-6' : 'mt-4')}>
        <h3 className={cn('text-lg font-semibold', nameColor)}>
          {member.name}
        </h3>
        <p className={cn('text-sm', roleColor)}>{member.role}</p>
        {member.bio && (
          <p className={cn('mt-2 text-sm', bioColor)}>{member.bio}</p>
        )}
        {showSocial && member.socialLinks && member.socialLinks.length > 0 && (
          <div className="mt-4 flex justify-center space-x-4">
            {member.socialLinks &&
              member.socialLinks.length > 0 &&
              member.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-base-content/40 hover:text-base-content/70 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(link.platform)}
                  <span className="sr-only">{link.platform}</span>
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
