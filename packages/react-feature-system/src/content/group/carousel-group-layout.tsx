import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/components/carousel';
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
    <div className="vfs:w-full vfs:space-y-4">
      {/* Header */}
      {(content.title || content.description) && (
        <div>
          {content.title && (
            <h3 className="vfs:text-xl vfs:font-semibold">{content.title}</h3>
          )}
          {content.description && (
            <p className="vfs:text-muted-foreground vfs:text-sm">
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
        className="vfs:w-full"
      >
        <CarouselContent>
          {content.items.map((item, index) => (
            <CarouselItem
              key={index}
              className="vfs:md:basis-1/2 vfs:lg:basis-1/3"
            >
              <div className="vfs:p-1">{plugins.content.render(item)}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
