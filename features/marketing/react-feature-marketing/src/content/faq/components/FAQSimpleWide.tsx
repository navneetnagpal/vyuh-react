import { Section } from '@/shared/components/Section';
import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import { FAQContact, FAQQuestion, FAQSubtitle, FAQTitle, groupQuestionsByCategory } from './FAQUtils';

/**
 * Simple FAQ layout with wide questions
 */
export const FAQSimpleWide: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions, categories, contactInfo } = content;
  const { showContact } = layout;

  // Group questions by category if categories are provided
  const groupedQuestions = groupQuestionsByCategory(questions, categories);
  const hasCategories = categories && categories.length > 0;

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <FAQTitle title={title} />
          <FAQSubtitle subtitle={subtitle} />
        </div>

        {/* If no categories, render all questions */}
        {!hasCategories && (
          <div className="mt-10">
            <div className="join join-vertical w-full">
              {questions.map((faq, index) => (
                <FAQQuestion
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        )}

        {/* If categories exist, render questions grouped by category */}
        {hasCategories && (
          <div className="mt-10 space-y-8">
            {categories?.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {groupedQuestions[category]?.length > 0 && (
                  <>
                    <h3 className="text-base-content mb-4 text-xl font-bold">
                      {category}
                    </h3>
                    <div className="join join-vertical w-full">
                      {groupedQuestions[category].map((faq, faqIndex) => (
                        <FAQQuestion
                          key={faqIndex}
                          question={faq.question}
                          answer={faq.answer}
                          category={category}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Render uncategorized questions if any */}
            {groupedQuestions.uncategorized?.length > 0 && (
              <div>
                <h3 className="text-base-content mb-4 text-xl font-bold">
                  Other Questions
                </h3>
                <div className="join join-vertical w-full">
                  {groupedQuestions.uncategorized.map((faq, faqIndex) => (
                    <FAQQuestion
                      key={faqIndex}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact section */}
        {showContact && contactInfo && (
          <div className="mx-auto mt-16 max-w-md">
            <FAQContact contactInfo={contactInfo} />
          </div>
        )}
      </div>
    </Section>
  );
};
