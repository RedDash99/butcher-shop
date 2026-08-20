import Container from '@/components/container/Container'
import { ContactsContent } from '../(main)/_components/contacts/Contacts'
import { buildPageTitle } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: buildPageTitle('Контакты'),
  description: 'Адрес, телефон и время работы мясной лавки',
}

export default function ContactsPage() {
  return (
    <main>
      <section>
        <Container>
          <ContactsContent variant="plain" titleAs="h1" />
        </Container>
      </section>
    </main>
  )
}
