import {
  PORTABLE_TEXT_SCHEMA_TYPE,
  PortableText,
} from '@/content/portable-text/portable-text';
import {
  PortableTextBlockComponent,
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextMarkComponent,
  PortableTextTypeComponent,
} from '@portabletext/react';
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
export class PortableTextDescriptor extends ContentDescriptor<PortableText> {
  readonly blockTypes?: BlockTypeDescriptor[];
  readonly marks?: MarkDescriptor[];
  readonly blockStyles?: BlockStyleDescriptor[];
  readonly lists?: ListDescriptor[];
  readonly listItems?: ListItemDescriptor[];

  constructor(props?: Partial<PortableTextDescriptor>) {
    super({
      schemaType: PORTABLE_TEXT_SCHEMA_TYPE,
      title: 'Portable Text',
      layouts: props?.layouts,
    });

    this.blockTypes = props?.blockTypes;
    this.marks = props?.marks;
    this.blockStyles = props?.blockStyles;
    this.lists = props?.lists;
    this.listItems = props?.listItems;
  }
}
