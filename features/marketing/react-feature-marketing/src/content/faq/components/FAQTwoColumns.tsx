import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import { FAQQuestion, FAQSubtitle, FAQTitle, useFAQQuestions } from './FAQUtils';

/**
 * Two-column FAQ layout
 */
export const FAQTwoColumns: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions } = content;
  const { darkMode } = layout;
  const { toggleQuestion, isQuestionOpen } = useFAQQuestions(questions);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const titleClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtitleClass = darkMode ? 'text-gray-300' : 'text-gray-600';

  // Split questions into two columns
  const midpoint = Math.ceil(questions.length / 2);
  const leftColumnQuestions = questions.slice(0, midpoint);
  const rightColumnQuestions = questions.slice(midpoint);

  return (
    <div className={`${bgClass} py-16 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <FAQTitle title={title} className={titleClass} />
          <FAQSubtitle subtitle={subtitle} className={subtitleClass} />
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            {leftColumnQuestions.map((faq, index) => (
              <FAQQuestion
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={isQuestionOpen(index)}
                onToggle={() => toggleQuestion(index)}
                darkMode={darkMode}
              />
            ))}
          </div>
          <div className="space-y-6">
            {rightColumnQuestions.map((faq, index) => (
              <FAQQuestion
                key={index + midpoint}
                question={faq.question}
                answer={faq.answer}
                isOpen={isQuestionOpen(index + midpoint)}
                onToggle={() => toggleQuestion(index + midpoint)}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
