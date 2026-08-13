import Image from 'next/image'
import Container from '../container/Container'
import styles from './cta.module.css'

export default function CTA() {
  return (
    <Container>
      <div className={styles.cta}>
        <span className={styles.text}>Звоните, чтобы заказать</span>
        <a href="tel:+79996299386" className={styles.button}>
          +7 (999) 629-93-86
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
