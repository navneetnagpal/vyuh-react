import { Testimonials } from '@/content/testimonials/testimonials';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { QuoteIcon } from 'lucide-react';
import React from 'react';

interface TestimonialItemProps {
  testimonial: Testimonials['testimonials'][0];
  className?: string;
  darkMode?: boolean;
  variant?: string;
}

export const TestimonialItem: React.FC<TestimonialItemProps> = ({
  testimonial,
  className,
  darkMode = false,
  variant = 'simple-centered',
}) => {
  const { getImageUrl } = useMediaUtils();

  const quoteColor = darkMode ? 'text-white' : 'text-gray-900';
  const nameColor = darkMode ? 'text-white' : 'text-gray-900';
  const roleColor = darkMode ? 'text-gray-300' : 'text-gray-600';

  const isCardVariant = variant === 'card-grid';
  const isLargeAvatarVariant = variant === 'with-large-avatar';

  return (
    <div
      className={cn(
        isCardVariant && 'rounded-lg p-6 ring-1',
        isCardVariant &&
          (darkMode ? 'bg-gray-800 ring-gray-700' : 'bg-white ring-gray-200'),
        testimonial.featured && 'ring-2 ring-indigo-500',
        className,
      )}
    >
      <div className="flex flex-col">
        <QuoteIcon
          className={cn(
            'mb-4 h-8 w-8',
            darkMode ? 'text-indigo-400' : 'text-indigo-600',
          )}
        />

        <p className={cn('text-lg font-medium', quoteColor)}>
          "{testimonial.quote}"
        </p>

        <div
          className={cn(
            'mt-6 flex items-center',
            isLargeAvatarVariant && 'flex-col',
          )}
        >
          {testimonial.author.avatar && (
            <img
              src={getImageUrl(testimonial.author.avatar)}
              alt={testimonial.author.name}
              className={cn(
                isLargeAvatarVariant
                  ? 'mb-4 h-24 w-24 rounded-full object-cover'
                  : 'mr-3 h-10 w-10 rounded-full object-cover',
              )}
            />
          )}

          <div className={cn(isLargeAvatarVariant && 'text-center')}>
            <div className={cn('font-semibold', nameColor)}>
              {testimonial.author.name}
            </div>
            {(testimonial.author.role || testimonial.author.company) && (
              <div className={cn('text-sm', roleColor)}>
                {testimonial.author.role}
                {testimonial.author.role && testimonial.author.company && ', '}
                {testimonial.author.company}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
