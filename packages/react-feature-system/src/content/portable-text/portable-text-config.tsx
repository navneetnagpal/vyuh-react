import {
  PortableTextBlockComponent,
  PortableTextComponents,
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextMarkComponent,
  PortableTextTypeComponent,
} from '@portabletext/react';
import { createUnknown, Unknown, useVyuh } from '@vyuh/react-core';
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
          className="my-4 rounded-md max-w-full"
        />
      );
    },
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
          className="text-blue-500 hover:underline"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-gray-100 p-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
  };

  private readonly _defaultBlockStyles: Record<
    string,
    PortableTextBlockComponent
  > = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-3 mb-1">{children}</h4>
    ),
    normal: ({ children }) => <div className="mb-4">{children}</div>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  };

  private readonly _defaultLists: Record<string, PortableTextListComponent> = {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4">{children}</ol>
    ),
  };

  private readonly _defaultListItems: Record<
    string,
    PortableTextListItemComponent
  > = {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  };

  // Custom component registries
  private _types: Record<string, PortableTextTypeComponent> = {};
  private _marks: Record<string, PortableTextMarkComponent> = {};
  private _blockStyles: Record<string, PortableTextBlockComponent> = {};
  private _lists: Record<string, PortableTextListComponent> = {};
  private _listItems: Record<string, PortableTextListItemComponent> = {};

  private _unknownMark: PortableTextMarkComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(createUnknown(value._type, 'Unknown Mark'));
  };

  private _unknownType: PortableTextTypeComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(createUnknown(value._type, 'Unknown Type'));
  };

  private _unknownList: PortableTextListComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(createUnknown(value._type, 'Unknown List'));
  };

  private _unknownListItem: PortableTextListItemComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(
      createUnknown(value._type, 'Unknown ListItem'),
    );
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
