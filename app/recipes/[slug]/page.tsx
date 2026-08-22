import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getRecipeSlugs, getRecipeBySlug } from '@/lib/recipes'
import { buildPageTitle } from '@/lib/utils'
import type { Metadata } from 'next'
import styles from './page.module.css'
import '@/styles/markdown.css'

type Props = {
  params: Promise<{ slug: string }>
}

function paragraphs(text: string) {
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

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
      images: recipe.preview ? [recipe.preview.url] : [],
      type: 'article',
      publishedTime: recipe.publishedAt,
    },
  }
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  const facts = [
    recipe.cookingTime ? `Время приготовления: ${recipe.cookingTime} мин` : null,
    recipe.servings ? `Порций: ${recipe.servings}` : null,
  ].filter(Boolean)

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

      <div className={`markdown-content ${styles.article}`}>
        {recipe.preview ? (
          <Image
            src={recipe.preview.url}
            alt={recipe.preview.alt}
            width={recipe.preview.width ?? 1200}
            height={recipe.preview.height ?? 800}
            sizes="(min-width: 1280px) 800px, 100vw"
            priority
          />
        ) : null}

        {facts.length > 0 ? <p>{facts.join(' · ')}</p> : null}

        {recipe.intro
          ? paragraphs(recipe.intro).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          : null}

        {recipe.ingredients.length > 0 ? (
          <>
            <h2>Ингредиенты</h2>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.key}>
                  {ingredient.amount
                    ? `${ingredient.name} — ${ingredient.amount}`
                    : ingredient.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {recipe.steps.map((step, index) => (
          <Fragment key={step.key}>
            <h2>{step.title || `Шаг ${index + 1}`}</h2>
            {paragraphs(step.text).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {step.image ? (
              <Image
                src={step.image.url}
                alt={step.image.alt}
                width={step.image.width ?? 1200}
                height={step.image.height ?? 800}
                sizes="(min-width: 1280px) 800px, 100vw"
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </main>
  )
}
