import { defineField, defineType } from 'sanity'

export const imageWithAltType = defineType({
  name: 'imageWithAlt',
  title: 'Изображение',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Описание изображения',
      type: 'string',
      description:
        'Что на фото. Нужно для поисковиков и незрячих посетителей. Если оставить пустым, подставим название.',
    }),
  ],
})
