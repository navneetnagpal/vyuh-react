import { Team } from '@/content/team/team';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import React from 'react';

interface TeamMemberProps {
  member: Team['members'][0];
  className?: string;
  darkMode?: boolean;
  variant?: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  member,
  className,
  darkMode = false,
  variant = 'simple-grid',
}) => {
  const { getImageUrl } = useMediaUtils();

  const nameColor = darkMode ? 'text-white' : 'text-gray-900';
  const roleColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const bioColor = darkMode ? 'text-gray-400' : 'text-gray-500';

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
        isCardVariant && 'rounded-lg p-6 ring-1',
        isCardVariant &&
          (darkMode ? 'bg-gray-800 ring-gray-700' : 'bg-white ring-gray-200'),
        member.featured && 'ring-2 ring-indigo-500',
        className,
      )}
    >
      <img
        src={getImageUrl(member.image)}
        alt={member.name}
        className={cn(
          'mx-auto',
          isLargeImageVariant
            ? 'h-56 w-56 rounded-full object-cover'
            : 'h-24 w-24 rounded-full object-cover',
        )}
      />
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
                  className={cn(
                    'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300',
                  )}
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
