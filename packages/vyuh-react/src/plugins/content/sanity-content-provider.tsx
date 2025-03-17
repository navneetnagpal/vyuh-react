import {
  ContentProvider,
  LiveContentProvider,
  NoOpLiveContentProvider,
} from '@/core/plugins/content/content-provider';
import { FileReference, ImageReference } from '@/core/content/reference';
import { RouteBase } from '@/core/content/route-base';
import { createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion?: string;
  useCdn?: boolean;
  perspective?: 'published' | 'previewDrafts' | 'raw';
  token?: string;
}

export class SanityContentProvider extends ContentProvider {
  private client: SanityClient;
  private imageBuilder: any;
  private cacheDuration: number;
  // private _live: SanityLiveContentProvider;

  constructor(config: SanityConfig, cacheDuration: number = 300000) {
    // Default 5 minutes
    super({
      name: 'vyuh.plugin.content.provider.sanity',
      title: 'Sanity Content Provider',
    });

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
    // this._live = new SanityLiveContentProvider(this.client);
  }

  static withConfig(config: {
    config: SanityConfig;
    cacheDuration?: number;
  }): SanityContentProvider {
    return new SanityContentProvider(config.config, config.cacheDuration);
  }

  async init(): Promise<void> {
    // Initialize any resources needed
    // return this._live.init();
  }

  async dispose(): Promise<void> {
    // Clean up any resources
    // return this._live.dispose();
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
    try {
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

      const result = await this.client.fetch(query, params);

      if (!result) return null;
      return result as RouteBase;
    } catch (error) {
      console.error('Error fetching route:', error);
      return null;
    }
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
  ): string | null {
    if (!imageRef.asset?.ref) return null;

    let builder = this.imageBuilder.image(imageRef.asset.ref);

    if (options?.width) builder = builder.width(options.width);
    if (options?.height) builder = builder.height(options.height);
    if (options?.quality) builder = builder.quality(options.quality);
    if (options?.format) builder = builder.format(options.format);

    return builder.url();
  }

  async fileUrl(fileRef: FileReference): Promise<string | null> {
    if (!fileRef.asset?.ref) return null;

    return this.client
      .getDocument(fileRef.asset.ref)
      .then((doc: any) => doc?.url)
      .catch(() => null);
  }

  // Override the fieldValue method to handle Sanity's specific field structure
  fieldValue(key: string, json: Record<string, any>): string {
    // Map common field names to Sanity's structure
    const fieldMap: Record<string, string> = {
      type: '_type',
      id: '_id',
      // Add more mappings as needed
    };

    const fieldKey = fieldMap[key] || key;
    return json[fieldKey];
  }

  // Override the schemaType method to handle Sanity's specific type field
  schemaType(json: Record<string, any>): string {
    return this.fieldValue('type', json);
  }

  // Live content provider implementation
  override get live(): LiveContentProvider {
    return new NoOpLiveContentProvider();
    // return this._live;
  }

  override get supportsLive(): boolean {
    return false;
  }
}
