import { Section } from '@/shared/components/Section';
import React from 'react';
import { FAQComponentProps } from './FAQTypes';
import { FAQContact, FAQQuestion, FAQSubtitle, FAQTitle, groupQuestionsByCategory } from './FAQUtils';

/**
 * Two-column FAQ layout
 */
export const FAQTwoColumns: React.FC<FAQComponentProps> = ({
  content,
  layout,
}) => {
  const { title, subtitle, questions, categories, contactInfo } = content;
  const { showContact } = layout;

  // Group questions by category if categories are provided
  const groupedQuestions = groupQuestionsByCategory(questions, categories);
  const hasCategories = categories && categories.length > 0;

  // Split questions into two columns for medium and larger screens
  const midpoint = Math.ceil(questions.length / 2);
  const leftColumnQuestions = questions.slice(0, midpoint);
  const rightColumnQuestions = questions.slice(midpoint);

  return (
    <Section>
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <FAQTitle title={title} />
          <FAQSubtitle subtitle={subtitle} />
        </div>

        {/* If no categories */}
        {!hasCategories && (
          <>
            {/* Mobile view - single column */}
            <div className="mx-auto mt-16 max-w-5xl md:hidden">
              <div className="space-y-4">
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
            </div>

            {/* Desktop view - two columns */}
            <div className="mx-auto mt-16 hidden max-w-5xl grid-cols-2 gap-6 md:grid">
              <div className="space-y-4">
                <div className="join join-vertical w-full">
                  {leftColumnQuestions.map((faq, index) => (
                    <FAQQuestion
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="join join-vertical w-full">
                  {rightColumnQuestions.map((faq, index) => (
                    <FAQQuestion
                      key={index + midpoint}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* If categories exist, render questions grouped by category */}
        {hasCategories && (
          <div className="mt-16 space-y-8">
            {/* Mobile view - single column with categories */}
            <div className="md:hidden">
              {categories?.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  {groupedQuestions[category]?.length > 0 && (
                    <>
                      <h3 className="mb-4 text-xl font-semibold">{category}</h3>
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
                  <h3 className="mb-4 text-xl font-semibold">
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

            {/* Desktop view - two columns with categories */}
            <div className="hidden grid-cols-2 gap-8 md:grid">
              <div className="space-y-8">
                {categories
                  ?.slice(0, Math.ceil(categories.length / 2))
                  .map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      {groupedQuestions[category]?.length > 0 && (
                        <>
                          <h3 className="mb-4 text-xl font-semibold">
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

                {/* Put uncategorized in left column if it exists */}
                {groupedQuestions.uncategorized?.length > 0 &&
                  categories.length % 2 === 0 && (
                    <div>
                      <h3 className="mb-4 text-xl font-semibold">
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

              <div className="space-y-8">
                {categories
                  ?.slice(Math.ceil(categories.length / 2))
                  .map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      {groupedQuestions[category]?.length > 0 && (
                        <>
                          <h3 className="mb-4 text-xl font-semibold">
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

                {/* Put uncategorized in right column if it exists and categories length is odd */}
                {groupedQuestions.uncategorized?.length > 0 &&
                  categories.length % 2 !== 0 && (
                    <div>
                      <h3 className="mb-4 text-xl font-semibold">
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
            </div>
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
