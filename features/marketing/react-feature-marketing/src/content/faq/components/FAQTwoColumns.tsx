import { Section } from '@/shared/components/Section';
import { cn } from '@/shared/utils';
import { useVyuh } from '@vyuh/react-core';
import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import {
  FAQSubtitle,
  FAQTitle,
} from './FAQUtils';

/**
 * Two-column FAQ layout
 */
export const FAQTwoColumns: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions } = content;
  const { plugins } = useVyuh();

  const bgClass = 'bg-base-100';
  const titleClass = 'text-base-content';
  const subtitleClass = 'text-base-content/70';

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
        <div className="space-y-4">
          <div className="join join-vertical w-full">
            {leftColumnQuestions.map((faq, index) => (
              <div key={index} className="collapse collapse-arrow join-item border border-base-300 hover:bg-base-200 transition-colors duration-200">
                <input type="checkbox" />
                <div className="collapse-title text-base-content font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content text-base-content/70">
                  {faq.answer && plugins.content.render(faq.answer)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="join join-vertical w-full">
            {rightColumnQuestions.map((faq, index) => (
              <div key={index + midpoint} className="collapse collapse-arrow join-item border border-base-300 hover:bg-base-200 transition-colors duration-200">
                <input type="checkbox" />
                <div className="collapse-title text-base-content font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content text-base-content/70">
                  {faq.answer && plugins.content.render(faq.answer)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
