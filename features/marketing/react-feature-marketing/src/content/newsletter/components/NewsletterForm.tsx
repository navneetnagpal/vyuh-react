import { Newsletter } from '@/content/newsletter/newsletter';
import { cn } from '@/shared/utils';
import React from 'react';

interface NewsletterFormProps {
  content: Newsletter;
  className?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  content,
  className,
}) => {
  const buttonClasses = 'bg-indigo-600 text-white hover:bg-indigo-500';

  const inputClasses = 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <form action={content.formAction} method="POST" className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={cn(
            'min-w-0 flex-auto rounded-md border px-3.5 py-2',
            inputClasses,
          )}
          placeholder={content.placeholderText || 'Enter your email'}
        />
        <button
          type="submit"
          className={cn(
            'flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm',
            buttonClasses,
          )}
        >
          {content.buttonText}
        </button>
      </div>
      {content.privacyText && (
        <p
          className={cn(
            'mt-4 text-sm',
            'text-gray-500',
          )}
        >
          {content.privacyText}
        </p>
      )}
    </form>
  );
};
