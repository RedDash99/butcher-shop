import Image from 'next/image'
import Link from 'next/link'
import Container from '@/app/shared/components/container/Container'
import ProductsSection from './lib/components/productsSection/ProductsSection'
import { getAllRecipes } from './lib/recipes'
import styles from './page.module.sass'

export default async function Home() {
  const recipes = getAllRecipes()

  return (
    <div className={styles.page}>
      <main className={styles['page-wrapper']}>
        <Container>
          <div className={styles.hero}>
            <h1 className={styles.hero_title}>Мясная лавка</h1>
            <p className={styles.hero_description}>
              Натуральная продукция с собственных ферм без гормонов и добавок. Доставляем свежее
              мясо за 2 часа, чтобы ваш ужин был безупречным.
            </p>
          </div>
        </Container>
        <ProductsSection />
        <section className={styles.recipes}>
          <Container>
            <div className={styles.recipes_header}>
              <h2 className={`${styles.section_title} section-title`}>Рецепты шашлыка</h2>
              <p className={styles.section_description}>
                На майские праздники десятки тысяч россиян отправятся на первые пикники в этом году.
                И конечно, главным блюдом на столах станет шашлык. РБК Life рассказывает, как можно
                приготовить мясо — от способа из СССР до необычных маринадов на гранатовом соке и с
                протертыми томатами.
              </p>
            </div>

            <div className={styles.recipes_grid}>
              {recipes.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  style={{ display: 'flex' }}
                >
                  <div className={styles.recipe}>
                    {recipe.preview && (
                      <div
                        style={{
                          width: '100%',
                          height: '200px',
                          backgroundColor: '#f3f4f6',
                        }}
                      >
                        <Image
                          src={`/images/recipes/${recipe.preview}`}
                          alt={recipe.title}
                          width={340}
                          height={235}
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
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#111827',
                        }}
                      >
                        {recipe.title}
                      </h2>

                      {recipe.description && (
                        <p
                          style={{
                            color: '#4b5563',
                            fontSize: '0.875rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {recipe.description}
                        </p>
                      )}

                      {recipe.date && (
                        <p
                          style={{
                            color: '#9ca3af',
                            fontSize: '0.75rem',
                            marginTop: '0.5rem',
                          }}
                        >
                          {new Date(recipe.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}
