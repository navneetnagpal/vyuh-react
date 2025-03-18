import { ActionConfiguration } from '@/core/extensions/content/action-configuration';
import { ConditionConfiguration } from '@/core/extensions/content/condition-configuration';
import { ContentBuilder } from '@/core/extensions/content/content-builder';
import { ContentDescriptor } from '@/core/extensions/content/content-descriptor';
import { ContentModifierConfiguration } from '@/core/extensions/content/content-modifier-configuration';
import { ExtensionDescriptor } from '@/core/extensions/extension-descriptor';

/**
 * Descriptor for content extensions
 */
export class ContentExtensionDescriptor extends ExtensionDescriptor {
  static readonly extensionType = 'vyuh.extension.content';

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
  readonly actions?: ActionConfiguration[];

  /**
   * Condition configurations
   */
  readonly conditions?: ConditionConfiguration[];

  /**
   * Content modifier configurations
   */
  readonly contentModifiers?: ContentModifierConfiguration[];

  /**
   * Creates a new content extension descriptor
   */
  constructor({
    contents,
    contentBuilders,
    actions,
    conditions,
    contentModifiers,
  }: Partial<ContentExtensionDescriptor>) {
    super({ type: ContentExtensionDescriptor.extensionType });

    this.contents = contents;
    this.contentBuilders = contentBuilders;
    this.actions = actions;
    this.conditions = conditions;
    this.contentModifiers = contentModifiers;
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
