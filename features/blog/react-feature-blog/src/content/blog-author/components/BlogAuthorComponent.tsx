import { BlogAuthor } from '../blog-author';
import { DefaultBlogAuthorLayout } from '@/content/blog-author';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import React from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface BlogAuthorComponentProps {
  content: BlogAuthor;
  layout: DefaultBlogAuthorLayout;
  className?: string;
}

export const BlogAuthorComponent: React.FC<BlogAuthorComponentProps> = ({
  content,
  layout,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();
  const variant = layout.variant || 'standard';

  // Determine if we're using the card variant
  const isCardVariant = variant === 'card';
  const isCompactVariant = variant === 'compact';

  // Get social media icon based on platform
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <FaTwitter className="h-5 w-5" />;
      case 'linkedin':
        return <FaLinkedin className="h-5 w-5" />;
      case 'github':
        return <FaGithub className="h-5 w-5" />;
      case 'instagram':
        return <FaInstagram className="h-5 w-5" />;
      case 'facebook':
        return <FaFacebook className="h-5 w-5" />;
      case 'website':
        return <FaGlobe className="h-5 w-5" />;
      default:
        return <FaGlobe className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={cn(
        'flex',
        isCardVariant && 'card bg-base-100 border-base-300 border p-6',
        isCompactVariant ? 'flex-row items-center' : 'flex-col',
        content.featured && 'border-primary border-2',
        className,
      )}
    >
      {/* Avatar */}
      {content.avatar && (
        <div
          className={cn('avatar', isCompactVariant ? 'mr-4' : 'mx-auto mb-4')}
        >
          <div
            className={cn(
              'ring-base-200 rounded-full ring-4 ring-offset-0 transition-all duration-300 hover:ring-offset-2',
              isCompactVariant ? 'h-16 w-16' : 'h-32 w-32',
            )}
          >
            <img
              src={getImageUrl(content.avatar)}
              alt={content.name}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Author Info */}
      <div className={cn(isCompactVariant ? 'flex-1' : 'text-center')}>
        <h3 className="text-base-content text-xl font-semibold">
          {content.name}
        </h3>

        {content.role && (
          <p className="text-base-content/70 text-sm">{content.role}</p>
        )}

        {!isCompactVariant && content.bio && (
          <p className="text-base-content/60 mt-3 text-sm">{content.bio}</p>
        )}

        {/* Social Links */}
        {content.socialLinks && content.socialLinks.length > 0 && (
          <div
            className={cn(
              'mt-3 flex space-x-3',
              isCompactVariant ? 'justify-start' : 'justify-center',
            )}
          >
            {content.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-base-content/40 hover:text-base-content/70 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}

            {content.email && (
              <a
                href={`mailto:${content.email}`}
                className="text-base-content/40 hover:text-base-content/70 transition-colors duration-200"
                aria-label="Email"
              >
                <MdEmail className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
