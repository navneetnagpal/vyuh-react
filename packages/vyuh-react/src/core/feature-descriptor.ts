import { IconType } from 'react-icons';
import { ContentDescriptor } from './content/content-descriptor';
import { ExtensionBuilder } from './extensions/extension-builder';
import { ExtensionDescriptor } from './extensions/extension-descriptor';

/**
 * Describes a feature in the Vyuh platform.
 * Features are modular components that can be composed to build an application.
 */
export class FeatureDescriptor {
  /**
   * Unique name of the feature
   */
  readonly name: string;

  /**
   * Human-readable title of the feature
   */
  readonly title: string;

  /**
   * Optional description of the feature
   */
  readonly description?: string;

  /**
   * Optional icon for the feature
   */
  readonly icon?: IconType;

  /**
   * Optional list of extensions provided by this feature
   */
  readonly extensions?: ExtensionDescriptor[];

  /**
   * Optional list of extension builders exposed by this feature
   */
  readonly extensionBuilders?: ExtensionBuilder[];

  /**
   * Optional list of content descriptors provided by this feature
   */
  readonly contents?: ContentDescriptor[];

  /**
   * Initialize the feature
   */
  readonly init?: () => Promise<void>;

  /**
   * Clean up resources when the feature is no longer needed
   */
  readonly dispose?: () => Promise<void>;

  /**
   * Creates a new feature descriptor
   */
  constructor({
    name,
    title,
    description,
    icon,
    extensions,
    extensionBuilders,
    contents,
    init,
    dispose,
  }: {
    name: string;
    title: string;
    description?: string;
    icon?: IconType;
    extensions?: ExtensionDescriptor[];
    extensionBuilders?: ExtensionBuilder[];
    contents?: ContentDescriptor[];
    init?: () => Promise<void>;
    dispose?: () => Promise<void>;
  }) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.icon = icon;
    this.extensions = extensions;
    this.extensionBuilders = extensionBuilders;
    this.contents = contents;
    this.init = init;
    this.dispose = dispose;

    // Set the source feature in all extension builders
    if (extensionBuilders) {
      for (const extensionBuilder of extensionBuilders) {
        extensionBuilder.setSourceFeature(name);
      }
    }

    // Set the source feature in all extensions
    if (extensions) {
      for (const extension of extensions) {
        extension.setSourceFeature(name);
      }
    }

    // Set the source feature in all content descriptors
    if (contents) {
      for (const content of contents) {
        content.setSourceFeature(name);
      }
    }
  }
}
