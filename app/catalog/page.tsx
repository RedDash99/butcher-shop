import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container/Container'
import CTA from '@/components/CTA/CTA'
import { formatPrice } from '@/lib/utils'
import { getAllProducts } from '@/lib/products'
import styles from './page.module.css'

export default async function ProductsPage() {
  const products = getAllProducts()

  return (
    <main>
      <section>
        <Container>
          <div className={styles.header}>
            <h1 className="page-title">Продукция</h1>
            <p className="section-description">
              От стейков на гриль до бульонных косточек — у нас найдётся мясо на любой бюджет и
              рецепт. Выбирайте вес, вид разделки и способ упаковки прямо на сайте.
            </p>
          </div>

          <div className={styles.grid}>
            {products.map((product) => (
              <Link key={product.slug} href={`/catalog/${product.slug}`} className={styles.card_link}>
                <article className={`card ${styles.product}`}>
                  {product.preview && (
                    <div className={styles.preview}>
                      <Image
                        src={`/images/products/${product.preview}`}
                        alt={product.title}
                        fill
                        sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 576px) 50vw, 100vw"
                        className={styles.preview_image}
                      />
                    </div>
                  )}

                  <div className={styles.body}>
                    <h2 className={styles.title}>{product.title}</h2>

                    {product.price ? (
                      <p className={styles.meta}>{formatPrice(product.price)}</p>
                    ) : null}
                    {product.weight ? <p className={styles.meta}>{product.weight}</p> : null}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
        <CTA />
      </section>
    </main>
  )
}
