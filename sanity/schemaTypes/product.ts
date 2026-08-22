import { defineField, defineType } from 'sanity'
import { SLUG_MAX_LENGTH, slugifyRu } from '../lib/slugify'

export const productType = defineType({
  name: 'product',
  title: 'Продукт',
  type: 'document',
  groups: [
    { name: 'main', title: 'Основное', default: true },
    { name: 'nutrition', title: 'Пищевая ценность' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      group: 'main',
      placeholder: 'Стейк Рибай мраморный',
      validation: (rule) => rule.required().error('Без названия продукт не опубликовать'),
    }),
    defineField({
      name: 'slug',
      title: 'Адрес страницы',
      type: 'slug',
      group: 'main',
      description: 'Часть ссылки после /catalog/. Нажмите «Generate», чтобы получить её из названия.',
      options: {
        source: 'title',
        maxLength: SLUG_MAX_LENGTH,
        slugify: slugifyRu,
      },
      validation: (rule) => rule.required().error('Без адреса страница продукта не откроется'),
    }),
    defineField({
      name: 'description',
      title: 'Краткое описание',
      type: 'text',
      rows: 2,
      group: 'main',
      description: 'Одна фраза для поиска и соцсетей. Оптимально — до 160 символов.',
      validation: (rule) => rule.max(200).warning('Длинное описание поисковики обрежут'),
    }),
    defineField({
      name: 'preview',
      title: 'Фото продукта',
      type: 'imageWithAlt',
      group: 'main',
      description: 'Показывается в каталоге и на странице продукта.',
      validation: (rule) => rule.required().assetRequired().error('Добавьте фото продукта'),
    }),
    defineField({
      name: 'price',
      title: 'Цена, ₽',
      type: 'number',
      group: 'main',
      validation: (rule) => rule.required().min(0).error('Укажите цену'),
    }),
    defineField({
      name: 'weight',
      title: 'Вес или фасовка',
      type: 'string',
      group: 'main',
      placeholder: '350 г',
      description: 'Как показывать рядом с ценой. Например: 350 г, 1 кг.',
      validation: (rule) => rule.required().error('Укажите вес или фасовку'),
    }),
    defineField({
      name: 'content',
      title: 'Подробное описание',
      type: 'text',
      rows: 6,
      group: 'main',
      description: 'Текст на странице продукта. Если пусто, покажем краткое описание.',
    }),
    defineField({
      name: 'protein',
      title: 'Белки, г',
      type: 'number',
      group: 'nutrition',
      description: 'На 100 г продукта.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'fat',
      title: 'Жиры, г',
      type: 'number',
      group: 'nutrition',
      description: 'На 100 г продукта.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'calories',
      title: 'Калорийность, ккал',
      type: 'number',
      group: 'nutrition',
      description: 'На 100 г продукта.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'caloriesKj',
      title: 'Калорийность, кДж',
      type: 'number',
      group: 'nutrition',
      description: 'Необязательно. 1 ккал ≈ 4,2 кДж.',
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: { title: 'title', price: 'price', weight: 'weight', media: 'preview' },
    prepare({ title, price, weight, media }) {
      const subtitle = [typeof price === 'number' ? `${price} ₽` : null, weight]
        .filter(Boolean)
        .join(' · ')

      return { title, subtitle, media }
    },
  },
  orderings: [
    {
      name: 'priceAsc',
      title: 'Цена: сначала дешёвые',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      name: 'titleAsc',
      title: 'Название: А–Я',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
