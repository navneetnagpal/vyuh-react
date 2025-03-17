import { ContentItem } from '@/core/content/content-item';
import { ContentProvider } from '@/core/plugins/content/content-provider';
import React from 'react';
import { Plugin } from '@/core/plugins/plugin';
import { ExtensionBuilder } from '@/core/extensions/extension-builder';

/**
 * Plugin for managing content
 */
export abstract class ContentPlugin extends Plugin {
  /**
   * The content provider
   */
  readonly provider: ContentProvider;

  /**
   * Creates a new content plugin
   */
  protected constructor(
    name: string,
    title: string,
    provider: ContentProvider,
  ) {
    super(name, title);
    this.provider = provider;
  }

  /**
   * Build content from a JSON object
   */
  abstract render(json: ContentItem): React.ReactNode;

  /**
   * Attach an extension builder to this plugin
   */
  abstract attach(extBuilder: ExtensionBuilder): void;
}
