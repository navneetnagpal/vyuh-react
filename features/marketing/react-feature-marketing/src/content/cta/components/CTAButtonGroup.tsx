import { CTA } from '@/content/cta/cta';
import { cn } from '@/shared/utils';
import React from 'react';
import { CTAButton } from './CTAButton';

interface CTAButtonGroupProps {
  primaryAction?: CTA['primaryAction'];
  secondaryAction?: CTA['secondaryAction'];
  background: string;
  className?: string;
}

export const CTAButtonGroup: React.FC<CTAButtonGroupProps> = ({
  primaryAction,
  secondaryAction,
  background,
  className,
}) => {
  if (!primaryAction && !secondaryAction) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0',
        className,
      )}
    >
      {primaryAction && (
        <CTAButton
          action={primaryAction}
          isPrimary={true}
          background={background}
        />
      )}
      {secondaryAction && (
        <CTAButton
          action={secondaryAction}
          isPrimary={false}
          background={background}
        />
      )}
    </div>
  );
};
