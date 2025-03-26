import { defineField, defineType } from 'sanity';
import { TbLayoutBottombar as Icon } from 'react-icons/tb';

/**
 * Footer section schema for marketing pages
 * Based on common patterns from Tailwind UI footer sections
 */
export const footerSchema = defineType({
  name: 'marketing.footer',
  title: 'Footer Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The logo to display in the footer',
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
      description: 'The style variant for the footer',
      options: {
        list: [
          { title: 'Simple centered', value: 'simple-centered' },
          { title: 'Simple with company mission', value: 'simple-mission' },
          {
            title: 'Four columns with newsletter',
            value: 'four-columns-newsletter',
          },
          {
            title: 'Four columns with company mission',
            value: 'four-columns-mission',
          },
          { title: 'With social links', value: 'with-social-links' },
          { title: 'Sitemap with social links', value: 'sitemap-social' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'darkMode',
      title: 'Dark Mode',
      type: 'boolean',
      description: 'Whether this footer should be displayed in dark mode',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Company Description',
      type: 'text',
      description: 'Short description or mission statement about the company',
      hidden: ({ parent }) =>
        !['simple-mission', 'four-columns-mission'].includes(parent?.variant),
    }),
    defineField({
      name: 'navigationGroups',
      title: 'Navigation Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Group Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
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
                  ],
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        },
      ],
      hidden: ({ parent }) =>
        ['simple-centered', 'simple-mission'].includes(parent?.variant),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            [
              'four-columns-newsletter',
              'four-columns-mission',
              'sitemap-social',
            ].includes(context.parent?.variant) &&
            (!value || value.length === 0)
          ) {
            return 'At least one navigation group is required for this footer variant';
          }
          return true;
        }),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'action',
              title: 'Social Link',
              type: 'vyuh.action',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            ['with-social-links', 'sitemap-social'].includes(
              context.parent?.variant,
            ) &&
            (!value || value.length === 0)
          ) {
            return 'At least one social link is required for this footer variant';
          }
          return true;
        }),
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      description: 'Newsletter signup form for variants that include it',
      hidden: ({ parent }) => parent?.variant !== 'four-columns-newsletter',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'E.g., "Subscribe to our newsletter"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Brief description of the newsletter',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Subscribe',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'placeholderText',
          title: 'Placeholder Text',
          type: 'string',
          initialValue: 'Enter your email',
        }),
        defineField({
          name: 'formAction',
          title: 'Form Action URL',
          type: 'string',
          description: 'The URL where the newsletter form will submit data',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent?.variant === 'four-columns-newsletter' && !value) {
            return 'Newsletter configuration is required for this footer variant';
          }
          return true;
        }),
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'action',
              title: 'Legal Link',
              type: 'vyuh.action',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      description:
        'Links to legal pages like Privacy Policy, Terms of Service, etc.',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright notice text',
      initialValue: `© ${new Date().getFullYear()} Your Company, Inc. All rights reserved.`,
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
        title: title || 'Footer Section',
        subtitle: `Variant: ${subtitle || 'None'}`,
        media,
      };
    },
  },
});
