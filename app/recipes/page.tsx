import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container/Container'
import CTA from '@/components/CTA/CTA'
import { buildPageTitle } from '@/lib/utils'
import { getAllRecipes } from '@/lib/recipes'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: buildPageTitle('Рецепты'),
  description: 'Рецепты шашлыка из наших продуктов',
}

export default async function RecipesPage() {
  const recipes = getAllRecipes()

  return (
    <main>
      <section>
        <Container>
          <div className={styles.header}>
            <h1 className="page-title">Рецепты шашлыка</h1>
            <p className="section-description">
              На майские праздники десятки тысяч россиян отправятся на первые пикники в этом году.
              И конечно, главным блюдом на столах станет шашлык. РБК Life рассказывает, как можно
              приготовить мясо — от способа из СССР до необычных маринадов на гранатовом соке и с
              протертыми томатами.
            </p>
          </div>

          <div className={styles.grid}>
            {recipes.map((recipe) => (
              <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className={styles.card_link}>
                <article className={`card ${styles.recipe}`}>
                  {recipe.preview && (
                    <div className={styles.preview}>
                      <Image
                        src={`/images/recipes/${recipe.preview}`}
                        alt={recipe.title}
                        fill
                        sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 576px) 50vw, 100vw"
                        className={styles.preview_image}
                      />
                    </div>
                  )}

                  <div className={styles.body}>
                    <h2 className={styles.title}>{recipe.title}</h2>

                    {recipe.description ? (
                      <p className={`text-secondary ${styles.description}`}>{recipe.description}</p>
                    ) : null}

                    {recipe.date ? (
                      <p className={styles.date}>
                        {new Date(recipe.date).toLocaleDateString('ru-RU')}
                      </p>
                    ) : null}
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
