import { ContentDescriptor } from '../../plugins/content/content-descriptor';
import { ContentBuilder } from '../../plugins/content/content-builder';
import { ExtensionDescriptor } from '../extension-descriptor';

/**
 * Descriptor for content extensions
 */
export class ContentExtensionDescriptor extends ExtensionDescriptor {
  /**
   * Content descriptors
   */
  readonly contents?: ContentDescriptor[];

  /**
   * Content builders
   */
  readonly contentBuilders?: ContentBuilder[];

  /**
   * Layout descriptors
   */
  readonly layouts?: any[];

  /**
   * Action descriptors
   */
  readonly actions?: any[];

  /**
   * Condition descriptors
   */
  readonly conditions?: any[];

  /**
   * Creates a new content extension descriptor
   */
  constructor({
    contents,
    contentBuilders,
    layouts,
    actions,
    conditions,
  }: {
    contents?: ContentDescriptor[];
    contentBuilders?: ContentBuilder[];
    layouts?: any[];
    actions?: any[];
    conditions?: any[];
  }) {
    super({ type: 'content' });
    this.contents = contents;
    this.contentBuilders = contentBuilders;
    this.layouts = layouts;
    this.actions = actions;
    this.conditions = conditions;
  }
}
