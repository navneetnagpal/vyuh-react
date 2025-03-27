import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import {
  FAQContact,
  FAQQuestion,
  FAQSubtitle,
  FAQTitle,
  useFAQQuestions,
} from './FAQUtils';

/**
 * FAQ layout with contact information
 */
export const FAQWithContact: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions, contactInfo } = content;
  const { darkMode } = layout;
  const { toggleQuestion, isQuestionOpen } = useFAQQuestions(questions);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const titleClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtitleClass = darkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`${bgClass} py-16 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <FAQTitle title={title} className={titleClass} />
          <FAQSubtitle subtitle={subtitle} className={subtitleClass} />
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-2">
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
          </div>
          <div>
            <FAQContact contactInfo={contactInfo} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};
