import Image from 'next/image'
import Container from '@/components/container/Container'
import {
  ADDRESS,
  MAPS_URL,
  PHONE,
  PHONE_HREF,
  WORKING_HOURS_WEEKDAYS,
  WORKING_HOURS_WEEKENDS,
} from '@/lib/const'
import styles from './contacts.module.css'

type ContactsContentProps = {
  variant?: 'card' | 'plain'
  titleAs?: 'h1' | 'h2'
}

export function ContactsContent({ variant = 'card', titleAs: Title = 'h2' }: ContactsContentProps) {
  return (
    <div className={`${styles.layout} ${variant === 'card' ? styles.card : ''}`}>
      <div className={styles.body}>
        <Title className="section-title">Контакты</Title>
        <div className={styles.list}>
          <div className={styles.item}>
            <h3 className={styles.item_title}>Адрес</h3>
            <p className={styles.item_value}>{ADDRESS}</p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.item_title}>Телефон</h3>
            <a href={PHONE_HREF} className={styles.item_value}>
              {PHONE}
            </a>
          </div>
          <div className={styles.item}>
            <h3 className={styles.item_title}>Время работы</h3>
            <p className={styles.item_value}>
              {WORKING_HOURS_WEEKDAYS}
              <br />
              {WORKING_HOURS_WEEKENDS}
            </p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.item_title}>Мы на Яндекс Картах</h3>
            <a
              href={MAPS_URL}
              className={`${styles.item_value} ${styles.maps_link}`}
              target="_blank"
              rel="noreferrer"
            >
              {MAPS_URL}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src="/images/contacts.jpg"
          alt="Фасад мясной лавки на Покровской улице"
          fill
          sizes="(min-width: 1280px) 660px, 100vw"
          className={styles.image_photo}
        />
      </div>
    </div>
  )
}

export default function Contacts() {
  return (
    <section className={styles.contacts} id="contacts">
      <Container>
        <ContactsContent />
      </Container>
    </section>
  )
}
