import { ContentDescriptor } from '@vyuh/sanity-schema-core';
import { TbFlag as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

/**
 * Banner element schema for marketing pages
 * Based on common patterns from Tailwind UI banner elements
 */
export const bannerSchema = defineType({
  name: 'marketing.banner',
  title: 'Banner',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'text',
      title: 'Banner Text',
      type: 'string',
      description: 'The main text to display in the banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional icon name from your icon library',
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'vyuh.action',
      description: 'Call-to-action button for the banner',
    }),
    defineField({
      name: 'dismissible',
      title: 'Dismissible',
      type: 'boolean',
      description: 'Whether the banner can be dismissed by the user',
      initialValue: false,
    }),
    defineField({
      name: 'dismissText',
      title: 'Dismiss Text',
      type: 'string',
      description: 'Text for the dismiss button (e.g., "Dismiss" or "Close")',
      initialValue: 'Dismiss',
      hidden: ({ parent }) => !parent?.dismissible,
    }),
    defineField({
      name: 'cookieId',
      title: 'Cookie ID',
      type: 'string',
      description: 'Unique identifier for storing dismiss state in cookies',
      hidden: ({ parent }) => !parent?.dismissible,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      dismissible: 'dismissible',
    },
    prepare({ title, dismissible }) {
      return {
        title: `Banner: ${title || 'Untitled'}`,
        subtitle: dismissible ? 'Dismissible' : undefined,
        media: Icon,
      };
    },
  },
});

export const defaultBannerLayout = defineType({
  name: `${bannerSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the banner',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'Floating', value: 'floating' },
        ],
      },
      initialValue: 'simple',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      description: 'The color scheme for the banner',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Info', value: 'info' },
          { title: 'Success', value: 'success' },
          { title: 'Warning', value: 'warning' },
          { title: 'Error', value: 'error' },
          { title: 'Brand', value: 'brand' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      colorScheme: 'colorScheme',
    },
    prepare({ variant, colorScheme }) {
      // Format the variant name for display
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple';

      return {
        title: `Banner Layout: ${variantDisplay}`,
        subtitle: `Color: ${colorScheme || 'Default'}`,
        media: Icon,
      };
    },
  },
});

export class BannerDescriptor extends ContentDescriptor {
  static readonly schemaName = bannerSchema.name;

  constructor(props: Partial<BannerDescriptor>) {
    super(BannerDescriptor.schemaName, props);
  }
}
