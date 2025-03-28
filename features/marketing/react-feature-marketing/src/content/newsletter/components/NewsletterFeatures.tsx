import { cn } from '@/shared/utils';
import { CheckIcon } from 'lucide-react';
import React from 'react';

interface NewsletterFeaturesProps {
  features: string[];
  className?: string;
  darkMode?: boolean;
}

export const NewsletterFeatures: React.FC<NewsletterFeaturesProps> = ({
  features,
  className,
  darkMode = false,
}) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-x-3">
            <CheckIcon
              className={cn(
                'h-6 w-5 flex-none',
                darkMode ? 'text-indigo-400' : 'text-indigo-600',
              )}
              aria-hidden="true"
            />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
