import Link from 'next/link'
import Container from '@/components/container/Container'
import CoverImage from '@/components/coverImage/CoverImage'
import CTA from '@/components/CTA/CTA'
import { formatPrice } from '@/lib/utils'
import { getAllProducts } from '@/lib/products'
import styles from './products.module.css'

export default async function Products() {
  const products = (await getAllProducts()).slice(0, 3)

  return (
    <section>
      <Container>
        <div className={styles.header}>
          <div className={styles.header_text}>
            <h2 className="section-title">Мясо и мясные продукты</h2>
            <p className="section-description">
              В ассортименте — мясо для стейков, запекания, шашлыка, фарша и наваристого бульона.
              Выбирайте нужный отруб и вес, а мы подготовим и аккуратно упакуем заказ.
            </p>
          </div>
          <Link href="/catalog" className={`${styles.header_link} link`}>
            Весь ассортимент
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <Link key={product.slug} href={`/catalog/${product.slug}`} className={styles.card_link}>
              <article className={`card ${styles.product}`}>
                {product.preview && (
                  <div className={styles.preview}>
                    <CoverImage
                      image={product.preview}
                      sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 576px) 50vw, 100vw"
                      className={styles.preview_image}
                    />
                  </div>
                )}

                <div className={styles.body}>
                  <h3 className={styles.title}>{product.title}</h3>
                  {product.price ? <p className={styles.meta}>{formatPrice(product.price)}</p> : null}
                  {product.weight ? <p className={styles.meta}>{product.weight}</p> : null}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
      <CTA />
    </section>
  )
}
