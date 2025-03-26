import { FileReference, ImageReference } from '@/content/reference';
import { RouteBase } from '@/content/route-base';
import { Observable } from 'rxjs';

export interface ContentProviderConfig {
  name: string;
  title: string;
}

export enum FieldKey {
  type,
  id,
  ref,
  key,
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

  protected constructor(config: ContentProviderConfig) {
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
  ): Promise<T | undefined>;

  /**
   * Fetch a single item using a query
   */
  abstract fetchSingle<T>(
    query: string,
    options: {
      params?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T | undefined>;

  /**
   * Fetch multiple items using a query
   */
  abstract fetchMultiple<T>(
    query: string,
    options: {
      params?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T[] | undefined>;

  /**
   * Fetch a route by path or ID
   */
  abstract fetchRoute(options: {
    path?: string;
    routeId?: string;
    useCache?: boolean;
  }): Promise<RouteBase | undefined>;

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
  ): string | undefined;

  /**
   * Get a file URL from a file reference
   */
  abstract fileUrl(fileRef: FileReference): string | undefined;

  /**
   * Extract a field value from a JSON object
   */
  abstract fieldValue(
    key: FieldKey,
    json: Record<string, any>,
  ): string | undefined;

  /**
   * Get the schema type from a JSON object
   */
  abstract schemaType(json: Record<string, any>): string | undefined;

  /**
   * Get the reference from a JSON object
   */
  abstract reference(json: Record<string, any>): string | undefined;

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
  ): Observable<T | undefined>;

  /**
   * Fetch a single item using a query with draft support
   */
  fetchSingle<T>(
    query: string,
    options: {
      params?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T | undefined>;

  /**
   * Fetch multiple items using a query with draft support
   */
  fetchMultiple<T>(
    query: string,
    options: {
      params?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T[] | undefined>;

  /**
   * Fetch a route by path or ID with draft support
   */
  fetchRoute(options: {
    path?: string;
    routeId?: string;
    includeDrafts?: boolean;
  }): Observable<RouteBase | undefined>;
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

  fetchById<T>(
    id: string,
    options: {
      includeDrafts?: boolean;
    },
  ): Observable<T | undefined> {
    throw new Error('Live content not supported');
  }

  fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T | undefined> {
    throw new Error('Live content not supported');
  }

  fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T[] | undefined> {
    throw new Error('Live content not supported');
  }

  fetchRoute(options: {
    path?: string;
    routeId?: string;
    includeDrafts?: boolean;
  }): Observable<RouteBase | undefined> {
    throw new Error('Live content not supported');
  }
}
