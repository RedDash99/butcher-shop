import { defineArrayMember, defineField, defineType } from 'sanity'
import { SLUG_MAX_LENGTH, slugifyRu } from '../lib/slugify'

export const recipeType = defineType({
  name: 'recipe',
  title: 'Рецепт',
  type: 'document',
  groups: [
    { name: 'main', title: 'Основное', default: true },
    { name: 'cooking', title: 'Ингредиенты и шаги' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      group: 'main',
      placeholder: 'Салат с сыром буррата и сырокопчёной шейкой',
      validation: (rule) => rule.required().error('Без названия рецепт не опубликовать'),
    }),
    defineField({
      name: 'slug',
      title: 'Адрес страницы',
      type: 'slug',
      group: 'main',
      description: 'Часть ссылки после /recipes/. Нажмите «Generate», чтобы получить её из названия.',
      options: {
        source: 'title',
        maxLength: SLUG_MAX_LENGTH,
        slugify: slugifyRu,
      },
      validation: (rule) => rule.required().error('Без адреса страница рецепта не откроется'),
    }),
    defineField({
      name: 'description',
      title: 'Краткое описание',
      type: 'text',
      rows: 2,
      group: 'main',
      description: 'Одна фраза для карточки рецепта, поиска и соцсетей.',
      validation: (rule) => rule.max(200).warning('Длинное описание поисковики обрежут'),
    }),
    defineField({
      name: 'preview',
      title: 'Главное фото',
      type: 'imageWithAlt',
      group: 'main',
      description: 'Показывается в списке рецептов и вверху страницы.',
      validation: (rule) => rule.required().assetRequired().error('Добавьте фото готового блюда'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'datetime',
      group: 'main',
      description: 'По ней рецепты сортируются: свежие показываются первыми.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('Укажите дату публикации'),
    }),
    defineField({
      name: 'intro',
      title: 'Вступление',
      type: 'text',
      rows: 4,
      group: 'main',
      description: 'Необязательно. Абзац перед списком ингредиентов.',
    }),
    defineField({
      name: 'cookingTime',
      title: 'Время приготовления, мин',
      type: 'number',
      group: 'cooking',
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: 'servings',
      title: 'Количество порций',
      type: 'number',
      group: 'cooking',
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: 'ingredients',
      title: 'Ингредиенты',
      type: 'array',
      group: 'cooking',
      of: [defineArrayMember({ type: 'recipeIngredient' })],
      validation: (rule) => rule.min(1).error('Добавьте хотя бы один ингредиент'),
    }),
    defineField({
      name: 'steps',
      title: 'Шаги приготовления',
      type: 'array',
      group: 'cooking',
      description: 'Порядок шагов можно менять перетаскиванием.',
      of: [defineArrayMember({ type: 'recipeStep' })],
      validation: (rule) => rule.min(1).error('Добавьте хотя бы один шаг'),
    }),
  ],
  preview: {
    select: { title: 'title', publishedAt: 'publishedAt', media: 'preview' },
    prepare({ title, publishedAt, media }) {
      const date =
        typeof publishedAt === 'string' && publishedAt
          ? new Date(publishedAt).toLocaleDateString('ru-RU')
          : 'Дата не указана'

      return { title, subtitle: date, media }
    },
  },
  orderings: [
    {
      name: 'publishedAtDesc',
      title: 'Дата: сначала новые',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      name: 'titleAsc',
      title: 'Название: А–Я',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
