import {
  Accordion as ContentAccordion,
  ACCORDION_SCHEMA_TYPE,
  AccordionItem as ContentAccordionItem,
} from '@/content/accordion/accordion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/components/accordion';
import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Default layout for accordion content items using Shadcn UI components
 *
 * Features:
 * - Beautiful themed design with animations
 * - First item expanded by default
 * - Support for title and description
 * - Animated chevron indicators
 */
export class DefaultAccordionLayout extends LayoutConfiguration<ContentAccordion> {
  static readonly schemaName = `${ACCORDION_SCHEMA_TYPE}.layout.default`;
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultAccordionLayout.schemaName,
      title: 'Default Accordion Layout',
    });
  }

  /**
   * Render the accordion content with Shadcn styling
   */
  render(content: ContentAccordion): React.ReactNode {
    return <AccordionView content={content} />;
  }
}

/**
 * Functional component for rendering accordion content using shadcn UI components
 */
const AccordionView: React.FC<{ content: ContentAccordion }> = ({
  content,
}) => {
  const { plugins } = useVyuh();

  // Default value for the first item to be expanded
  const defaultValue = content.items.length > 0 ? `item-0` : undefined;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      {(content.title || content.description) && (
        <div className="mb-6">
          {content.title && (
            <h3 className="text-2xl font-bold text-black">{content.title}</h3>
          )}
          {content.description && (
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
              {content.description}
            </p>
          )}
        </div>
      )}

      {/* Accordion */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-2 dark:border-neutral-700 dark:from-neutral-900 dark:to-neutral-950">
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue}
          className="w-full"
        >
          {content.items.map((item: ContentAccordionItem, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="mb-2 overflow-hidden rounded-lg border-0 bg-white shadow-sm transition-all duration-200 last:mb-0 hover:shadow-md dark:bg-neutral-800"
            >
              <AccordionTrigger className="dark:to-neutral-750 rounded-t-lg bg-gradient-to-r from-neutral-50 to-white px-6 py-4 text-base font-medium transition-all duration-300 hover:from-blue-50 hover:to-indigo-50 hover:no-underline data-[state=open]:rounded-bl-none data-[state=open]:rounded-br-none dark:from-neutral-800 dark:hover:from-blue-950 dark:hover:to-indigo-950">
                <span className="flex items-center gap-2">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent className="border-t border-neutral-100 bg-white px-6 py-4 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="prose dark:prose-invert max-w-none">
                  <AccordionItemView item={item} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

function AccordionItemView({ item }: { item: ContentAccordionItem }) {
  const { plugins } = useVyuh();

  const childItem = Array.isArray(item.content) ? item.content[0] : undefined;

  return childItem ? plugins.content.render(childItem) : null;
}
