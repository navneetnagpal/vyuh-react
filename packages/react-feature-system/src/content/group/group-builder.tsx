import { CarouselGroupLayout } from '@/content/group/carousel-group-layout';
import { Group } from '@/content/group/group';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Group content items
 */
export class GroupContentBuilder extends ContentBuilder<Group> {
  static readonly schemaName: string = Group.schemaName;

  constructor() {
    super({
      schemaType: GroupContentBuilder.schemaName,
      defaultLayout: new CarouselGroupLayout(),
    });
  }
}
