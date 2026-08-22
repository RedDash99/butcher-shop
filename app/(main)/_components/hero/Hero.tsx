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
            <h1 className={styles.hero_title}>Свежее мясо с домашних ферм</h1>
            <p className={`${styles.hero_description} section-description`}>
              Отборное мясо и мясные продукты от домашних фермерских хозяйств. Поможем выбрать
              подходящий отруб для семейного ужина, шашлыка или праздничного стола.
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
              alt="Свежее фермерское мясо в мясной лавке"
              className={styles.hero_photo}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
