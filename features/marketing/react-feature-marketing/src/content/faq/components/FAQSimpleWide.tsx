import { Section } from '@/shared/components/Section';
import { cn } from '@/shared/utils';
import { useVyuh } from '@vyuh/react-core';
import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import { FAQSubtitle, FAQTitle } from './FAQUtils';

/**
 * Simple FAQ layout with wide questions
 */
export const FAQSimpleWide: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions } = content;
  const { plugins } = useVyuh();

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <FAQTitle title={title} className="text-base-content" />
          <FAQSubtitle subtitle={subtitle} className="text-base-content/70" />
        </div>
        <div className="mt-10">
          <div className="join join-vertical w-full">
            {questions.map((faq, index) => (
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
      </div>
    </Section>
  );
};
