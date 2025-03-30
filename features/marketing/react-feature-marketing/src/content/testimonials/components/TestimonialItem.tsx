import { Testimonials } from '@/content/testimonials/testimonials';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { QuoteIcon } from 'lucide-react';
import React from 'react';

interface TestimonialItemProps {
  testimonial: Testimonials['testimonials'][0];
  className?: string;
  variant?: string;
}

export const TestimonialItem: React.FC<TestimonialItemProps> = ({
  testimonial,
  className,
  variant = 'simple-centered',
}) => {
  const { getImageUrl } = useMediaUtils();

  const quoteColor = 'text-base-content';
  const nameColor = 'text-base-content';
  const roleColor = 'text-base-content/70';

  const isCardVariant = variant === 'card-grid';
  const isLargeAvatarVariant = variant === 'with-large-avatar';

  return (
    <div
      className={cn(
        isCardVariant && 'card p-6',
        isCardVariant && 'bg-base-100 border border-base-300 transition-all duration-200 hover:shadow-md',
        testimonial.featured && 'border-2 border-primary',
        className,
      )}
    >
      <div className="flex flex-col">
        <QuoteIcon
          className={cn(
            'mb-4 h-8 w-8',
            'text-primary',
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
