import { FAQ } from '@/content/faq/faq';
import { cn } from '@/shared/utils';
import { executeAction, useVyuh } from '@vyuh/react-core';
import { Mail, Phone } from 'lucide-react';
import React from 'react';

/**
 * Group questions by category
 */
export function groupQuestionsByCategory(
  questions: FAQ['questions'],
  categories?: string[],
) {
  if (!categories || categories.length === 0) {
    return { uncategorized: questions };
  }

  const groupedQuestions: Record<string, any[]> = {
    uncategorized: [],
  };

  // Initialize categories
  categories.forEach((category) => {
    groupedQuestions[category] = [];
  });

  // Group questions by category
  questions.forEach((question) => {
    if (question.category && groupedQuestions[question.category]) {
      groupedQuestions[question.category].push(question);
    } else {
      groupedQuestions.uncategorized.push(question);
    }
  });

  return groupedQuestions;
}

/**
 * FAQ section title component
 */
export function FAQTitle({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn('text-3xl font-bold tracking-tight text-base-content sm:text-4xl', className)}
    >
      {title}
    </h2>
  );
}

/**
 * FAQ section subtitle component
 */
export function FAQSubtitle({
  subtitle,
  className = '',
}: {
  subtitle?: string;
  className?: string;
}) {
  if (!subtitle) return null;

  return <p className={cn('mt-4 text-lg text-base-content/70', className)}>{subtitle}</p>;
}

/**
 * FAQ question component with disclosure functionality
 */
export function FAQQuestion({
  question,
  answer,
  className = '',
  category = '',
}: {
  question: string;
  answer: any;
  className?: string;
  category?: string;
}) {
  const { plugins } = useVyuh();

  return (
    <div
      className={cn(
        'collapse-arrow join-item border-base-300 collapse border',
        className,
      )}
    >
      <input type="checkbox" />
      <div className="collapse-title text-base-content font-semibold">
        {question}
      </div>
      <div className="collapse-content text-base-content/80">
        {answer && plugins.content.render(answer)}
      </div>
    </div>
  );
}

/**
 * FAQ contact information component
 */
export function FAQContact({
  contactInfo,
  className = '',
}: {
  contactInfo?: FAQ['contactInfo'];
  className?: string;
}) {
  if (!contactInfo) return null;

  const { title, description, email, phone, action } = contactInfo;

  const handleActionClick = () => {
    if (action) {
      // Execute the action using the executeAction function
      executeAction(action);
    }
  };

  return (
    <div
      className={cn(
        'card bg-base-100 border-base-300 w-full border shadow-lg',
        className,
      )}
    >
      <div className="card-body text-center">
        {title && (
          <h3 className="card-title text-primary justify-center text-2xl font-bold">
            {title || 'Need help?'}
          </h3>
        )}
        {description && (
          <p className="text-base-content/80 mt-2">
            {description || 'Our team is here to assist you'}
          </p>
        )}

        <div className="divider"></div>

        <div className="space-y-4">
          {email && (
            <div className="flex items-center justify-center gap-3">
              <Mail className="text-primary h-5 w-5" aria-hidden="true" />
              <a
                href={`mailto:${email}`}
                className="link link-hover text-base-content transition-colors duration-200"
              >
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div className="flex items-center justify-center gap-3">
              <Phone className="text-primary h-5 w-5" aria-hidden="true" />
              <a
                href={`tel:${phone}`}
                className="link link-hover text-base-content transition-colors duration-200"
              >
                {phone}
              </a>
            </div>
          )}
        </div>

        {action && (
          <div className="card-actions mt-6 justify-center">
            <button
              onClick={handleActionClick}
              className="btn btn-primary btn-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            >
              {action.title || 'Contact Us'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Hook for managing FAQ question state
 */
// Hook removed as we're now using DaisyUI's collapse component

/**
 * FAQ section title component
 */
// Function moved to the top of the file
