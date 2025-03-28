import { ContentDescriptor } from '@vyuh/sanity-schema-core';
import { defineField, defineType } from 'sanity';
import { TbQuestionMark as Icon } from 'react-icons/tb';

/**
 * FAQ section schema for marketing pages
 * Based on common patterns from Tailwind UI FAQ sections
 */
export const faqSchema = defineType({
  name: 'marketing.faq',
  title: 'FAQ Section',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the FAQ section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A supporting text that appears below the title',
    }),

    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'vyuh.portableText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'Optional category for grouping questions',
            }),
          ],
          preview: {
            select: {
              question: 'question',
              category: 'category',
            },
            prepare({ question, category }) {
              return {
                title: `Q: ${question || 'Untitled'}`,
                subtitle: category ? `Category: ${category}` : undefined,
                media: Icon,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Categories for grouping questions (if using categorized questions)',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      description:
        'Contact details for variants that include contact information',
      // Note: Variant is now in layout, not in content schema
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'E.g., "Still have questions?"',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description:
            'E.g., "Can\'t find the answer you\'re looking for? Please contact our support team."',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'action',
          title: 'Action',
          type: 'vyuh.action',
          description: 'Call-to-action button for contact section',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      questions: 'questions',
    },
    prepare({ title, questions = [] }) {
      const questionCount = questions.length;

      return {
        title: `FAQ: ${title || 'Untitled'}`,
        subtitle: `${questionCount} question${questionCount === 1 ? '' : 's'}`,
        media: Icon,
      };
    },
  },
});

export const defaultFaqLayout = defineType({
  name: `${faqSchema.name}.layout.default`,
  title: 'Default',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'simple-wide',
      options: {
        list: [
          { title: 'Simple with wide questions', value: 'simple-wide' },
          { title: 'Two columns', value: 'two-columns' },
          { title: 'With contact details', value: 'with-contact' },
          { title: 'Centered accordion', value: 'centered-accordion' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'darkMode',
      title: 'Dark Mode',
      type: 'boolean',
      description: 'Whether this section should be displayed in dark mode',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      darkMode: 'darkMode',
    },
    prepare({ variant, darkMode }) {
      // Format the variant name for display
      const variantDisplay = variant
        ? variant
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'Simple Wide';

      return {
        title: `FAQ Layout: ${variantDisplay}`,
        subtitle: darkMode ? 'Dark Mode' : undefined,
        media: Icon,
      };
    },
  },
});

export class FAQDescriptor extends ContentDescriptor {
  static readonly schemaName = faqSchema.name;

  constructor(props: Partial<FAQDescriptor>) {
    super(FAQDescriptor.schemaName, props);
  }
}
