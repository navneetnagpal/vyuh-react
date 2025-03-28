import {
  Testimonials as TestimonialsContent,
  TESTIMONIALS_SCHEMA_TYPE,
} from '@/content/testimonials/testimonials';
import { Testimonials } from '@/content/testimonials/components/Testimonials';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Testimonials layout variant type
 */
export type TestimonialsVariant =
  | 'simple-centered'
  | 'side-by-side'
  | 'with-large-avatar'
  | 'with-company-logos'
  | 'card-grid'
  | 'with-background-image';

/**
 * Default layout for testimonials content items
 */
export class DefaultTestimonialsLayout extends LayoutConfiguration<TestimonialsContent> {
  static readonly schemaName = `${TESTIMONIALS_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: TestimonialsVariant;
  readonly darkMode?: boolean;

  constructor(props?: Partial<DefaultTestimonialsLayout>) {
    super({
      schemaType: DefaultTestimonialsLayout.schemaName,
      title: 'Default Testimonials Layout',
    });

    this.variant = props?.variant || 'simple-centered';
    this.darkMode = props?.darkMode || false;
  }

  render(content: TestimonialsContent): React.ReactNode {
    return <Testimonials content={content} layout={this} />;
  }
}
