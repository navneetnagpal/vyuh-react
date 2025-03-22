import { ContentExtensionBuilder } from '@/content-extension-builder';
import {
  ContentItem,
  ContentPlugin,
  ContentProvider,
  createUnknown,
  ExtensionBuilder,
  type ItemType,
  SchemaItem,
  TypeDescriptor,
  useVyuhStore,
} from '@vyuh/react-core';
import React from 'react';
import { ErrorBoundary } from './ui/async-content-container';

/**
 * Default implementation of ContentPlugin.
 */
export class DefaultContentPlugin extends ContentPlugin {
  private extensionBuilder?: ContentExtensionBuilder;
  constructor(provider: ContentProvider) {
    super('vyuh.plugin.content.default', 'Default Content Plugin', provider);
  }

  getItem<T>(
    itemType: ItemType<T>,
    schemaType: string,
  ): TypeDescriptor<T> | undefined {
    return this.extensionBuilder?.getItem(itemType, schemaType);
  }

  registerItem<T extends SchemaItem>(
    itemType: ItemType<T>,
    descriptor: TypeDescriptor<T>,
  ): void {
    this.extensionBuilder?.registerItem(itemType, descriptor);
  }

  /**
   * Build content from a JSON object
   */
  render(json: Record<string, any> | ContentItem): React.ReactNode {
    const schemaType = json.schemaType ?? this.provider.schemaType(json);

    // Wrap the renderer in an error boundary to isolate rendering errors
    return (
      <ErrorBoundary title={`Failed to render: ${schemaType}`}>
        <ContentRenderer
          schemaType={schemaType}
          extensionBuilder={this.extensionBuilder}
          content={json as ContentItem}
        />
      </ErrorBoundary>
    );
  }

  /**
   * Attach an extension builder to this plugin
   */
  attach(extBuilder: ExtensionBuilder): void {
    const telemetry = useVyuhStore.getState().plugins.telemetry;

    if (!(extBuilder instanceof ContentExtensionBuilder)) {
      telemetry?.log(
        `For the ${this.constructor.name} to work, there must be one ContentExtensionBuilder in your extension builders. However, you have provided a ${extBuilder.constructor.name}`,
        'warning',
      );
      return;
    }

    this.extensionBuilder = extBuilder as ContentExtensionBuilder;
  }

  async dispose(): Promise<void> {
    // Dispose the content provider
    return this.provider.dispose();
  }

  async init(): Promise<void> {
    // Initialize the content provider
    return this.provider.init();
  }
}

/**
 * Component that handles the actual rendering of content in its own render phase
 */
function ContentRenderer({
  schemaType,
  content,
  extensionBuilder,
}: {
  schemaType: string;
  content: ContentItem;
  extensionBuilder?: ContentExtensionBuilder;
}) {
  const builder = extensionBuilder?.getBuilder(schemaType);
  return builder?.render(content);
}
