import { defineField, defineType } from 'sanity';
import { TbLayoutNavbar as Icon } from 'react-icons/tb';

/**
 * Header section schema for marketing pages
 * Based on common patterns from Tailwind UI header sections
 */
export const headerSchema = defineType({
  name: 'marketing.header',
  title: 'Header Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The logo to display in the header',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Text to display alongside or instead of the logo',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the header',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'With navigation', value: 'with-navigation' },
          { title: 'With navigation and buttons', value: 'with-navigation-buttons' },
          { title: 'Centered with navigation', value: 'centered-navigation' },
          { title: 'With search', value: 'with-search' },
          { title: 'With flyout menus', value: 'with-flyout-menus' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'darkMode',
      title: 'Dark Mode',
      type: 'boolean',
      description: 'Whether this header should be displayed in dark mode',
      initialValue: false,
    }),
    defineField({
      name: 'sticky',
      title: 'Sticky Header',
      type: 'boolean',
      description: 'Whether the header should stick to the top of the page when scrolling',
      initialValue: false,
    }),
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'action',
              title: 'Navigation Link',
              type: 'vyuh.action',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              description: 'Whether this item should be highlighted as active',
              initialValue: false,
            }),
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              description: 'Submenu items for flyout/dropdown menus',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'action',
                      title: 'Dropdown Link',
                      type: 'vyuh.action',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      description: 'Optional description for flyout menu items',
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      description: 'Optional icon name from your icon library',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
      hidden: ({ parent }) => parent?.variant === 'simple',
      validation: (Rule) => Rule.custom((value, context) => {
        if (['with-navigation', 'with-navigation-buttons', 'centered-navigation', 'with-flyout-menus'].includes(context.parent?.variant) && (!value || value.length === 0)) {
          return 'At least one navigation item is required for this header variant';
        }
        return true;
      }),
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [{ type: 'vyuh.action' }],
      description: 'Action buttons to display in the header',
      hidden: ({ parent }) => !['with-navigation-buttons', 'centered-navigation', 'with-flyout-menus'].includes(parent?.variant),
      validation: (Rule) => Rule.custom((value, context) => {
        if (['with-navigation-buttons', 'centered-navigation', 'with-flyout-menus'].includes(context.parent?.variant) && (!value || value.length === 0)) {
          return 'At least one action is required for this header variant';
        }
        return true;
      }),
    }),
  ],
  preview: {
    select: {
      title: 'logoText',
      subtitle: 'variant',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Header Section',
        subtitle: `Variant: ${subtitle || 'None'}`,
        media,
      };
    },
  },
});
