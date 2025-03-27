import { FAQ } from '@/content/faq/faq';
import { cn } from '@/content/shared/utils';
import { Action, useVyuh } from '@vyuh/react-core';
import { Mail, Phone } from 'lucide-react';
import React, { useState } from 'react';

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
      className={cn(
        'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl',
        className,
      )}
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

  return (
    <p className={cn('mt-4 text-lg text-gray-600', className)}>{subtitle}</p>
  );
}

/**
 * FAQ question component with disclosure functionality
 */
export function FAQQuestion({
  question,
  answer,
  isOpen,
  onToggle,
  className = '',
  darkMode = false,
}: {
  question: string;
  answer: any;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  darkMode?: boolean;
}) {
  const textColorClass = darkMode ? 'text-white' : 'text-gray-900';
  const answerColorClass = darkMode ? 'text-gray-300' : 'text-gray-600';

  const { plugins } = useVyuh();

  return (
    <div className={cn('pt-6', className)}>
      <dt>
        <button
          type="button"
          className={cn(
            'flex w-full items-start justify-between text-left',
            textColorClass,
          )}
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="text-base font-semibold leading-7">{question}</span>
          <span className="ml-6 flex h-7 items-center">
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H6"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            )}
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="mt-2 pr-12">
          <div className={cn('text-base leading-7', answerColorClass)}>
            {answer && plugins.content.render(answer)}
          </div>
        </dd>
      )}
    </div>
  );
}

/**
 * FAQ contact information component
 */
export function FAQContact({
  contactInfo,
  className = '',
  darkMode = false,
}: {
  contactInfo?: FAQ['contactInfo'];
  className?: string;
  darkMode?: boolean;
}) {
  if (!contactInfo) return null;

  const { title, description, email, phone, action } = contactInfo;
  const textColorClass = darkMode ? 'text-white' : 'text-gray-900';
  const descColorClass = darkMode ? 'text-gray-300' : 'text-gray-600';

  const handleActionClick = () => {
    if (action) {
      // Create a new instance of the action and execute it
      const actionInstance = new Action(action);
      actionInstance.execute();
    }
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-white px-6 py-10 shadow-md',
        darkMode ? 'bg-gray-800' : 'bg-white',
        className,
      )}
    >
      {title && (
        <h3
          className={cn(
            'text-2xl font-bold leading-10 tracking-tight',
            textColorClass,
          )}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className={cn('mt-4 leading-7', descColorClass)}>{description}</p>
      )}

      <dl className="mt-8 space-y-6">
        {email && (
          <div className="flex gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Email</span>
              <Mail
                className={cn(
                  'h-7 w-6',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
                aria-hidden="true"
              />
            </dt>
            <dd>
              <a
                href={`mailto:${email}`}
                className={cn(
                  'hover:underline',
                  darkMode ? 'text-gray-300' : 'text-gray-700',
                )}
              >
                {email}
              </a>
            </dd>
          </div>
        )}
        {phone && (
          <div className="flex gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Telephone</span>
              <Phone
                className={cn(
                  'h-7 w-6',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
                aria-hidden="true"
              />
            </dt>
            <dd>
              <a
                href={`tel:${phone}`}
                className={cn(
                  'hover:underline',
                  darkMode ? 'text-gray-300' : 'text-gray-700',
                )}
              >
                {phone}
              </a>
            </dd>
          </div>
        )}
      </dl>

      {action && (
        <div className="mt-8">
          <button
            onClick={handleActionClick}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {action.title}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Hook for managing FAQ question state
 */
export function useFAQQuestions(questions: FAQ['questions']) {
  const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
    {},
  );

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isQuestionOpen = (index: number) => !!openQuestions[index];

  return {
    toggleQuestion,
    isQuestionOpen,
  };
}

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

  const grouped: Record<string, typeof questions> = {};

  // Initialize categories
  categories.forEach((category) => {
    grouped[category] = [];
  });
  grouped.uncategorized = [];

  // Group questions
  questions.forEach((question) => {
    if (question.category && categories.includes(question.category)) {
      grouped[question.category].push(question);
    } else {
      grouped.uncategorized.push(question);
    }
  });

  return grouped;
}
