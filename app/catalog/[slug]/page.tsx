import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductSlugs, getProductBySlug } from '@/lib/products'
import { formatPrice, buildPageTitle } from '@/lib/utils'
import { PHONE, PHONE_HREF } from '@/lib/const'
import Container from '@/components/container/Container'
import type { Metadata } from 'next'
import styles from './page.module.css'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  const slugs = getProductSlugs()
  return slugs.map(({ slug }) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: buildPageTitle('Продукт не найден'),
    }
  }

  const description = product.description || product.title

  return {
    title: buildPageTitle(product.title),
    description,
    openGraph: {
      title: product.title,
      description,
      images: product.preview ? [`/images/products/${product.preview}`] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: product.preview ? [`/images/products/${product.preview}`] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const description = product.content?.trim() || product.description
  const hasNutrition =
    product.protein != null || product.fat != null || product.calories != null

  return (
    <main>
      <Container>
        <nav className={styles.breadcrumbs} aria-label="Навигация">
          <Link href="/catalog" className="link">
            Продукция
          </Link>
          <span aria-hidden="true">/</span>
          <span>{product.title}</span>
        </nav>

        <div className={styles.content}>
          <div className={styles.preview}>
            {product.preview && (
              <Image
                src={`/images/products/${product.preview}`}
                alt={product.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.preview_image}
              />
            )}
          </div>

          <div className={styles.body}>
            <h1 className={styles.title}>{product.title}</h1>

            <p className={styles.meta}>
              {formatPrice(product.price)}
              {product.weight ? ` · ${product.weight}` : ''}
            </p>

            {description && <p className={styles.description}>{description}</p>}

            {hasNutrition && (
              <>
                <hr className={styles.divider} />
                <div className={styles.nutrition}>
                  <h2 className={styles.nutrition_title}>
                    Пищевая ценность на 100 г продукта
                  </h2>
                  <div className={styles.nutrition_grid}>
                    {product.protein != null && (
                      <div className={styles.nutrition_item}>
                        <span className={styles.nutrition_label}>Белки, г</span>
                        <span className={styles.nutrition_value}>{product.protein}</span>
                      </div>
                    )}
                    {product.fat != null && (
                      <div className={styles.nutrition_item}>
                        <span className={styles.nutrition_label}>Жиры, г</span>
                        <span className={styles.nutrition_value}>{product.fat}</span>
                      </div>
                    )}
                  </div>
                  {product.calories != null && (
                    <p className={styles.calories}>
                      Калорийность: {product.calories} ккал
                      {product.caloriesKj != null ? ` / ${product.caloriesKj} кдж` : ''}
                    </p>
                  )}
                </div>
              </>
            )}

            <a href={PHONE_HREF} className={styles.order}>
              Заказать · {PHONE}
            </a>
          </div>
        </div>
      </Container>
    </main>
  )
}
