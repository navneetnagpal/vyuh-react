import { Footer } from '@/content/footer/footer';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import React from 'react';

interface FooterLogoProps {
  content: Pick<Footer, 'logo' | 'logoText'>;
  headingClasses: string;
  className?: string;
}

export const FooterLogo: React.FC<FooterLogoProps> = ({
  content,
  headingClasses,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  if (!content.logo && !content.logoText) {
    return null;
  }

  return (
    <div className={cn('flex items-center', className)}>
      {content.logo && (
        <img
          src={getImageUrl(content.logo)}
          alt={content.logoText || 'Logo'}
          className="h-8 w-auto"
        />
      )}
      {content.logoText && (
        <span
          className={cn('text-lg font-semibold', headingClasses, {
            'ml-2': content.logo,
          })}
        >
          {content.logoText}
        </span>
      )}
    </div>
  );
};
