import {
  ContentItem,
  SchemaItem,
  TypeDescriptor,
  useVyuhStore,
} from '@vyuh/react-core';
import { ContentDescriptor } from '@vyuh/react-extension-content';
import React from 'react';

export const API_CONTENT_SCHEMA_TYPE = 'vyuh.apiContent';

/**
 * Interface for API Content items
 */
export interface APIContent extends ContentItem {
  readonly schemaType: string;
  readonly showPending: boolean;
  readonly showError: boolean;
  readonly configuration?: ApiConfiguration;
}

/**
 * Base class for API configuration
 */
export abstract class ApiConfiguration<T = any> implements SchemaItem {
  readonly schemaType: string;
  readonly title?: string;

  protected constructor(props: { schemaType: string; title?: string }) {
    this.schemaType = props.schemaType;
    this.title = props.title;
  }

  /**
   * Invokes the API to fetch data
   */
  abstract invoke(): Promise<T | undefined>;

  /**
   * Builds the UI with the fetched data
   */
  abstract build(data: T | undefined): React.ReactNode;

  static fromJson(json: APIContent): ApiConfiguration | undefined {
    const config = Array.isArray(json.configuration)
      ? json.configuration[0]
      : undefined;

    const { plugins } = useVyuhStore.getState();
    const schemaType = config
      ? plugins.content.provider.schemaType(config)
      : undefined;
    const TD = schemaType
      ? plugins.content.getItem(ApiConfiguration, schemaType)
      : undefined;

    if (TD) {
      return new TD.fromJson(config);
    }

    return undefined;
  }
}

/**
 * Descriptor for API Content
 */
export class APIContentDescriptor extends ContentDescriptor<APIContent> {
  readonly configurations?: TypeDescriptor<ApiConfiguration>[];

  constructor(props?: Partial<APIContentDescriptor>) {
    super({
      schemaType: API_CONTENT_SCHEMA_TYPE,
      title: 'API Content',
      layouts: props?.layouts,
    });

    this.configurations = props?.configurations;
  }
}
