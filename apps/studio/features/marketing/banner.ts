import { defineField, defineType } from 'sanity';
import { TbFlag as Icon } from 'react-icons/tb';

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
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the banner',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'With dismiss button', value: 'with-dismiss' },
          { title: 'With action button', value: 'with-action' },
          { title: 'Floating', value: 'floating' },
          { title: 'Sticky top', value: 'sticky-top' },
          { title: 'Sticky bottom', value: 'sticky-bottom' },
        ],
      },
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
      hidden: ({ parent }) => parent?.variant !== 'with-action',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.variant === 'with-action' && !value) {
          return 'Action is required for the "with-action" variant';
        }
        return true;
      }),
    }),
    defineField({
      name: 'dismissible',
      title: 'Dismissible',
      type: 'boolean',
      description: 'Whether the banner can be dismissed by the user',
      initialValue: false,
      hidden: ({ parent }) => parent?.variant !== 'with-dismiss',
    }),
    defineField({
      name: 'dismissText',
      title: 'Dismiss Text',
      type: 'string',
      description: 'Text for the dismiss button (e.g., "Dismiss" or "Close")',
      initialValue: 'Dismiss',
      hidden: ({ parent }) => parent?.variant !== 'with-dismiss' || !parent?.dismissible,
    }),
    defineField({
      name: 'cookieId',
      title: 'Cookie ID',
      type: 'string',
      description: 'Unique identifier for storing dismiss state in cookies',
      hidden: ({ parent }) => parent?.variant !== 'with-dismiss' || !parent?.dismissible,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'variant',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Banner',
        subtitle: `Variant: ${subtitle || 'None'}`,
      };
    },
  },
});
