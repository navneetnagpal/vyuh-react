import { FileReference, ImageReference } from '@/core/content/reference';
import { RouteBase } from '@/core/content/route-base';

export interface ContentProviderConfig {
  name: string;
  title: string;
}

/**
 * Base class for content providers in Vyuh
 *
 * Content providers are responsible for fetching content from various sources
 * and providing a consistent interface for accessing that content.
 */
export abstract class ContentProvider {
  readonly name: string;
  readonly title: string;

  constructor(config: ContentProviderConfig) {
    this.name = config.name;
    this.title = config.title;
  }

  /**
   * Initialize the content provider
   */
  async init(): Promise<void> {
    // Base implementation does nothing
    return Promise.resolve();
  }

  /**
   * Clean up resources used by the content provider
   */
  async dispose(): Promise<void> {
    // Base implementation does nothing
    return Promise.resolve();
  }

  /**
   * Fetch a single item by ID
   */
  abstract fetchById<T>(
    id: string,
    options: {
      useCache?: boolean;
    },
  ): Promise<T | null>;

  /**
   * Fetch a single item using a query
   */
  abstract fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T | null>;

  /**
   * Fetch multiple items using a query
   */
  abstract fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T[] | null>;

  /**
   * Fetch a route by path or ID
   */
  abstract fetchRoute(options: {
    path?: string;
    routeId?: string;
    useCache?: boolean;
  }): Promise<RouteBase | null>;

  /**
   * Get an image URL from an image reference
   */
  abstract image(
    imageRef: ImageReference,
    options?: {
      width?: number;
      height?: number;
      devicePixelRatio?: number;
      quality?: number;
      format?: string;
    },
  ): string | null;

  /**
   * Get a file URL from a file reference
   */
  abstract fileUrl(fileRef: FileReference): Promise<string | null>;

  /**
   * Extract a field value from a JSON object
   */
  fieldValue(key: string, json: Record<string, any>): string {
    return json[key];
  }

  /**
   * Get the schema type from a JSON object
   */
  schemaType(json: Record<string, any>): string {
    return this.fieldValue('type', json);
  }

  /**
   * Check if this provider supports live updates
   */
  get supportsLive(): boolean {
    return this.live !== undefined;
  }

  /**
   * Get the live content provider
   */
  get live(): LiveContentProvider | undefined {
    return undefined;
  }
}

/**
 * Interface for live content providers
 *
 * Live content providers allow for real-time updates to content
 * using promises instead of reactive streams.
 */
export interface LiveContentProvider {
  /**
   * Initialize the live content provider
   */
  init(): Promise<void>;

  /**
   * Clean up resources used by the live content provider
   */
  dispose(): Promise<void>;

  /**
   * Fetch a single item by ID with draft support
   */
  fetchById<T>(
    id: string,
    options: {
      includeDrafts?: boolean;
    },
  ): Promise<T | null>;

  /**
   * Fetch a single item using a query with draft support
   */
  fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Promise<T | null>;

  /**
   * Fetch multiple items using a query with draft support
   */
  fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Promise<T[] | null>;

  /**
   * Fetch a route by path or ID with draft support
   */
  fetchRoute(options: {
    path?: string;
    routeId?: string;
    includeDrafts?: boolean;
  }): Promise<RouteBase | null>;
}

/**
 * No-op implementation of LiveContentProvider
 */
export class NoOpLiveContentProvider implements LiveContentProvider {
  readonly title: string = 'No Op Live Provider';

  async init(): Promise<void> {
    return Promise.resolve();
  }

  async dispose(): Promise<void> {
    return Promise.resolve();
  }

  async fetchById<T>(
    id: string,
    options: {
      includeDrafts?: boolean;
    },
  ): Promise<T | null> {
    throw new Error('Live content not supported');
  }

  async fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Promise<T | null> {
    throw new Error('Live content not supported');
  }

  async fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Promise<T[] | null> {
    throw new Error('Live content not supported');
  }

  async fetchRoute(options: {
    path?: string;
    routeId?: string;
    includeDrafts?: boolean;
  }): Promise<RouteBase | null> {
    throw new Error('Live content not supported');
  }
}
