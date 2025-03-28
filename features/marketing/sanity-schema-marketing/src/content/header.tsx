import { defineField, defineType } from 'sanity';
import { TbLayoutNavbar as Icon } from 'react-icons/tb';
import { ContentDescriptor } from '@vyuh/sanity-schema-core';
import React from 'react';

/**
 * Navigation dropdown item schema for header navigation
 */
export const navigationDropdownItemSchema = defineType({
  name: 'marketing.navigationDropdownItem',
  title: 'Navigation Dropdown Item',
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
  preview: {
    select: {
      title: 'action.title',
      description: 'description',
      icon: 'icon',
    },
    prepare({ title, description, icon }) {
      return {
        title: title || 'Dropdown Item',
        subtitle: description
          ? description.substring(0, 50) +
            (description.length > 50 ? '...' : '')
          : 'No description',
      };
    },
  },
});

/**
 * Navigation item schema for header navigation
 */
export const navigationItemSchema = defineType({
  name: 'marketing.navigationItem',
  title: 'Navigation Item',
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
      of: [navigationDropdownItemSchema],
    }),
  ],
  preview: {
    select: {
      title: 'action.title',
      isActive: 'isActive',
      childrenCount: 'children.length',
    },
    prepare({ title, isActive, childrenCount = 0 }) {
      const status = [];
      if (isActive) status.push('Active');
      if (childrenCount > 0) status.push(`${childrenCount} submenu items`);

      return {
        title: title || 'Navigation Item',
        subtitle: status.length > 0 ? status.join(' | ') : 'No status',
        media: isActive
          ? () => <span style={{ fontSize: '1.5rem' }}>🔵</span>
          : () => <span style={{ fontSize: '1.5rem' }}>⚪</span>,
      };
    },
  },
});

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
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [navigationItemSchema],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // Validation will be handled by the layout
          return true;
        }),
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'marketing.header.action',
          fields: [
            {
              name: 'action',
              title: 'Action',
              type: 'vyuh.action',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional icon name from your icon library',
            },
          ],
          preview: {
            select: {
              title: 'action.title',
              actionType: 'action.configuration.0._type',
              icon: 'icon',
            },
            prepare({ title, actionType, icon }) {
              return {
                title: title || 'Action Button',
                subtitle: actionType ?? 'No Action',
              };
            },
          },
        },
      ],
      description: 'Action buttons to display in the header',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // Validation will be handled by the layout
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'logoText',
      logo: 'logo',
      navItems: 'navigationItems',
      actions: 'actions',
    },
    prepare({ title, logo, navItems = [], actions = [] }) {
      const details = [];

      if (navItems.length > 0) {
        details.push(
          `${navItems.length} navigation item${navItems.length === 1 ? '' : 's'}`,
        );
      }

      if (actions.length > 0) {
        details.push(
          `${actions.length} action${actions.length === 1 ? '' : 's'}`,
        );
      }

      return {
        title: `Header: ${title || 'Untitled'}`,
        subtitle:
          details.length > 0
            ? details.join(' | ')
            : 'No navigation items or actions',
        media: logo || Icon,
      };
    },
  },
});

/**
 * Default layout schema for header content items
 */
export const defaultHeaderLayout = defineType({
  name: `${headerSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the header',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'With navigation', value: 'with-navigation' },
        ],
      },
      initialValue: 'simple',
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
      description:
        'Whether the header should stick to the top of the page when scrolling',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      darkMode: 'darkMode',
      sticky: 'sticky',
    },
    prepare({ variant, darkMode, sticky }) {
      // Format the variant name for display
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple';

      // Create a descriptive subtitle based on settings
      const features = [];
      if (darkMode) features.push('Dark Mode');
      if (sticky) features.push('Sticky');

      // Choose an appropriate icon based on the variant
      let variantIcon;
      switch (variant) {
        case 'simple':
          variantIcon = () => <span style={{ fontSize: '1.5rem' }}>🔳</span>;
          break;
        case 'with-navigation':
          variantIcon = () => <span style={{ fontSize: '1.5rem' }}>🧭</span>;
          break;
        default:
          variantIcon = Icon;
      }

      return {
        title: `Header Layout: ${variantDisplay}`,
        subtitle: features.length > 0 ? features.join(', ') : 'Default',
        media: variantIcon,
      };
    },
  },
});

export class HeaderDescriptor extends ContentDescriptor {
  static readonly schemaName = headerSchema.name;

  constructor(props: Partial<HeaderDescriptor>) {
    super(HeaderDescriptor.schemaName, props);
  }
}
