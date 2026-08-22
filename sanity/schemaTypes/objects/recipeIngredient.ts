import { defineField, defineType } from 'sanity'

export const recipeIngredientType = defineType({
  name: 'recipeIngredient',
  title: 'Ингредиент',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Ингредиент',
      type: 'string',
      placeholder: 'Сыр Буррата',
      validation: (rule) => rule.required().error('Укажите ингредиент'),
    }),
    defineField({
      name: 'amount',
      title: 'Количество',
      type: 'string',
      placeholder: '1 уп.',
      description: 'Например: 1 уп., 2 шт., 200 г, 2 ст. л.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'amount' },
  },
})
