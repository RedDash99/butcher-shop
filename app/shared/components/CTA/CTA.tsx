import Image from 'next/image'
import Container from '../container/Container'
import { PHONE, PHONE_HREF } from '@/lib/const'
import styles from './cta.module.css'

export default function CTA() {
  return (
    <Container>
      <div className={styles.cta}>
        <span className={styles.text}>Звоните, чтобы заказать</span>
        <a href={PHONE_HREF} className={`button ${styles.button}`}>
          {PHONE}
        </a>
        <Image
          className={styles.arrow_image}
          src="/images/handdraw-arrow.png"
          width={120}
          height={120}
          alt=""
        />
      </div>
    </Container>
  )
}
