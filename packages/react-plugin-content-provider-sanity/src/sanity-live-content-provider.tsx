import { SanityClient } from '@sanity/client';
import { LiveContentProvider, RouteBase } from '@vyuh/react-core';
import { DefinedSanityFetchType, defineLive } from 'next-sanity';
import React from 'react';

export class SanityLiveContentProvider implements LiveContentProvider {
  private readonly client: SanityClient;
  readonly title: string = 'Sanity Live Content Provider';

  private readonly sanityFetch: DefinedSanityFetchType;
  private readonly SanityLive: React.ComponentType;

  constructor(client: SanityClient) {
    this.client = client;
  }

  async init(): Promise<void> {
    return Promise.resolve();
  }

  async dispose(): Promise<void> {
    return Promise.resolve();
  }

  private async liveFetch(options: {
    query: string;
    params?: Record<string, any>;
    perspective?: 'published' | 'drafts';
  }) {
    const { query, params } = options;

    // We have to fetch the sync tags first (this double-fetching is required until the new `cacheTag` API, related to 'use cache', is available in a stable next.js release)
    const { syncTags } = await this.client.fetch(query, params, {
      filterResponse: false,
      cacheMode: 'noStale',
      tag: 'fetch-sync-tags', // The request tag makes the fetch unique, avoids deduping with the cached query that has tags
      cache: 'force-cache',
    });

    const data = await this.client.fetch(query, params, {
      cacheMode: 'noStale',
      cache: 'force-cache',
      next: { tags: syncTags },
    });

    return { data, tags: syncTags };
  }

  async fetchById<T>(
    id: string,
    options: {
      includeDrafts?: boolean;
    },
  ): Promise<T | null> {
    const query = `*[_id == $id][0]`;
    const params = { id };

    const { data } = await this.liveFetch({
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
    const { data } = await this.liveFetch({
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
    const { data } = await this.liveFetch({
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

    const { data } = await this.liveFetch({
      query,
      params,
      perspective: options.includeDrafts ? 'drafts' : 'published',
    });

    if (!data) return null;

    return data as RouteBase;
  }

  render({ children }: { children: React.ReactNode }): React.ReactNode {
    return <>{children}</>;
  }
}
