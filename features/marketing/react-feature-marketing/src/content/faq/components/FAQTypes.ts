import { DefaultFAQLayout } from '@/content/faq/default-faq-layout';
import { FAQ } from '@/content/faq/faq';

/**
 * Common interface for all FAQ components
 */
export interface FAQComponentProps {
  content: FAQ;
  layout: DefaultFAQLayout;
}
