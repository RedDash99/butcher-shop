import type { Metadata } from 'next'
import Products from './_components/products/Products'
import Recipes from './_components/recipes/Recipes'
import Hero from './_components/hero/Hero'
import About from './_components/about/About'
import Faq from './_components/faq/Faq'
import Contacts from './_components/contacts/Contacts'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Свежее фермерское мясо в Москве | Мясная лавка',
  description:
    'Свежее мясо и мясные продукты с домашних ферм. Поможем выбрать подходящий отруб и подготовим заказ к удобному времени. Мясная лавка в Москве.',
}

export default async function HomePage() {
  return (
    <main className={styles.page}>
      <Hero />
      <Products />
      <About />
      <Recipes />
      <Contacts />
      <Faq />
    </main>
  )
}
