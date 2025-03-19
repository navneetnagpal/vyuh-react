import { Group } from '@/content/group/group';
import { LayoutConfiguration } from '@vyuh/react-core';
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
export class GroupDescriptor extends ContentDescriptor {
  /**
   * Creates a new Group descriptor
   *
   * @param options Configuration options for the descriptor
   */
  constructor(options?: { layouts?: LayoutConfiguration[] }) {
    super({
      schemaType: Group.schemaName,
      title: 'Group',
      layouts: options?.layouts,
    });
  }
}