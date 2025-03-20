import { ContentItem } from '@/content/content-item';
import { ExtensionBuilder } from '@/core/extension-builder';
import { ItemType } from '@/core/platform-types';
import { ContentPlugin } from '@/plugins/content/content-plugin';
import { NoOpContentProvider } from '@/plugins/content/noop-content-provider';
import React from 'react';

/**
 * No-op implementation of ContentPlugin.
 *
 * This plugin is used as a fallback when no content plugin is configured.
 * It provides helpful error messages to guide developers.
 */
export class NoOpContentPlugin extends ContentPlugin {
  constructor() {
    super(
      'vyuh.plugin.content.noop',
      'No Op Content Plugin',
      new NoOpContentProvider(),
    );
  }

  /**
   * Render content with a helpful error message
   */
  render(content: Record<string, any> | ContentItem): React.ReactNode {
    const schemaType =
      content.schemaType ??
      this.provider.schemaType(content as Record<string, any>);

    return (
      <div
        style={{
          padding: '1rem',
          border: '1px solid #f56565',
          borderRadius: '0.375rem',
          backgroundColor: '#fff5f5',
          color: '#c53030',
          margin: '1rem 0',
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}
        >
          No Content Plugin Configured
        </h3>
        <p style={{ marginBottom: '0.5rem' }}>
          No content plugin configured to render content of type:{' '}
          <code
            style={{
              backgroundColor: '#f7fafc',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontFamily: 'monospace',
            }}
          >
            {schemaType}
          </code>
        </p>
        <p style={{ marginBottom: '0.5rem' }}>You have three options:</p>
        <ol
          style={{
            paddingLeft: '1.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <li style={{ marginBottom: '0.25rem' }}>
            Configure one of the default ContentPlugin-s to render this content.
          </li>
          <li style={{ marginBottom: '0.25rem' }}>
            Create a custom ContentPlugin to render this content.
          </li>
          <li style={{ marginBottom: '0.25rem' }}>
            Configure a custom route to handle this path.
          </li>
        </ol>
      </div>
    );
  }

  /**
   * Always returns undefined as no items are registered
   */
  getItem<T>(itemType: ItemType<T>, schemaType: string): T | undefined {
    return undefined;
  }

  /**
   * No-op implementation of attach
   */
  attach(extBuilder: ExtensionBuilder): void {
    // No-op
  }

  /**
   * No-op implementation of dispose
   */
  async dispose(): Promise<void> {
    return this.provider.dispose();
  }

  /**
   * No-op implementation of init
   */
  async init(): Promise<void> {
    return this.provider.init();
  }
}
