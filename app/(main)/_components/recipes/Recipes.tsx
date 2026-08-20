import Image from 'next/image'
import Link from 'next/link'
import Container from '@/app/shared/components/container/Container'
import CTA from '@/app/shared/components/CTA/CTA'
import { getAllRecipes } from '@/lib/recipes'
import styles from './recipes.module.css'

export default function Recipes() {
  const recipes = getAllRecipes()

  return (
    <section className={styles.products}>
      <Container>
        <div className={styles.products_header}>
          <div className={styles.products_header_left}>
            <h2 className={`${styles.section_title} section-title`}>Рецепты шашлыка</h2>
            <p className={`${styles.section_description} section-description`}>
              На майские праздники десятки тысяч россиян отправятся на первые пикники в этом году. И
              конечно, главным блюдом на столах станет шашлык. РБК Life рассказывает, как можно
              приготовить мясо — от способа из СССР до необычных маринадов на гранатовом соке и с
              протертыми томатами.
            </p>
          </div>
          <div className={styles.products_header_right}>
            <Link href="/recipes" className={`${styles.products_header_link} link`}>
              Все рецепты
            </Link>
          </div>
        </div>

        <div className={styles.products_grid}>
          {recipes.map((recipe) => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} style={{ display: 'flex' }}>
              <div className={styles.product}>
                {recipe.preview && (
                  <div
                    style={{
                      width: '100%',
                      height: '248px',
                      backgroundColor: '#f3f4f6',
                    }}
                  >
                    <Image
                      src={`/images/recipes/${recipe.preview}`}
                      alt={recipe.title}
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
      <CTA />
    </section>
  )
}
