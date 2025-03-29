import { defineField } from 'sanity';

export const backgroundField = () =>
  defineField({
    name: 'background',
    title: 'Background',
    type: 'object',
    fields: [
      defineField({
        name: 'type',
        title: 'Background Type',
        type: 'string',
        options: {
          list: [
            { title: 'None', value: 'none' },
            { title: 'Color', value: 'color' },
            { title: 'Gradient', value: 'gradient' },
          ],
        },
        initialValue: 'none',
      }),
      defineField({
        name: 'color',
        title: 'Background Color',
        type: 'string',
        description: 'Hex color code or Tailwind color class',
        hidden: ({ parent }) => parent?.type !== 'color',
      }),
      defineField({
        name: 'gradient',
        title: 'Gradient',
        type: 'string',
        description: 'The type of gradient to use',
        hidden: ({ parent }) => parent?.type !== 'gradient',
      }),

    ],
  });
