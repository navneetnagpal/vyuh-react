import { GrDocument as Icon } from 'react-icons/gr';
import { defineField, defineType } from 'sanity';

/**
 * Full Page Route Layout schema for Sanity
 *
 * This layout provides options for:
 * - Controlling the gap between content items
 * - Showing or hiding the route title
 */
export const fullPageRouteLayout = defineType({
  name: 'marketing.route.layout.fullPage',
  title: 'Full Page Route Layout',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'gap',
      title: 'Gap Size',
      type: 'string',
      description: 'The spacing between content items',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'small',
    }),
    defineField({
      name: 'showTitle',
      title: 'Show Title',
      type: 'boolean',
      description: 'Whether to display the route title',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      gap: 'gap',
      showTitle: 'showTitle',
    },
    prepare({ gap = 'medium', showTitle = true }) {
      const gapDisplay = gap.charAt(0).toUpperCase() + gap.slice(1);

      return {
        title: 'Full Page Route Layout',
        subtitle: `Gap: ${gapDisplay} | ${showTitle ? 'Show Title' : 'Hide Title'}`,
        media: Icon,
      };
    },
  },
});
