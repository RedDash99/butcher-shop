// import Image from "next/image";
import Container from '@/components/container/Container'
import styles from './page.module.css'

export default async function ContactsPage() {
  return (
    <main>
      <Container>
        <h1 className={styles.title}>Contacts</h1>
      </Container>
    </main>
  )
}
