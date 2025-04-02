import { cn } from '@/ui/lib/utils';
import * as React from 'react';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'vfs:bg-card vfs:text-card-foreground vfs:flex vfs:flex-col vfs:gap-6 vfs:overflow-hidden vfs:rounded-xl vfs:border vfs:shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'vfs:@container/card-header vfs:grid vfs:auto-rows-min vfs:grid-rows-[auto_auto] vfs:items-start vfs:gap-1.5 vfs:pb-4 vfs:has-[data-slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'vfs:px-4 vfs:pt-4 vfs:font-semibold vfs:leading-none',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'vfs:text-muted-foreground vfs:px-4 vfs:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'vfs:col-start-2 vfs:row-span-2 vfs:row-start-1 vfs:self-start vfs:justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('vfs:px-6', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'vfs:[.border-t]:pt-6 vfs:flex vfs:items-center vfs:px-6',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
