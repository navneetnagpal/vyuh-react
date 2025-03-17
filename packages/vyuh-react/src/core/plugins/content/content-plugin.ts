import { ContentProvider } from '@/core/plugins/content/content-provider';
import React from 'react';
import { ContentBuilder } from './content-builder';
import { Plugin } from '../plugin';

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
  constructor(name: string, title: string, provider: ContentProvider) {
    super(name, title);
    this.provider = provider;
  }

  /**
   * Register a content builder
   */
  abstract registerBuilder(builder: ContentBuilder): void;

  /**
   * Get a content builder by schema type
   */
  abstract getBuilder(schemaType: string): ContentBuilder | undefined;

  /**
   * Get all registered content builders
   */
  abstract getAllBuilders(): ContentBuilder[];

  /**
   * Check if a content builder is registered
   */
  abstract isRegistered(schemaType: string): boolean;

  /**
   * Build content from a JSON object
   */
  abstract render(json: Record<string, any>): React.ReactNode;
}
