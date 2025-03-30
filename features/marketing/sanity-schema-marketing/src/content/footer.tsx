import { ContentDescriptor } from '@vyuh/sanity-schema-core';
import { TbLayoutBottombar as Icon } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

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
                  preview: {
                    select: {
                      title: 'action.title',
                      url: 'action.url',
                    },
                    prepare({ title, url }) {
                      return {
                        title: `Link: ${title || 'Untitled'}`,
                        subtitle: url,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        },
      ],
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
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Custom Icon',
              type: 'string',
              description:
                'Optional custom icon name (only needed for "Other" platform)',
              hidden: ({ parent }) => parent?.platform !== 'other',
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
              icon: 'icon',
            },
            prepare({ platform, url, icon }) {
              const displayPlatform =
                platform === 'other' && icon ? icon : platform;
              return {
                title: `Social: ${displayPlatform ? displayPlatform.charAt(0).toUpperCase() + displayPlatform.slice(1) : 'Untitled'}`,
                subtitle: url ? url.replace(/^https?:\/\//, '') : 'No URL',
              };
            },
          },
        },
      ],
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
          preview: {
            select: {
              title: 'action.title',
              url: 'action.url',
            },
            prepare({ title, url }) {
              return {
                title: `Legal: ${title || 'Untitled'}`,
                subtitle: url,
              };
            },
          },
        },
      ],
      description:
        'Links to legal pages like Privacy Policy, Terms of Service, etc.',
    }),
    defineField({
      name: 'description',
      title: 'Company Description',
      type: 'text',
      description: 'Short description or mission statement about the company',
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
        title: `Footer: ${title || 'Untitled'}`,
        subtitle: `Variant: ${subtitle || 'None'}`,
        media,
      };
    },
  },
});

/**
 * Default layout schema for footer content items
 */
export const defaultFooterLayout = defineType({
  name: `${footerSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the footer',
      options: {
        list: [
          { title: 'Simple centered', value: 'simple-centered' },
          { title: 'With social links', value: 'with-social-links' },
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
      const variantDisplay: string =
        {
          'simple-centered': 'Simple Centered',
          'with-social-links': 'With Social Links',
        }[variant] || 'Default';

      return {
        title: `Footer Layout: ${variantDisplay}`,
        subtitle: 'Default',
      };
    },
  },
});

export class FooterDescriptor extends ContentDescriptor {
  static readonly schemaName = footerSchema.name;

  constructor(props: Partial<FooterDescriptor>) {
    super(FooterDescriptor.schemaName, props);
  }
}
