import { PortableText } from '@/content/portable-text/portable-text';
import {
  PortableTextBlockComponent,
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextMarkComponent,
  PortableTextTypeComponent,
} from '@portabletext/react';
import { LayoutConfiguration } from '@vyuh/react-core';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Descriptor for a block type component
 */
export interface BlockTypeDescriptor {
  type: string;
  component: PortableTextTypeComponent;
}

/**
 * Descriptor for a mark component
 */
export interface MarkDescriptor {
  type: string;
  component: PortableTextMarkComponent;
}

/**
 * Descriptor for a block style component
 */
export interface BlockStyleDescriptor {
  style: string;
  component: PortableTextBlockComponent;
}

/**
 * Descriptor for a list component
 */
export interface ListDescriptor {
  type: string;
  component: PortableTextListComponent;
}

/**
 * Descriptor for a list item component
 */
export interface ListItemDescriptor {
  type: string;
  component: PortableTextListItemComponent;
}

/**
 * Descriptor for configuring portable text content type in the system
 */
export class PortableTextDescriptor extends ContentDescriptor {
  readonly blockTypes?: BlockTypeDescriptor[];
  readonly marks?: MarkDescriptor[];
  readonly blockStyles?: BlockStyleDescriptor[];
  readonly lists?: ListDescriptor[];
  readonly listItems?: ListItemDescriptor[];

  constructor({
    blockTypes,
    marks,
    blockStyles,
    lists,
    listItems,
    layouts,
  }: {
    blockTypes?: BlockTypeDescriptor[];
    marks?: MarkDescriptor[];
    blockStyles?: BlockStyleDescriptor[];
    lists?: ListDescriptor[];
    listItems?: ListItemDescriptor[];
    layouts?: LayoutConfiguration[];
  }) {
    super({
      schemaType: PortableText.schemaName,
      title: 'Portable Text',
      layouts,
    });

    this.blockTypes = blockTypes;
    this.marks = marks;
    this.blockStyles = blockStyles;
    this.lists = lists;
    this.listItems = listItems;
  }
}
