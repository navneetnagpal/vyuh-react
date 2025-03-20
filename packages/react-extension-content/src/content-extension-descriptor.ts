import { ContentBuilder } from '@/content-builder';
import { ContentDescriptor } from '@/content-descriptor';
import {
  ActionConfiguration,
  ConditionConfiguration,
  ContentModifierConfiguration,
  ExtensionDescriptor,
  TypeDescriptor,
} from '@vyuh/react-core';

/**
 * Descriptor for content extensions
 */
export class ContentExtensionDescriptor extends ExtensionDescriptor {
  static readonly extensionType = 'vyuh.extension.content';

  readonly type: string = ContentExtensionDescriptor.extensionType;

  /**
   * Content descriptors
   */
  readonly contents?: ContentDescriptor[];

  /**
   * Content builders
   */
  readonly contentBuilders?: ContentBuilder[];

  /**
   * Action configurations
   */
  readonly actions?: TypeDescriptor<ActionConfiguration>[];

  /**
   * Condition configurations
   */
  readonly conditions?: TypeDescriptor<ConditionConfiguration>[];

  /**
   * Content modifier configurations
   */
  readonly contentModifiers?: TypeDescriptor<ContentModifierConfiguration>[];

  /**
   * Creates a new content extension descriptor
   */
  constructor(props?: Partial<ContentExtensionDescriptor>) {
    super(ContentExtensionDescriptor.extensionType);

    this.contents = props?.contents;
    this.contentBuilders = props?.contentBuilders;
    this.actions = props?.actions;
    this.conditions = props?.conditions;
    this.contentModifiers = props?.contentModifiers;
  }

  /**
   * Set the source feature for this extension descriptor
   * This is called by the FeatureDescriptor when the extension is registered
   */
  override setSourceFeature(featureName: string): void {
    super.setSourceFeature(featureName);

    // Also set source feature on all child descriptors
    if (this.contents) {
      for (const content of this.contents) {
        if (typeof content.setSourceFeature === 'function') {
          content.setSourceFeature(featureName);
        }
      }
    }

    if (this.contentBuilders) {
      for (const builder of this.contentBuilders) {
        if (typeof builder.setSourceFeature === 'function') {
          builder.setSourceFeature(featureName);
        }
      }
    }

    if (this.actions) {
      for (const action of this.actions) {
        if (typeof action.setSourceFeature === 'function') {
          action.setSourceFeature(featureName);
        }
      }
    }

    // Set source feature on conditions
    if (this.conditions) {
      for (const condition of this.conditions) {
        if (typeof condition.setSourceFeature === 'function') {
          condition.setSourceFeature(featureName);
        }
      }
    }

    // Set source feature on content modifiers
    if (this.contentModifiers) {
      for (const modifier of this.contentModifiers) {
        if (typeof modifier.setSourceFeature === 'function') {
          modifier.setSourceFeature(featureName);
        }
      }
    }
  }
}
