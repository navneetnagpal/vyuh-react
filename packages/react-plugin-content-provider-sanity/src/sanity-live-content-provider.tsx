import { SanityClient } from '@sanity/client';
import { LiveContentProvider, RouteBase } from '@vyuh/react-core';
import { defineLive } from 'next-sanity';

export class SanityLiveContentProvider implements LiveContentProvider {
  private readonly client: SanityClient;
  private liveClient: ReturnType<typeof defineLive>;
  readonly title: string = 'Sanity Live Content Provider';

  constructor(client: SanityClient) {
    this.client = client;
    this.liveClient = defineLive({
      client: this.client,
      browserToken: this.client.config().token,
      serverToken: this.client.config().token,
    });
  }

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
    const query = `*[_id == $id][0]`;
    const params = { id };

    const { data } = await this.liveClient.sanityFetch({
      query,
      params,
      perspective: options.includeDrafts ? 'drafts' : 'published',
    });

    return data as T;
  }

  async fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Promise<T | null> {
    const { data } = await this.liveClient.sanityFetch({
      query,
      params: options.queryParams || {},
      perspective: options.includeDrafts ? 'drafts' : 'published',
    });

    return data as T;
  }

  async fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Promise<T[] | null> {
    const { data } = await this.liveClient.sanityFetch({
      query,
      params: options.queryParams || {},
      perspective: options.includeDrafts ? 'drafts' : 'published',
    });

    return data as T[];
  }

  async fetchRoute(options: {
    path?: string;
    routeId?: string;
    includeDrafts?: boolean;
  }): Promise<RouteBase | null> {
    let query: string;
    let params: Record<string, any> = {};

    if (options.path) {
      query = `*[_type == "route" && path == $path][0]`;
      params.path = options.path;
    } else if (options.routeId) {
      query = `*[_type == "route" && _id == $routeId][0]`;
      params.routeId = options.routeId;
    } else {
      throw new Error('Either path or routeId must be provided');
    }

    const { data } = await this.liveClient.sanityFetch({
      query,
      params,
      perspective: options.includeDrafts ? 'drafts' : 'published',
    });

    if (!data) return null;

    return data as RouteBase;
  }
}
