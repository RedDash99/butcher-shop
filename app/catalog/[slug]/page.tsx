import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductSlugs, getProductBySlug } from '@/lib/products'
import Container from '@/components/container/Container'
import type { Metadata } from 'next'
import styles from './page.module.css'

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
    <main>
      <Container>
        <Link href="/" className={styles.link_back}>
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Стрелка назад</title>
            <g clipPath="url(#clip0_47_81)">
              <path d="M10 19L6 14L1 10L6 6L10 1" stroke="#98989D" />
            </g>
            <defs>
              <clipPath id="clip0_47_81">
                <rect width="11" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Продукты
        </Link>
        <div className={styles.content}>
          <div className={styles.content_preview}>
            <Image
              src={`/images/products/${product.preview}`}
              width={340}
              height={248}
              alt={product.title}
            />
          </div>
          <div className={styles.content_body}>
            <h1>{product.title}</h1>
          </div>
        </div>
      </Container>
    </main>
  )
}
