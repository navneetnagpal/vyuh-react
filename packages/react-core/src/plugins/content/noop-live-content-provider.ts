import { RouteBase } from '@/content/route-base';
import { LiveContentProvider } from '@/plugins/content/content-provider';
import { Observable } from 'rxjs';

/**
 * No-op implementation of LiveContentProvider.
 *
 * This provider is used as a fallback when no live content provider is configured.
 * All methods throw errors with helpful messages to guide developers.
 */
export class NoOpLiveContentProvider implements LiveContentProvider {
  readonly title: string = 'No Op Live Provider';

  /**
   * Initialize the live content provider
   */
  async init(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Clean up resources used by the live content provider
   */
  async dispose(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Fetch a single item by ID with draft support
   */
  fetchById<T>(
    id: string,
    options: {
      includeDrafts?: boolean;
    },
  ): Observable<T | undefined> {
    throw new Error(
      `Live content not supported: fetchById called with ID ${id}`,
    );
  }

  /**
   * Fetch a single item using a query with draft support
   */
  fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T | undefined> {
    throw new Error(
      `Live content not supported: fetchSingle called with query ${query}`,
    );
  }

  /**
   * Fetch multiple items using a query with draft support
   */
  fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T[] | undefined> {
    throw new Error(
      `Live content not supported: fetchMultiple called with query ${query}`,
    );
  }

  /**
   * Fetch a route by path or ID with draft support
   */
  fetchRoute(options: {
    path?: string;
    routeId?: string;
    includeDrafts?: boolean;
  }): Observable<RouteBase | undefined> {
    throw new Error(
      `Live content not supported: fetchRoute called with ${options.path || options.routeId}`,
    );
  }
}
