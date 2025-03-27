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
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'The style variant for the FAQ section',
      options: {
        list: [
          { title: 'Simple with wide questions', value: 'simple-wide' },
          { title: 'Two columns', value: 'two-columns' },
          { title: 'Offset with supporting content', value: 'offset-supporting' },
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
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Categories for grouping questions (if using categorized questions)',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      description: 'Contact details for variants that include contact information',
      hidden: ({ parent }) => parent?.variant !== 'with-contact',
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
          description: 'E.g., "Can\'t find the answer you\'re looking for? Please contact our support team."',
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
    defineField({
      name: 'supportingContent',
      title: 'Supporting Content',
      type: 'object',
      description: 'Additional content for variants with supporting content',
      hidden: ({ parent }) => parent?.variant !== 'offset-supporting',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'vyuh.portableText',
        }),
        defineField({
          name: 'action',
          title: 'Action',
          type: 'vyuh.action',
        }),
      ],
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'vyuh.action',
      description: 'Optional call-to-action button for the FAQ section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'variant',
      questionCount: 'questions.length',
    },
    prepare({ title, subtitle, questionCount = 0 }) {
      return {
        title: title || 'FAQ Section',
        subtitle: `Variant: ${subtitle || 'None'} • ${questionCount} question${questionCount === 1 ? '' : 's'}`,
      };
    },
  },
});
