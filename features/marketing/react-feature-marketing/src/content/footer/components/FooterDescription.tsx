import { cn } from '@/shared/utils';
import React from 'react';

interface FooterDescriptionProps {
  description?: string;
  textClasses: string;
  className?: string;
}

export const FooterDescription: React.FC<FooterDescriptionProps> = ({
  description,
  textClasses,
  className,
}) => {
  // Use description field, fall back to missionStatement for backward compatibility
  const text = description;

  if (!text) {
    return null;
  }

  return (
    <div className={cn('max-w-2xl text-sm', textClasses, className)}>
      {text}
    </div>
  );
};
