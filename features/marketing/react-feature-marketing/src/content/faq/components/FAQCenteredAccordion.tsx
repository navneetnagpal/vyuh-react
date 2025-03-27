import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import {
  FAQQuestion,
  FAQSubtitle,
  FAQTitle,
  groupQuestionsByCategory,
  useFAQQuestions,
} from './FAQUtils';

/**
 * Centered accordion FAQ layout with category support
 */
export const FAQCenteredAccordion: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions, categories } = content;
  const { darkMode } = layout;
  const { toggleQuestion, isQuestionOpen } = useFAQQuestions(questions);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const titleClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtitleClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const categoryClass = darkMode ? 'text-gray-200' : 'text-gray-800';

  // Group questions by category if categories are provided
  const groupedQuestions = groupQuestionsByCategory(questions, categories);

  return (
    <div className={`${bgClass} py-16 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <FAQTitle title={title} className={titleClass} />
          <FAQSubtitle subtitle={subtitle} className={subtitleClass} />
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          {categories && categories.length > 0 ? (
            // Render categorized questions
            Object.entries(groupedQuestions).map(
              ([category, categoryQuestions]) =>
                categoryQuestions.length > 0 && (
                  <div key={category} className="mb-12">
                    {category !== 'uncategorized' && (
                      <h3
                        className={`mb-6 text-xl font-semibold ${categoryClass}`}
                      >
                        {category}
                      </h3>
                    )}
                    <dl className="space-y-6 divide-y divide-gray-900/10">
                      {categoryQuestions.map((faq, index) => {
                        // Find the original index in the questions array
                        const originalIndex = questions.findIndex(
                          (q) => q.question === faq.question,
                        );
                        return (
                          <FAQQuestion
                            key={originalIndex}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={isQuestionOpen(originalIndex)}
                            onToggle={() => toggleQuestion(originalIndex)}
                            darkMode={darkMode}
                          />
                        );
                      })}
                    </dl>
                  </div>
                ),
            )
          ) : (
            // Render all questions without categories
            <dl className="space-y-6 divide-y divide-gray-900/10">
              {questions.map((faq, index) => (
                <FAQQuestion
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={isQuestionOpen(index)}
                  onToggle={() => toggleQuestion(index)}
                  darkMode={darkMode}
                />
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};
