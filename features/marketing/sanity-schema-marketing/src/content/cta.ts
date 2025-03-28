import { backgroundField } from '@/object/background';
import {
  ContentDescriptor,
  ContentSchemaBuilder,
} from '@vyuh/sanity-schema-core';
import { defineField, defineType } from 'sanity';
import { TbArrowRight as Icon } from 'react-icons/tb';

/**
 * CTA (Call to Action) section schema for marketing pages
 * Based on common patterns from Tailwind UI CTA sections
 */
export const ctaSchema = defineType({
  name: 'marketing.cta',
  title: 'CTA Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the CTA section',
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
      description: 'The main image or screenshot',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageTiles',
      title: 'Image Tiles',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Multiple images displayed in a grid',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value || value.length === 0) {
            return 'At least one image is required for the image tiles variant';
          }

          return true;
        }),
    }),
    defineField({
      name: 'primaryAction',
      title: 'Primary Action',
      type: 'vyuh.action',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryAction',
      title: 'Secondary Action',
      type: 'vyuh.action',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
      description:
        'Optional text that appears below the buttons (e.g., "No credit card required")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      primaryAction: 'primaryAction.title',
      secondaryAction: 'secondaryAction.title',
    },
    prepare({ title, subtitle, primaryAction, secondaryAction }) {
      const subtitleText = [];
      if (primaryAction) {
        subtitleText.push(`Primary: ${primaryAction}`);
      }
      if (secondaryAction) {
        subtitleText.push(`Secondary: ${secondaryAction}`);
      }

      return {
        title: `CTA: ${title || 'Untitled'}`,
        subtitle:
          subtitleText.length > 0
            ? subtitleText.join(' | ')
            : subtitle
              ? subtitle.substring(0, 50)
              : 'No content',
        media: Icon,
      };
    },
  },
});

export class CTADescriptor extends ContentDescriptor {
  static readonly schemaName = ctaSchema.name;

  constructor(props: Partial<CTADescriptor>) {
    super(CTADescriptor.schemaName, props);
  }
}

export class CTASchemaBuilder extends ContentSchemaBuilder {
  constructor() {
    super(ctaSchema.name);
  }

  build(descriptors: ContentDescriptor[]) {
    return ctaSchema;
  }
}

export const defaultCTALayout = defineType({
  name: `${ctaSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the CTA section',
      options: {
        list: [
          { title: 'Simple centered', value: 'simple-centered' },
          { title: 'Simple stacked', value: 'simple-stacked' },
          { title: 'Centered on panel', value: 'centered-panel' },
          { title: 'Simple justified', value: 'simple-justified' },
          { title: 'Split with image on left', value: 'split-image-left' },
          { title: 'Split with image on right', value: 'split-image-right' },
          { title: 'With image tiles', value: 'image-tiles' },
        ],
      },
      initialValue: 'simple-centered',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
          { title: 'Brand', value: 'brand' },
          { title: 'Light Brand', value: 'light-brand' },
        ],
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      background: 'background',
      bgType: 'background.type',
    },
    prepare({ variant, background, bgType }) {
      // Format the variant name for display
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple Centered';

      // Create a descriptive subtitle based on background settings
      let bgDisplay = background || 'Light';
      if (bgType) {
        bgDisplay = `${bgDisplay}, ${bgType}`;
      }

      return {
        title: `CTA Layout: ${variantDisplay}`,
        subtitle: `Background: ${bgDisplay}`,
        media: Icon,
      };
    },
  },
});
