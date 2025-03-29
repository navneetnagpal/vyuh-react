import { DefaultFooterLayout } from '@/content/footer/default-footer-layout';
import { Footer as FooterItem } from '@/content/footer/footer';
import { cn } from '@/shared/utils';
import React from 'react';
import { FooterCopyright } from './FooterCopyright';
import { FooterDescription } from './FooterDescription';
import { FooterLegalLinks } from './FooterLegalLinks';
import { FooterLogo } from './FooterLogo';
import { FooterNavigation } from './FooterNavigation';
import { FooterSimpleNavigation } from './FooterSimpleNavigation';
import { FooterSocialLinks } from './FooterSocialLinks';

interface FooterProps {
  content: FooterItem;
  layout: DefaultFooterLayout;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  layout,
  className,
}) => {
  const variant = layout.variant || 'simple-centered';

  // Text color classes
  const backgroundClasses = 'bg-gray-100 text-gray-900';
  const textClasses = 'text-gray-600';
  const headingClasses = 'text-gray-900';
  const linkClasses = 'text-gray-600 hover:text-gray-900';

  // Render the footer based on the variant
  const renderFooter = () => {
    switch (variant) {
      case 'simple-centered':
        return (
          <div className="text-center">
            <FooterLogo
              content={content}
              headingClasses={headingClasses}
              className="mb-8 justify-center"
            />

            {content.navigationGroups && (
              <FooterSimpleNavigation
                navigationGroups={content.navigationGroups}
                linkClasses={linkClasses}
                className="mb-8"
              />
            )}

            {content.socialLinks && (
              <FooterSocialLinks
                socialLinks={content.socialLinks}
                linkClasses={linkClasses}
                className="mx-auto mt-8"
              />
            )}

            {content.legalLinks && (
              <FooterLegalLinks
                legalLinks={content.legalLinks}
                linkClasses={linkClasses}
                className="mt-6 justify-center"
              />
            )}

            {content.copyright && (
              <FooterCopyright
                copyright={content.copyright}
                textClasses={textClasses}
                className="mt-8"
              />
            )}
          </div>
        );

      case 'with-social-links':
        return (
          <div>
            <div className="flex flex-wrap justify-between gap-8 max-sm:flex-col md:flex-row">
              <div className="mb-8 md:mb-0">
                <FooterLogo content={content} headingClasses={headingClasses} />

                <FooterDescription
                  description={content.description}
                  textClasses={textClasses}
                  className="mt-8"
                />
              </div>

              <div className="flex flex-wrap gap-8">
                {content.navigationGroups && (
                  <FooterNavigation
                    navigationGroups={content.navigationGroups}
                    headingClasses={headingClasses}
                    linkClasses={linkClasses}
                  />
                )}
              </div>
            </div>

            <div
              className={cn(
                `mt-12 flex items-center justify-between border-t pt-8 max-sm:flex-col md:flex-row`,
              )}
            >
              <div className="mb-4 md:mb-0">
                {content.copyright && (
                  <FooterCopyright
                    copyright={content.copyright}
                    textClasses={textClasses}
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                {content.legalLinks && (
                  <FooterLegalLinks
                    legalLinks={content.legalLinks}
                    linkClasses={linkClasses}
                  />
                )}

                {content.socialLinks && (
                  <div className="ml-0 mt-4 md:ml-6 md:mt-0">
                    <FooterSocialLinks
                      socialLinks={content.socialLinks}
                      linkClasses={linkClasses}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <FooterLogo
              content={content}
              headingClasses={headingClasses}
              className="mb-8 justify-center"
            />

            {content.legalLinks && (
              <FooterLegalLinks
                legalLinks={content.legalLinks}
                linkClasses={linkClasses}
                className="mb-4 justify-center"
              />
            )}

            {content.copyright && (
              <FooterCopyright
                copyright={content.copyright}
                textClasses={textClasses}
              />
            )}
          </div>
        );
    }
  };

  return (
    <footer className={cn('px-6 py-12', backgroundClasses, className)}>
      <div className="container mx-auto">{renderFooter()}</div>
    </footer>
  );
};
