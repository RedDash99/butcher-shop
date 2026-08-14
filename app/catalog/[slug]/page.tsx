import { notFound } from 'next/navigation'
import { getProductSlugs, getProductBySlug } from '../../lib/products'
import Image from 'next/image'
import Container from '@/app/shared/components/container/Container'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate static paths for all recipes at build time
export async function generateStaticParams() {
  const slugs = getProductSlugs()
  return slugs.map(({ slug }) => ({
    slug: slug,
  }))
}

// Generate metadata for each recipe
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params to get the slug
  const { slug } = await params

  // Fetch the recipe data
  const product = getProductBySlug(slug)

  // If product doesn't exist, return default metadata
  if (!product) {
    return {
      title: 'Recipe Not Found',
      description: 'The requested recipe could not be found.',
    }
  }

  // Generate the metadata
  return {
    title: product.title,
    description: product.description || `Learn how to make ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Learn how to make ${product.title}`,
      images: product.preview ? [product.preview] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description || `Learn how to make ${product.title}`,
      images: product.preview ? [product.preview] : [],
    },
  }
}

// Page component
export default async function ProductPage({ params }: Props) {
  // Await the params before accessing
  const { slug } = await params
  const product = getProductBySlug(slug)

  // Return 404 if product doesn't exist
  if (!product) {
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
        ← Back to products
      </a>
      <Container>
        <Image
          src={`/images/products/${product.preview}`}
          width={340}
          height={235}
          alt={product.title}
        />
      </Container>
    </main>
  )
}
