import { Slot } from '@radix-ui/react-slot';

import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  "vfs:inline-flex vfs:items-center vfs:justify-center vfs:gap-2 vfs:whitespace-nowrap vfs:rounded-md vfs:text-sm vfs:font-medium vfs:transition-all vfs:disabled:pointer-events-none vfs:disabled:opacity-50 [&_svg]:vfs:pointer-events-none [&_svg:not([class*='size-'])]:vfs:size-4 vfs:shrink-0 [&_svg]:vfs:shrink-0 vfs:outline-none vfs:focus-visible:border-ring vfs:focus-visible:ring-ring/50 vfs:focus-visible:ring-[3px] vfs:aria-invalid:ring-destructive/20 vfs:dark:aria-invalid:ring-destructive/40 vfs:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'vfs:bg-primary vfs:text-primary-foreground vfs:shadow-xs vfs:hover:bg-primary/90',
        destructive:
          'vfs:bg-destructive vfs:text-white vfs:shadow-xs vfs:hover:bg-destructive/90 vfs:focus-visible:ring-destructive/20 vfs:dark:focus-visible:ring-destructive/40 vfs:dark:bg-destructive/60',
        outline:
          'vfs:border vfs:bg-background vfs:shadow-xs vfs:hover:bg-accent vfs:hover:text-accent-foreground vfs:dark:bg-input/30 vfs:dark:border-input vfs:dark:hover:bg-input/50',
        secondary:
          'vfs:bg-secondary vfs:text-secondary-foreground vfs:shadow-xs vfs:hover:bg-secondary/80',
        ghost:
          'vfs:hover:bg-accent vfs:hover:text-accent-foreground vfs:dark:hover:bg-accent/50',
        link: 'vfs:text-primary vfs:underline-offset-4 vfs:hover:underline',
      },
      size: {
        default: 'vfs:h-9 vfs:px-4 vfs:py-2 vfs:has-[>svg]:px-3',
        sm: 'vfs:h-8 vfs:rounded-md vfs:gap-1.5 vfs:px-3 vfs:has-[>svg]:px-2.5',
        lg: 'vfs:h-10 vfs:rounded-md vfs:px-6 vfs:has-[>svg]:px-4',
        icon: 'vfs:size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
