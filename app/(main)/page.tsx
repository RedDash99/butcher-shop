import Products from './_components/products/Products'
import Recipes from './_components/recipes/Recipes'
import Hero from './_components/hero/Hero'
import About from './_components/about/About'
import Faq from './_components/faq/Faq'
import styles from './page.module.css'

export default async function HomePage() {
  return (
    <main className={styles.page}>
      <Hero />
      <Products />
      <About />
      <Recipes />
      <Faq />
    </main>
  )
}
