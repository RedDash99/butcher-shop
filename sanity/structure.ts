import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Контент сайта')
    .items([
      S.documentTypeListItem('product').title('Продукция'),
      S.documentTypeListItem('recipe').title('Рецепты'),
    ])
