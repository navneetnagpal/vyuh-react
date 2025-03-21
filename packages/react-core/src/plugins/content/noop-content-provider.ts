import { FileReference, ImageReference } from '@/content/reference';
import { RouteBase } from '@/content/route-base';
import { UNKNOWN_SCHEMA_TYPE } from '@/content/unknown';
import {
  ContentProvider,
  FieldKey,
  LiveContentProvider,
} from '@/plugins/content/content-provider';
import { NoOpLiveContentProvider } from '@/plugins/content/noop-live-content-provider';

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
  ): string | undefined {
    console.warn('NoOpContentProvider: image method called');
    return undefined;
  }

  /**
   * Get a file URL from a file reference
   */
  fileUrl(fileRef: FileReference): string | undefined {
    console.warn('NoOpContentProvider: fileUrl method called');
    return undefined;
  }

  reference(json: Record<string, any>): string | undefined {
    console.warn('NoOpContentProvider: reference method called');
    return undefined;
  }

  /**
   * Get the schema type from a JSON object
   */
  schemaType(json: Record<string, any>): string {
    console.debug('NoOpContentProvider: schemaType method called');
    return json.type || UNKNOWN_SCHEMA_TYPE;
  }

  /**
   * Get a field value from a JSON object
   */
  fieldValue(key: FieldKey, json: Record<string, any>): string {
    console.warn(
      `NoOpContentProvider: fieldValue called for key ${String(key)}`,
    );
    return '';
  }

  /**
   * Initialize the content provider
   */
  async init(): Promise<void> {
    console.log('NoOpContentProvider: initialized');
    return Promise.resolve();
  }

  /**
   * Clean up resources used by the content provider
   */
  async dispose(): Promise<void> {
    console.log('NoOpContentProvider: disposed');
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
    console.debug('NoOpContentProvider: live content provider requested');
    return new NoOpLiveContentProvider();
  }
}
