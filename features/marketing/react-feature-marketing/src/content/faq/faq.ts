import { Action, ContentItem } from '@vyuh/react-core';

export const FAQ_SCHEMA_TYPE = 'marketing.faq';

/**
 * FAQ content item for displaying FAQ sections
 *
 * FAQs can include:
 * - Title and subtitle
 * - List of questions and answers
 * - Optional categories for grouping questions
 * - Contact information for additional support
 */
export interface FAQ extends ContentItem {
  /**
   * The main title for the FAQ section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * List of questions and answers
   */
  readonly questions: Array<{
    question: string;
    answer: any; // Using any for portableText content
    category?: string;
  }>;

  /**
   * Categories for grouping questions
   */
  readonly categories?: string[];

  /**
   * Contact information for variants that include contact details
   */
  readonly contactInfo?: {
    title?: string;
    description?: string;
    email?: string;
    phone?: string;
    action?: Action;
  };
}
