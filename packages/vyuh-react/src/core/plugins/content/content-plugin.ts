import { Plugin } from '../plugin';
import { ContentDescriptor } from '../../content/content-descriptor';

/**
 * Plugin for managing content in the Vyuh platform.
 */
export abstract class ContentPlugin extends Plugin {
  /**
   * Register a content descriptor
   */
  abstract register(descriptor: ContentDescriptor): void;

  /**
   * Get a content descriptor by schema type
   */
  abstract get(schemaType: string): ContentDescriptor | undefined;

  /**
   * Get all registered content descriptors
   */
  abstract getAll(): ContentDescriptor[];

  /**
   * Check if a content descriptor is registered
   */
  abstract isRegistered(schemaType: string): boolean;

  /**
   * Build content from a JSON object
   */
  abstract buildContent(json: Record<string, any>): React.ReactNode;
}
