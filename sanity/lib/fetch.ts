import { client } from './client'

/**
 * Теги кеша совпадают с `_type` документов в Sanity, поэтому вебхук из админки
 * (`/api/revalidate`) сбрасывает ровно тот контент, который отредактировали.
 */
export const PRODUCT_TAG = 'product'
export const RECIPE_TAG = 'recipe'

const REVALIDATE_SECONDS = 300

export async function sanityFetch<T>(
  query: string,
  tag: string,
  params: Record<string, string> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
  })
}
