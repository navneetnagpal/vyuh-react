import { Section } from '@/shared/components/Section';
import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import { FAQQuestion, FAQSubtitle, FAQTitle, useFAQQuestions } from './FAQUtils';

/**
 * Simple FAQ layout with wide questions
 */
export const FAQSimpleWide: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions } = content;
  const { toggleQuestion, isQuestionOpen } = useFAQQuestions(questions);

  return (
    <Section>
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <div className="text-center">
          <FAQTitle title={title} className="text-gray-900" />
          <FAQSubtitle subtitle={subtitle} className="text-gray-600" />
        </div>
        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {questions.map((faq, index) => (
            <FAQQuestion
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={isQuestionOpen(index)}
              onToggle={() => toggleQuestion(index)}
            />
          ))}
        </dl>
      </div>
    </Section>
  );
};
