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
  // Using DaisyUI classes for button and input

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
          className="input input-bordered w-full"
          placeholder={content.placeholderText || 'Enter your email'}
        />
        <button
          type="submit"
          className="btn btn-primary font-semibold"
        >
          {content.buttonText}
        </button>
      </div>
      {content.privacyText && (
        <p className="mt-4 text-sm text-base-content/60">
          {content.privacyText}
        </p>
      )}
    </form>
  );
};
