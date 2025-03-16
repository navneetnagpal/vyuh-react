import { ContentPlugin } from './content-plugin';
import { ContentDescriptor } from '../../content/content-descriptor';

/**
 * Default implementation of ContentPlugin.
 */
export class DefaultContentPlugin extends ContentPlugin {
  private descriptors: Map<string, ContentDescriptor> = new Map();

  /**
   * Register a content descriptor
   */
  register(descriptor: ContentDescriptor): void {
    this.descriptors.set(descriptor.schemaType, descriptor);
  }

  /**
   * Get a content descriptor by schema type
   */
  get(schemaType: string): ContentDescriptor | undefined {
    return this.descriptors.get(schemaType);
  }

  /**
   * Get all registered content descriptors
   */
  getAll(): ContentDescriptor[] {
    return Array.from(this.descriptors.values());
  }

  /**
   * Check if a content descriptor is registered
   */
  isRegistered(schemaType: string): boolean {
    return this.descriptors.has(schemaType);
  }

  /**
   * Build content from a JSON object
   */
  buildContent(json: Record<string, any>): React.ReactNode {
    // Default implementation returns null
    // This should be overridden by the application
    return null;
  }
}