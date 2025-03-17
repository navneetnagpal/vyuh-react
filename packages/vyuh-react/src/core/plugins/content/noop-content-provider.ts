import { FileReference, ImageReference } from '@/core/content/reference';
import { RouteBase } from '@/core/content/route-base';
import {
  ContentProvider,
  LiveContentProvider,
} from '@/core/plugins/content/content-provider';
import { NoOpLiveContentProvider } from '@/core/plugins/content/noop-live-content-provider';

/**
 * No-op implementation of ContentProvider.
 *
 * This provider is used as a fallback when no content provider is configured.
 * All methods return null or empty values and log appropriate warnings.
 */
export class NoOpContentProvider extends ContentProvider {
  constructor() {
    super({
      name: 'vyuh.contentProvider.noop',
      title: 'No Op Content Provider',
    });
  }

  /**
   * Get an image URL from an image reference
   */
  image(
    imageRef: ImageReference,
    options?: {
      width?: number;
      height?: number;
      devicePixelRatio?: number;
      quality?: number;
      format?: string;
    },
  ): string | null {
    console.warn('NoOpContentProvider: image method called');
    return null;
  }

  /**
   * Get a file URL from a file reference
   */
  async fileUrl(fileRef: FileReference): Promise<string | null> {
    console.warn('NoOpContentProvider: fileUrl method called');
    return null;
  }

  /**
   * Get the schema type from a JSON object
   */
  schemaType(json: Record<string, any>): string {
    return json.type || 'unknown';
  }

  /**
   * Get a field value from a JSON object
   */
  fieldValue(key: string, json: Record<string, any>): string {
    return json[key];
  }

  /**
   * Initialize the content provider
   */
  async init(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Clean up resources used by the content provider
   */
  async dispose(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Fetch a single item by ID
   */
  async fetchById<T>(
    id: string,
    options: {
      useCache?: boolean;
    },
  ): Promise<T | null> {
    console.warn(`NoOpContentProvider: fetchById called with ID ${id}`);
    return null;
  }

  /**
   * Fetch a single item using a query
   */
  async fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T | null> {
    console.warn(`NoOpContentProvider: fetchSingle called with query ${query}`);
    return null;
  }

  /**
   * Fetch multiple items using a query
   */
  async fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T[] | null> {
    console.warn(
      `NoOpContentProvider: fetchMultiple called with query ${query}`,
    );
    return null;
  }

  /**
   * Fetch a route by path or ID
   */
  async fetchRoute(options: {
    path?: string;
    routeId?: string;
    useCache?: boolean;
  }): Promise<RouteBase | null> {
    console.warn(
      `NoOpContentProvider: fetchRoute called with ${options.path || options.routeId}`,
    );
    return null;
  }

  /**
   * Get the live content provider
   */
  get live(): LiveContentProvider {
    return new NoOpLiveContentProvider();
  }
}
