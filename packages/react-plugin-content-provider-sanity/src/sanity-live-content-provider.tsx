import { makeRouteQuery } from '@/utils';
import { getQueryState, SanityInstance } from '@sanity/sdk';
import { LiveContentProvider, RouteBase } from '@vyuh/react-core';
import React from 'react';
import { Observable } from 'rxjs';

export class SanityLiveContentProvider implements LiveContentProvider {
  private readonly sanityInstance: SanityInstance;
  readonly title: string = 'Sanity Live Content Provider';

  constructor(sanityInstance: SanityInstance) {
    this.sanityInstance = sanityInstance;
  }

  async init(): Promise<void> {
    return Promise.resolve();
  }

  async dispose(): Promise<void> {
    return Promise.resolve();
  }

  private liveFetch<T>(options: {
    query: string;
    params?: Record<string, any>;
    perspective?: 'published' | 'drafts';
  }) {
    const { query, params } = options;

    const source = getQueryState<T>(this.sanityInstance, query, {
      params,
    });

    // Create the Sanity subscription
    // const sanitySubscription = source.subscribe();

    // Return a new observable that wraps the source.observable
    // and handles cleanup of both subscriptions
    // return new Observable<T>((observer) => {
    //   // Subscribe to the source observable with explicit handlers
    //   const subscription = source.observable.subscribe(observer);
    //
    //   // Return a teardown function that cleans up both subscriptions
    //   return () => {
    //     sanitySubscription();
    //     subscription.unsubscribe();
    //   };
    // });

    return source.observable;
  }

  fetchById<T>(
    id: string,
    options: {
      includeDrafts?: boolean;
    },
  ): Observable<T | undefined> {
    const query = `*[_id == $id][0]`;
    const params = { id };

    return this.liveFetch({
      query,
      params,
    });
  }

  fetchSingle<T>(
    query: string,
    options: {
      params?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T | undefined> {
    return this.liveFetch({
      query,
      params: options.params,
    });
  }

  fetchMultiple<T>(
    query: string,
    options: {
      params?: Record<string, any>;
      includeDrafts?: boolean;
    },
  ): Observable<T[] | undefined> {
    return this.liveFetch({
      query,
      params: options.params,
    });
  }

  fetchRoute(options: {
    path?: string;
    routeId?: string;
    includeDrafts?: boolean;
  }): Observable<RouteBase | undefined> {
    const { query, params } = makeRouteQuery(options.path, options.routeId);

    return this.liveFetch({
      query,
      params,
    });
  }

  render({ children }: { children: React.ReactNode }): React.ReactNode {
    return <>{children}</>;
  }
}
