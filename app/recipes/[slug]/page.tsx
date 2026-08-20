import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRecipeSlugs, getRecipeBySlug } from '@/lib/recipes'
import { buildPageTitle } from '@/lib/utils'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import type { Metadata } from 'next'
import styles from './page.module.css'
import '@/styles/markdown.css'

type Props = {
  params: Promise<{ slug: string }>
}

function recipeBody(content: string) {
  const lines = content.split(/\r?\n/)
  let start = 0

  while (start < lines.length && lines[start].trim() === '') start++
  if (lines[start]?.startsWith('# ')) start++
  while (start < lines.length && lines[start].trim() === '') start++

  return lines.slice(start).join('\n').trim()
}

export async function generateStaticParams() {
  return getRecipeSlugs().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)

  if (!recipe) {
    return {
      title: buildPageTitle('Рецепт не найден'),
    }
  }

  const description = recipe.description || recipe.title

  return {
    title: buildPageTitle(recipe.title),
    description,
    openGraph: {
      title: recipe.title,
      description,
      images: recipe.preview ? [`/images/recipes/${recipe.preview}`] : [],
      type: 'article',
      publishedTime: recipe.date,
    },
  }
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Навигация">
        <Link href="/recipes" className="link">
          Рецепты
        </Link>
        <span aria-hidden="true">/</span>
        <span>{recipe.title}</span>
      </nav>

      <h1 className="page-title">{recipe.title}</h1>

      <div className={styles.article}>
        <MarkdownRenderer content={recipeBody(recipe.content)} />
      </div>
    </main>
  )
}
