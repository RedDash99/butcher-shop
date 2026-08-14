import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container/Container'
import CTA from '@/components/CTA/CTA'
import { formatPrice } from '@/lib/utils'
import { getAllProducts } from '@/lib/products'
import styles from './productsSection.module.css'

export default async function ProductsSection() {
  const products = getAllProducts()

  return (
    <section className={styles.products}>
      <Container>
        <div className={styles.products_header}>
          <div className={styles.products_header_left}>
            <h2 className={`${styles.section_title} section-title`}>Продукция</h2>
            <p className={`${styles.section_description} section-description`}>
              От стейков на гриль до бульонных косточек — у нас найдётся мясо на любой бюджет и
              рецепт. Выбирайте вес, вид разделки и способ упаковки прямо на сайте.
            </p>
          </div>
          <div className={styles.products_header_right}>
            <Link href="/catalog" className={`${styles.products_header_link} link`}>
              Весь ассортимент
              {/* <span className={styles.link_icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>Символ внешней ссылки</title>
                  <path d="M21 3H22V2L21 2V3ZM10.293 12.293C10.1108 12.4816 10.01 12.7342 10.0123 12.9964C10.0146 13.2586 10.1198 13.5094 10.3052 13.6948C10.4906 13.8802 10.7414 13.9854 11.0036 13.9877C11.2658 13.99 11.5184 13.8892 11.707 13.707L10.293 12.293ZM13 4L21 4V2L13 2V4ZM20 3V11H22V3L20 3ZM20.293 2.293L10.293 12.293L11.707 13.707L21.707 3.707L20.293 2.293Z" fill="white"/>
                  <path d="M9 4C7.13 4 6.196 4 5.5 4.402C5.04398 4.66529 4.66529 5.04398 4.402 5.5C4 6.196 4 7.13 4 9L4 14C4 16.828 4 18.243 4.879 19.121C5.757 20 7.172 20 10 20H15C16.87 20 17.804 20 18.5 19.598C18.956 19.3347 19.3347 18.956 19.598 18.5C20 17.804 20 16.87 20 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span> */}
            </Link>
          </div>
        </div>

        <div className={styles.products_grid}>
          {products.map((product) => (
            <Link key={product.slug} href={`/catalog/${product.slug}`} style={{ display: 'flex' }}>
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
