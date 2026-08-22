import { defineField, defineType } from 'sanity'

export const recipeStepType = defineType({
  name: 'recipeStep',
  title: 'Шаг',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок шага',
      type: 'string',
      description: 'Необязательно. Если оставить пустым, на сайте будет «Шаг 1», «Шаг 2» и так далее.',
    }),
    defineField({
      name: 'text',
      title: 'Что делать',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().error('Опишите, что нужно сделать на этом шаге'),
    }),
    defineField({
      name: 'image',
      title: 'Фото шага',
      type: 'imageWithAlt',
    }),
  ],
  preview: {
    select: { title: 'title', text: 'text', media: 'image' },
    prepare({ title, text, media }) {
      const excerpt = typeof text === 'string' ? text.trim() : ''

      return {
        title: title || excerpt.slice(0, 70) || 'Шаг',
        subtitle: title ? excerpt.slice(0, 70) : undefined,
        media,
      }
    },
  },
})
