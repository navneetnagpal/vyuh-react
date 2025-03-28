import { Logo } from '@/content/logo/logo';
import { cn } from '@/shared/utils';
import React from 'react';

interface LogoHeaderProps {
  title?: string;
  className?: string;
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({ title, className }) => {
  if (!title) {
    return null;
  }

  return (
    <div className={cn('text-center', className)}>
      <h2 className="text-xl font-medium">{title}</h2>
    </div>
  );
};
