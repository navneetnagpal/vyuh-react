import { DefaultGroupLayout } from '@/content/group/default-group-layout';
import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Group content items
 */
export class GroupContentBuilder extends ContentBuilder<Group> {
  constructor() {
    super({
      schemaType: GROUP_SCHEMA_TYPE,
      defaultLayout: new DefaultGroupLayout(),
      defaultLayoutDescriptor: DefaultGroupLayout.typeDescriptor,
    });
  }
}
