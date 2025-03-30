import { FAQSimpleWide } from '@/content/faq/components/FAQSimpleWide';
import { FAQTwoColumns } from '@/content/faq/components/FAQTwoColumns';
import { FAQ, FAQ_SCHEMA_TYPE } from '@/content/faq/faq';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * FAQ layout variant type
 */
export type FAQVariant = 'simple-wide' | 'two-columns';

/**
 * Default layout for FAQ content items
 *
 * Features:
 * - Support for multiple variants
 * - Responsive design
 * - Tailwind CSS styling
 */
export class DefaultFAQLayout extends LayoutConfiguration<FAQ> {
  static readonly schemaName = `${FAQ_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant: FAQVariant;
  readonly showContact: boolean;

  constructor(props?: Partial<DefaultFAQLayout>) {
    super({
      schemaType: DefaultFAQLayout.schemaName,
      title: 'Default FAQ Layout',
    });

    this.variant = props?.variant ?? 'simple-wide';
    this.showContact = props?.showContact ?? true;
  }

  /**
   * Render the FAQ content based on the selected variant
   */
  render(content: FAQ): React.ReactNode {
    return <FAQView content={content} layout={this} />;
  }
}

/**
 * FAQView component for rendering FAQ content with the appropriate variant
 */
interface FAQViewProps {
  content: FAQ;
  layout: DefaultFAQLayout;
}

const FAQView: React.FC<FAQViewProps> = ({ content, layout }) => {
  const { variant } = layout;

  // Render the appropriate variant
  switch (variant) {
    case 'simple-wide':
      return <FAQSimpleWide content={content} layout={layout} />;
    case 'two-columns':
      return <FAQTwoColumns content={content} layout={layout} />;
    default:
      return <FAQSimpleWide content={content} layout={layout} />;
  }
};
