import {
  PortableTextBlockComponent,
  PortableTextComponents,
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextMarkComponent,
  PortableTextTypeComponent,
} from '@portabletext/react';
import { useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Configuration for Portable Text rendering
 */
export class PortableTextConfig {
  private static _instance: PortableTextConfig;

  // Default components
  private readonly _defaultTypes: Record<string, PortableTextTypeComponent> = {
    image: ({ value }) => {
      const { plugins } = useVyuh();
      const imageUrl = plugins.content.provider.image(value);
      return (
        <img
          src={imageUrl}
          alt={value.alt || ''}
          className="vfs:my-4 vfs:max-w-full vfs:rounded-md"
        />
      );
    },
  };

  renderContentItem: PortableTextTypeComponent = ({ value }) => {
    const { plugins } = useVyuh();
    return plugins.content.render(value);
  };

  private readonly _defaultMarks: Record<string, PortableTextMarkComponent> = {
    link: ({ children, value }) => {
      const rel = value.href.startsWith('/')
        ? undefined
        : 'noreferrer noopener';
      return (
        <a
          href={value.href}
          rel={rel}
          className="vfs:text-blue-500 vfs:hover:underline"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="vfs:rounded vfs:bg-gray-100 vfs:p-1 vfs:font-mono vfs:text-sm">
        {children}
      </code>
    ),
  };

  private readonly _defaultBlockStyles: Record<
    string,
    PortableTextBlockComponent
  > = {
    h1: ({ children }) => (
      <h1 className="vfs:mb-4 vfs:mt-6 vfs:text-3xl vfs:font-bold">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="vfs:mb-3 vfs:mt-5 vfs:text-2xl vfs:font-bold">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="vfs:mb-2 vfs:mt-4 vfs:text-xl vfs:font-bold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="vfs:mb-1 vfs:mt-3 vfs:text-lg vfs:font-bold">
        {children}
      </h4>
    ),
    normal: ({ children }) => <div className="vfs:mb-4">{children}</div>,
    blockquote: ({ children }) => (
      <blockquote className="vfs:my-4 vfs:border-l-4 vfs:border-gray-300 vfs:pl-4 vfs:italic">
        {children}
      </blockquote>
    ),
  };

  private readonly _defaultLists: Record<string, PortableTextListComponent> = {
    bullet: ({ children }) => (
      <ul className="vfs:mb-4 vfs:list-disc vfs:pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="vfs:mb-4 vfs:list-decimal vfs:pl-5">{children}</ol>
    ),
  };

  private readonly _defaultListItems: Record<
    string,
    PortableTextListItemComponent
  > = {
    bullet: ({ children }) => <li className="vfs:mb-1">{children}</li>,
    number: ({ children }) => <li className="vfs:mb-1">{children}</li>,
  };

  // Custom component registries
  private _types: Record<string, PortableTextTypeComponent> = {};
  private _marks: Record<string, PortableTextMarkComponent> = {};
  private _blockStyles: Record<string, PortableTextBlockComponent> = {};
  private _lists: Record<string, PortableTextListComponent> = {};
  private _listItems: Record<string, PortableTextListItemComponent> = {};

  private _unknownMark: PortableTextMarkComponent = ({ value }) => {
    const { components } = useVyuh();

    return components.renderError({
      title: 'Unknown Mark',
      error: new Error(`Missing MarkDescriptor for schemaType: ${value._type}`),
    });
  };

  private _unknownType: PortableTextTypeComponent = ({ value }) => {
    const { components } = useVyuh();

    return components.renderError({
      title: 'Unknown Type',
      error: new Error(
        `Missing BlockTypeDescriptor for schemaType: ${value._type}`,
      ),
    });
  };

  private _unknownList: PortableTextListComponent = ({ value }) => {
    const { components } = useVyuh();

    return components.renderError({
      title: 'Unknown List',
      error: new Error(`Missing ListDescriptor for schemaType: ${value._type}`),
    });
  };

  private _unknownListItem: PortableTextListItemComponent = ({ value }) => {
    const { components } = useVyuh();

    return components.renderError({
      title: 'Unknown List Item',
      error: new Error(
        `Missing ListItemDescriptor for schemaType: ${value._type}`,
      ),
    });
  };

  /**
   * Get the shared instance
   */
  static get shared(): PortableTextConfig {
    if (!this._instance) {
      this._instance = new PortableTextConfig();
    }
    return this._instance;
  }

  /**
   * Register a custom block type component
   */
  registerType(type: string, component: PortableTextTypeComponent): void {
    this._types[type] = component;
  }

  /**
   * Register a custom mark component
   */
  registerMark(mark: string, component: PortableTextMarkComponent): void {
    this._marks[mark] = component;
  }

  /**
   * Register a custom block style component
   */
  registerBlockStyle(
    style: string,
    component: PortableTextBlockComponent,
  ): void {
    this._blockStyles[style] = component;
  }

  /**
   * Register a custom list component
   */
  registerList(type: string, component: PortableTextListComponent): void {
    this._lists[type] = component;
  }

  /**
   * Register a custom list item component
   */
  registerListItem(
    type: string,
    component: PortableTextListItemComponent,
  ): void {
    this._listItems[type] = component;
  }

  /**
   * Get all components (default + custom)
   */
  get components(): PortableTextComponents {
    return {
      types: { ...this._defaultTypes, ...this._types },
      marks: { ...this._defaultMarks, ...this._marks },
      block: { ...this._defaultBlockStyles, ...this._blockStyles },
      list: { ...this._defaultLists, ...this._lists },
      listItem: { ...this._defaultListItems, ...this._listItems },
      unknownMark: this._unknownMark,
      unknownType: this._unknownType,
      unknownList: this._unknownList,
      unknownListItem: this._unknownListItem,
    };
  }

  /**
   * Reset all custom components
   */
  reset(): void {
    this._types = {};
    this._marks = {};
    this._blockStyles = {};
    this._lists = {};
    this._listItems = {};
  }
}
