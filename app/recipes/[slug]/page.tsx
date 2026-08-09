// import Image from "next/image";
import { notFound } from 'next/navigation'
import { getRecipeSlugs, getRecipeBySlug } from '../../lib/recipes'
import MarkdownRenderer from '@/app/shared/components/MarkdownRenderer'
import type { Metadata } from 'next'
import './styles/markdown.sass'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate static paths for all recipes at build time
export async function generateStaticParams() {
  const slugs = getRecipeSlugs()
  return slugs.map(({ slug }) => ({
    slug: slug,
  }))
}

// Generate metadata for each recipe
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params to get the slug
  const { slug } = await params

  // Fetch the recipe data
  const recipe = getRecipeBySlug(slug)

  // If recipe doesn't exist, return default metadata
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
      description: 'The requested recipe could not be found.',
    }
  }

  // Generate the metadata
  return {
    title: recipe.title,
    description: recipe.description || `Learn how to make ${recipe.title}`,
    openGraph: {
      title: recipe.title,
      description: recipe.description || `Learn how to make ${recipe.title}`,
      images: recipe.preview ? [recipe.preview] : [],
      type: 'article',
      publishedTime: recipe.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description || `Learn how to make ${recipe.title}`,
      images: recipe.preview ? [recipe.preview] : [],
    },
  }
}

// Page component
export default async function RecipePage({ params }: Props) {
  // Await the params before accessing
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)

  // Return 404 if recipe doesn't exist
  if (!recipe) {
    notFound()
  }

  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      {/* Back button */}
      <a
        href="/"
        style={{
          display: 'inline-block',
          marginBottom: '2rem',
          color: '#3b82f6',
          textDecoration: 'none',
        }}
      >
        ← Back to recipes
      </a>

      {/* Markdown content */}
      <div style={{ marginTop: '2rem' }}>
        <MarkdownRenderer content={recipe.content} />
      </div>
    </main>
  )
}
