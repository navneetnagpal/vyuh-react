import { Header } from '@/content/header/components/Header';
import {
  Header as HeaderContent,
  HEADER_SCHEMA_TYPE,
} from '@/content/header/header';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Header layout variant type
 */
export type HeaderVariant = 'simple' | 'with-navigation';

/**
 * Default layout for Header content items
 */
export class DefaultHeaderLayout extends LayoutConfiguration<HeaderContent> {
  static readonly schemaName = `${HEADER_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: HeaderVariant;
  readonly showThemeSwitch?: boolean;

  constructor(props?: Partial<DefaultHeaderLayout>) {
    super({
      schemaType: DefaultHeaderLayout.schemaName,
      title: 'Default Header Layout',
    });

    this.variant = props?.variant || 'simple';
    this.showThemeSwitch = props?.showThemeSwitch ?? true; // Default to true
  }

  render(content: HeaderContent): React.ReactNode {
    return <Header content={content} layout={this} />;
  }
}
