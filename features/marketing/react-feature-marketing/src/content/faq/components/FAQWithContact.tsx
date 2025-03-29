import { Section } from '@/shared/components/Section';
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
  const { toggleQuestion, isQuestionOpen } = useFAQQuestions(questions);

  const bgClass = 'bg-white';
  const titleClass = 'text-gray-900';
  const subtitleClass = 'text-gray-600';

  return (
    <Section padding="lg">
      <div className="mx-auto max-w-4xl text-center">
        <FAQTitle title={title} className={titleClass} />
        <FAQSubtitle subtitle={subtitle} className={subtitleClass} />
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-0 md:gap-8 lg:grid-cols-3">
        <div className="col-span-2">
          <dl className="space-y-6 divide-y divide-gray-900/10">
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
        <FAQContact contactInfo={contactInfo} />
      </div>
    </Section>
  );
};
