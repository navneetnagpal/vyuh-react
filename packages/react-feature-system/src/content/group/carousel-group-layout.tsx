import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ui/components/carousel';
import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Carousel layout for group content items using Shadcn UI components
 *
 * Features:
 * - Responsive carousel display using Shadcn UI
 * - Support for title and description
 * - Navigation controls
 */
export class CarouselGroupLayout extends LayoutConfiguration<Group> {
  static readonly schemaName = `${GROUP_SCHEMA_TYPE}.layout.carousel`;

  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: CarouselGroupLayout.schemaName,
      title: 'Carousel Group Layout',
    });
  }

  /**
   * Render the group content as a carousel using Shadcn UI
   */
  render(content: Group): React.ReactNode {
    return <CarouselGroupView content={content} />;
  }
}

function CarouselGroupView({ content }: { content: Group }) {
  const { plugins } = useVyuh();

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      {(content.title || content.description) && (
        <div>
          {content.title && (
            <h3 className="text-xl font-semibold">{content.title}</h3>
          )}
          {content.description && (
            <p className="text-muted-foreground text-sm">
              {content.description}
            </p>
          )}
        </div>
      )}

      {/* Shadcn Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {content.items.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">{plugins.content.render(item)}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
