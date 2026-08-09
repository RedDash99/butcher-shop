import * as fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface Recipe {
  slug: string
  title: string
  description?: string
  preview?: string
  date?: string
  content: string
  [key: string]: string | undefined
}

const recipesDirectory = path.join(process.cwd(), 'public/content/recipes')

export function getRecipeSlugs(): { slug: string }[] {
  const files = fs.readdirSync(recipesDirectory)
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }))
}

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) {
    return []
  }

  const files = fs.readdirSync(recipesDirectory)

  const recipes = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const fullPath = path.join(recipesDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      preview: data.preview || '',
      date: data.date || '',
      ...data,
      content,
    }
  })

  // Sort by date if available
  return recipes.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return 0
  })
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const fullPath = path.join(recipesDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    preview: data.preview || '',
    date: data.date || '',
    ...data,
    content,
  }
}
