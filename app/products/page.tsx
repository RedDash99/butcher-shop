import ProductsSection from '../lib/components/productsSection/ProductsSection'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductsPage({ params }: Props) {
  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <ProductsSection />
    </main>
  )
}
