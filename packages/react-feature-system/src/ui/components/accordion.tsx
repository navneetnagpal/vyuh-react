import { cn } from '@/ui/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('vfs:border-b vfs:last:border-b-0', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="vfs:flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'vfs:focus-visible:border-neutral-950 vfs:focus-visible:ring-neutral-950/50 vfs:flex vfs:flex-1 vfs:items-start vfs:justify-between vfs:gap-4 vfs:rounded-md vfs:py-4 vfs:text-left vfs:text-sm vfs:font-medium vfs:transition-all vfs:outline-none vfs:focus-visible:ring-[3px] vfs:disabled:pointer-events-none vfs:disabled:opacity-50 vfs:[&[data-state=open]>svg]:rotate-180 vfs:dark:focus-visible:border-neutral-300 vfs:dark:focus-visible:ring-neutral-300/50',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="vfs:text-neutral-500 vfs:pointer-events-none vfs:size-4 vfs:shrink-0 vfs:translate-y-0.5 vfs:transition-transform vfs:duration-200 vfs:dark:text-neutral-400" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="vfs:data-[state=closed]:animate-accordion-up vfs:data-[state=open]:animate-accordion-down vfs:overflow-hidden vfs:text-sm"
      {...props}
    >
      <div className={cn('vfs:pt-0 vfs:pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
