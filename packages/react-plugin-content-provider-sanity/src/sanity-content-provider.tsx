import { SanityLiveContentProvider } from '@/sanity-live-content-provider';
import { getFile } from '@sanity/asset-utils';
import { createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
  ContentProvider,
  FieldKey,
  FileReference,
  ImageReference,
  LiveContentProvider,
  RouteBase,
} from '@vyuh/react-core';
import React from 'react';

const fieldKeyMap: Record<FieldKey, string> = {
  [FieldKey.type]: '_type',
  [FieldKey.id]: '_id',
  [FieldKey.ref]: '_ref',
  [FieldKey.key]: '_key',
};

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion?: string;
  useCdn?: boolean;
  perspective?: 'published' | 'drafts' | 'raw';
  token?: string;
}

export class SanityContentProvider extends ContentProvider {
  // Explicitly declare inherited properties to satisfy TypeScript
  readonly name: string;
  readonly title: string;
  private readonly client: SanityClient;

  private imageBuilder: any;
  private cacheDuration: number;
  private readonly _live: SanityLiveContentProvider;

  constructor(config: SanityConfig, cacheDuration: number = 300000) {
    // Default 5 minutes
    super({
      name: 'vyuh.plugin.content.provider.sanity',
      title: 'Sanity Content Provider',
    });

    // Reassign inherited properties to satisfy TypeScript
    this.name = 'vyuh.plugin.content.provider.sanity';
    this.title = 'Sanity Content Provider';

    this.client = createClient({
      projectId: config.projectId,
      dataset: config.dataset,
      apiVersion: config.apiVersion || '2023-05-03',
      useCdn: config.useCdn ?? true,
      token: config.token,
      perspective: config.perspective || 'published',
    });

    this.imageBuilder = imageUrlBuilder(this.client);
    this.cacheDuration = cacheDuration;
    this._live = new SanityLiveContentProvider(this.client);
  }

  static withConfig(config: {
    config: SanityConfig;
    cacheDuration?: number;
  }): SanityContentProvider {
    return new SanityContentProvider(config.config, config.cacheDuration);
  }

  async init(): Promise<void> {
    // Initialize any resources needed
    return this._live.init();
  }

  async dispose(): Promise<void> {
    // Clean up any resources
    return this._live.dispose();
  }

  async fetchById<T>(
    id: string,
    options: {
      useCache?: boolean;
    },
  ): Promise<T | null> {
    try {
      const query = `*[_id == $id][0]`;
      const params = { id };
      const result = await this.client.fetch(query, params);

      if (!result) return null;
      return result;
    } catch (error) {
      console.error('Error fetching document by ID:', error);
      return null;
    }
  }

  async fetchSingle<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T | null> {
    try {
      const result = await this.client.fetch(query, options.queryParams || {});
      return result || null;
    } catch (error) {
      console.error('Error fetching single document:', error);
      return null;
    }
  }

  async fetchMultiple<T>(
    query: string,
    options: {
      queryParams?: Record<string, any>;
      useCache?: boolean;
    },
  ): Promise<T[] | null> {
    try {
      const results = await this.client.fetch(query, options.queryParams || {});

      if (!Array.isArray(results)) return null;
      return results;
    } catch (error) {
      console.error('Error fetching multiple documents:', error);
      return null;
    }
  }

  async fetchRoute(options: {
    path?: string;
    routeId?: string;
    useCache?: boolean;
  }): Promise<RouteBase | null> {
    let query: string;
    let params: Record<string, string> = {};

    if (options.path) {
      // Match the Dart implementation's route query
      query = `*[_type in ["vyuh.route", "vyuh.conditionalRoute"] && path == $path] | order(_type asc, _updatedAt desc) {
          ...,
          "category": category->,
          "regions": regions[] {
            "identifier": region->identifier, 
            "title": region->title,
            items,
          },
        }[0]`;
      params.path = options.path;
    } else if (options.routeId) {
      // Match the Dart implementation's route by ID query
      query = `*[_id == $routeId] {
          ...,
          "category": category->,
          "regions": regions[] {
            "identifier": region->identifier, 
            "title": region->title,
            items,
          },
        }[0]`;
      params.routeId = options.routeId;
    } else {
      throw new Error('Either path or routeId must be provided');
    }

    const result = await this.fetchSingle<RouteBase>(query, {
      queryParams: params,
    });

    if (!result) return null;
    return result as RouteBase;
  }

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
    const ref = this.fieldValue(
      FieldKey.ref,
      imageRef.asset as Record<string, any>,
    );

    if (!ref) return undefined;

    let builder = this.imageBuilder.image(ref);

    if (options?.width) builder = builder.width(options.width);
    if (options?.height) builder = builder.height(options.height);
    if (options?.quality) builder = builder.quality(options.quality);
    if (options?.format) builder = builder.format(options.format);

    return builder.url();
  }

  fileUrl(fileRef: FileReference): string | undefined {
    const ref = this.fieldValue(
      FieldKey.ref,
      fileRef.asset as Record<string, any>,
    );

    if (!ref) return undefined;

    const fileAsset = getFile(ref, {
      projectId: this.client.config().projectId!,
      dataset: this.client.config().dataset!,
    });

    return fileAsset.asset.url;
  }

  // Override the schemaType method to handle Sanity's specific type field
  schemaType(json: Record<string, any>): string {
    return this.fieldValue(FieldKey.type, json);
  }

  // Override the reference method to handle Sanity's specific reference field
  reference(json: Record<string, any>): string | undefined {
    return json._ref;
  }
  // Override the fieldValue method to handle Sanity's specific field structure

  fieldValue(key: FieldKey, json: Record<string, any>): string {
    const fieldKey = fieldKeyMap[key];
    return json[fieldKey];
  }

  // Live content provider implementation
  override get live(): LiveContentProvider {
    return this._live;
  }

  override get supportsLive(): boolean {
    return true;
  }

  render({ children }: { children: React.ReactNode }): React.ReactNode {
    return this.live.render({
      children,
    });
  }
}
