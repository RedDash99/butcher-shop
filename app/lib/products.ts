import { PRODUCT_TAG, sanityFetch } from '@/sanity/lib/fetch'
import { type RawImage, resolveImage, type SiteImage } from '@/sanity/lib/image'
import { allProductsQuery, productBySlugQuery, productSlugsQuery } from '@/sanity/lib/queries'

export interface ProductCard {
  slug: string
  title: string
  description: string
  preview: SiteImage | null
  price: number
  weight: string
}

export interface Product extends ProductCard {
  content?: string
  protein?: number
  fat?: number
  calories?: number
  caloriesKj?: number
}

interface RawProductCard {
  slug: string
  title: string
  description: string
  preview: RawImage | null
  price: number
  weight: string
}

interface RawProduct extends RawProductCard {
  content?: string | null
  protein?: number | null
  fat?: number | null
  calories?: number | null
  caloriesKj?: number | null
}

function toProductCard(raw: RawProductCard): ProductCard {
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    preview: resolveImage(raw.preview, raw.title),
    price: raw.price,
    weight: raw.weight,
  }
}

export async function getProductSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(productSlugsQuery, PRODUCT_TAG)
}

export async function getAllProducts(): Promise<ProductCard[]> {
  const products = await sanityFetch<RawProductCard[]>(allProductsQuery, PRODUCT_TAG)

  return products.map(toProductCard)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await sanityFetch<RawProduct | null>(productBySlugQuery, PRODUCT_TAG, { slug })

  if (!product) {
    return null
  }

  return {
    ...toProductCard(product),
    content: product.content?.trim() || undefined,
    protein: product.protein ?? undefined,
    fat: product.fat ?? undefined,
    calories: product.calories ?? undefined,
    caloriesKj: product.caloriesKj ?? undefined,
  }
}
