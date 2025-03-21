import { DefaultGroupLayout } from '@/content/group/default-group-layout';
import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Group content items
 */
export class GroupContentBuilder extends ContentBuilder<Group> {
  static readonly schemaName: string = GROUP_SCHEMA_TYPE;

  constructor() {
    super({
      schemaType: GroupContentBuilder.schemaName,
      defaultLayout: new DefaultGroupLayout(),
      defaultLayoutDescriptor: DefaultGroupLayout.typeDescriptor,
    });
  }
}
