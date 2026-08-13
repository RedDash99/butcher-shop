import Image from 'next/image'
import Link from 'next/link'
import Container from '@/app/shared/components/container/Container'
import CTA from '@/app/shared/components/CTA/CTA'
import { formatPrice } from '../../../lib/utils'
import { getAllProducts } from '../../../lib/products'
import styles from './ProductsSection.module.css'

export default function ProductsSection() {
  const products = getAllProducts()

  return (
    <section className={styles.products}>
      <Container>
        <div className={styles.products_header}>
          <div className={styles.products_header_left}>
            <h2 className={`${styles.section_title} section-title`}>Продукция</h2>
            <p className={styles.section_description}>
              От стейков на гриль до бульонных косточек — у нас найдётся мясо на любой бюджет и
              рецепт. Выбирайте вес, вид разделки и способ упаковки прямо на сайте.
            </p>
          </div>
          <div className={styles.products_header_right}>
            <Link href="/products" className={styles.products_header_link}>Весь ассортимент</Link>
          </div>
        </div>

        <div className={styles.products_grid}>
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} style={{ display: 'flex' }}>
              <div className={styles.product}>
                {product.preview && (
                  <div
                    style={{
                      width: '100%',
                      height: '248px',
                      backgroundColor: '#f3f4f6',
                    }}
                  >
                    <Image
                      src={`/images/products/${product.preview}`}
                      alt={product.title}
                      width={340}
                      height={248}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}

                <div style={{ padding: '1rem' }}>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: '#262626',
                    }}
                  >
                    {product.title}
                  </h2>

                  {product.price && (
                    <p
                      style={{
                        color: '#4b5563',
                        fontSize: '15px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {formatPrice(product.price)}
                    </p>
                  )}
                  {product.weight && (
                    <p
                      style={{
                        color: '#4b5563',
                        fontSize: '15px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.weight}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </Container>
      <CTA />
    </section>
  )
}
