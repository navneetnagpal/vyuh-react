import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Descriptor for the Group content type
 *
 * This descriptor configures:
 * - The schema type for groups
 * - Available layouts for groups
 * - Default configuration
 *
 * Example:
 * ```tsx
 * const descriptor = new GroupDescriptor({
 *   layouts: [new CustomGroupLayout()],
 * });
 * ```
 */
export class GroupDescriptor extends ContentDescriptor<Group> {
  /**
   * Creates a new Group descriptor
   *
   * @param options Configuration options for the descriptor
   */
  constructor(options?: Partial<GroupDescriptor>) {
    super({
      schemaType: GROUP_SCHEMA_TYPE,
      title: 'Group',
      layouts: options?.layouts,
    });
  }
}
