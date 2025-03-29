import { Section } from '@/shared/components/Section';
import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import {
  FAQQuestion,
  FAQSubtitle,
  FAQTitle,
  useFAQQuestions,
} from './FAQUtils';

/**
 * Two-column FAQ layout
 */
export const FAQTwoColumns: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions } = content;
  const { toggleQuestion, isQuestionOpen } = useFAQQuestions(questions);

  const bgClass = 'bg-white';
  const titleClass = 'text-gray-900';
  const subtitleClass = 'text-gray-600';

  // Split questions into two columns
  const midpoint = Math.ceil(questions.length / 2);
  const leftColumnQuestions = questions.slice(0, midpoint);
  const rightColumnQuestions = questions.slice(midpoint);

  return (
    <Section>
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
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
