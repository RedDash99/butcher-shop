import Link from 'next/link'
import Container from '@/components/container/Container'
import CoverImage from '@/components/coverImage/CoverImage'
import CTA from '@/components/CTA/CTA'
import { getAllRecipes } from '@/lib/recipes'
import styles from './recipes.module.css'

export default async function Recipes() {
  const recipes = (await getAllRecipes()).slice(0, 3)

  return (
    <section>
      <Container>
        <div className={styles.header}>
          <div className={styles.header_text}>
            <h2 className="section-title">Рецепты из мяса</h2>
            <p className="section-description">
              Простые идеи для домашнего ужина и праздничного стола: как приготовить сочный стейк,
              замариновать шашлык, запечь мясо или сварить насыщенный бульон.
            </p>
          </div>
          <Link href="/recipes" className={`${styles.header_link} link`}>
            Все рецепты
          </Link>
        </div>

        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className={styles.card_link}>
              <article className={`card ${styles.recipe}`}>
                {recipe.preview && (
                  <div className={styles.preview}>
                    <CoverImage
                      image={recipe.preview}
                      sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 576px) 50vw, 100vw"
                      className={styles.preview_image}
                    />
                  </div>
                )}

                <div className={styles.body}>
                  <h3 className={styles.title}>{recipe.title}</h3>
                  {recipe.description ? (
                    <p className={`text-secondary ${styles.description}`}>{recipe.description}</p>
                  ) : null}
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
