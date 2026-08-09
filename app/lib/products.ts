import * as fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface Product {
  slug: string
  title: string
  description?: string
  preview?: string
  price: number
  weight: string
}

const productsDirectory = path.join(process.cwd(), 'public/content/products')

export function getProductSlugs(): { slug: string }[] {
  const files = fs.readdirSync(productsDirectory)
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }))
}

export function getAllProducts(): Product[] {
  if (!fs.existsSync(productsDirectory)) {
    return []
  }

  const files = fs.readdirSync(productsDirectory)

  const products = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const fullPath = path.join(productsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      preview: data.preview || '',
      price: data.price || 0,
      weight: data.weight || '',
      ...data,
    }
  })

   return products.sort((a, b) => {
    const priceA = a.price || 0
    const priceB = b.price || 0
    return priceA - priceB
  })
}

export function getProductBySlug(slug: string): Product | null {
  const fullPath = path.join(productsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    preview: data.preview || '',
    price: data.price || 0,
    weight: data.weight || '',
    ...data,
  }
}
