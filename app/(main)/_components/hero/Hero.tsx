import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container/Container'
import styles from './hero.module.css'

export default async function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <Container>
        <div className={styles.hero_inner}>
          <div className={styles.hero_content}>
            <h1 className={styles.hero_title}>Мясная лавка</h1>
            <p className={`${styles.hero_description} section-description`}>
              Натуральная продукция с собственных ферм без гормонов и добавок. Доставляем свежее
              мясо за 2 часа, чтобы ваш ужин был безупречным.
            </p>
            <div className={styles.cta}>
              <Link href="/catalog" className={`button ${styles.button}`}>
                Смотреть ассортимент
              </Link>
              <Image
                className={styles.arrow_image}
                src="/images/handdraw-arrow-hero.png"
                width={90}
                height={100}
                alt=""
              />
            </div>
          </div>
          <div className={styles.hero_image}>
            <Image
              src="/images/hero.jpg"
              width={518}
              height={450}
              alt=""
              className={styles.hero_photo}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
