import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { TbMail as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Newsletter section schema for marketing pages
 * Based on common patterns from Tailwind UI newsletter sections
 */

/**
 * Content descriptor for newsletter content items
 */
export class NewsletterDescriptor extends ContentDescriptor {
  static readonly schemaName = 'marketing.newsletter';

  constructor(props: Partial<NewsletterDescriptor>) {
    super(NewsletterDescriptor.schemaName, props);
  }
}

/**
 * Default layout schema for newsletter content items
 */
export const defaultNewsletterLayout = defineType({
  name: `${NewsletterDescriptor.schemaName}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the newsletter section',
      options: {
        list: [
          { title: 'Simple centered', value: 'simple-centered' },
          { title: 'Split with image', value: 'split-with-image' },
        ],
      },
      initialValue: 'simple-centered',
      validation: (Rule) => Rule.required(),
    }),

  ],
  preview: {
    select: {
      variant: 'variant',
    },
    prepare({ variant }) {
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple Centered';

      return {
        title: `Newsletter Layout: ${variantDisplay}`,
        subtitle: 'Default',
        media: Icon,
      };
    },
  },
});

export class NewsletterSchemaBuilder extends ContentSchemaBuilder {
  private schema = defineType({
    name: NewsletterDescriptor.schemaName,
    title: 'Newsletter Section',
    type: 'object',
    icon: Icon,
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The main title for the newsletter section',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'subtitle',
        title: 'Subtitle',
        type: 'text',
        description: 'A supporting text that appears below the title',
      }),

      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        description: 'Image for variants that include an image',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'formAction',
        title: 'Form Action URL',
        type: 'string',
        description: 'The URL where the newsletter form will submit data',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        description: 'Text for the submit button',
        initialValue: 'Subscribe',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'placeholderText',
        title: 'Placeholder Text',
        type: 'string',
        description: 'Placeholder text for the email input',
        initialValue: 'Enter your email',
      }),
      defineField({
        name: 'privacyText',
        title: 'Privacy Text',
        type: 'text',
        description: 'Optional text about privacy policy',
      }),
      defineField({
        name: 'features',
        title: 'Features',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'Optional list of features or benefits to display',
      }),
    ],
    preview: {
      select: {
        title: 'title',
        features: 'features',
      },
      prepare({ title, features = [] }) {
        return {
          title: `Newsletter: ${title || 'Untitled'}`,
          subtitle:
            features.length > 0 ? `${features.length} features` : undefined,
          media: Icon,
        };
      },
    },
  });

  constructor() {
    super(NewsletterDescriptor.schemaName);
  }

  build(descriptors: ContentDescriptor[]) {
    return this.schema;
  }
}
