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
    <div className="vfs:w-full vfs:space-y-4">
      {/* Header */}
      {(content.title || content.description) && (
        <div className="vfs:mb-6">
          {content.title && (
            <h3 className="vfs:text-2xl vfs:font-bold vfs:text-black">
              {content.title}
            </h3>
          )}
          {content.description && (
            <p className="vfs:text-muted-foreground vfs:mt-2 vfs:max-w-2xl vfs:text-sm">
              {content.description}
            </p>
          )}
        </div>
      )}

      {/* Accordion */}
      <div className="vfs:overflow-hidden vfs:rounded-xl vfs:border vfs:border-neutral-200 vfs:bg-gradient-to-br vfs:from-white vfs:to-neutral-50 vfs:p-2 dark:vfs:border-neutral-700 dark:vfs:from-neutral-900 dark:vfs:to-neutral-950">
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue}
          className="vfs:w-full"
        >
          {content.items.map((item: ContentAccordionItem, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="vfs:mb-2 vfs:overflow-hidden vfs:rounded-lg vfs:border-0 vfs:bg-white vfs:shadow-sm vfs:transition-all vfs:duration-200 vfs:last:mb-0 vfs:hover:shadow-md vfs:dark:bg-neutral-800"
            >
              <AccordionTrigger className="vfs:dark:to-neutral-750 vfs:rounded-t-lg vfs:bg-gradient-to-r vfs:from-neutral-50 vfs:to-white vfs:px-6 vfs:py-4 vfs:text-base vfs:font-medium vfs:transition-all vfs:duration-300 vfs:hover:from-blue-50 vfs:hover:to-indigo-50 vfs:hover:no-underline vfs:data-[state=open]:rounded-bl-none vfs:data-[state=open]:rounded-br-none vfs:dark:from-neutral-800 vfs:dark:hover:from-blue-950 vfs:dark:hover:to-indigo-950">
                <span className="vfs:flex vfs:items-center vfs:gap-2">
                  {item.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="vfs:border-t vfs:border-neutral-100 vfs:bg-white vfs:px-6 vfs:py-4 vfs:dark:border-neutral-700 vfs:dark:bg-neutral-800">
                <div className="vfs:prose vfs:dark:prose-invert vfs:max-w-none">
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
