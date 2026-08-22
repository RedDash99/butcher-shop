import Container from '@/app/shared/components/container/Container'
import Image from 'next/image'
import styles from './about.module.css'

export default async function About() {
  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.about_inner}>
          <div className={styles.about_list}>
            <div className={styles.item}>
              <h3 className={styles.item_title}>Более 10 лет опыта</h3>
              <p className={styles.item_text}>
                Более 10 лет выбираем свежее мясо и мясные продукты у домашних фермерских хозяйств
              </p>
            </div>
            <div className={styles.item}>
              <h3 className={styles.item_title}>Помощь с выбором</h3>
              <p className={styles.item_text}>
                Подскажем, какой отруб подойдёт для жарки, запекания, тушения или бульона
              </p>
            </div>
            <div className={styles.item}>
              <h3 className={styles.item_title}>Бережная подготовка</h3>
              <p className={styles.item_text}>
                Подготовим мясо к приготовлению и аккуратно упакуем ваш заказ
              </p>
            </div>
          </div>
          <div className={styles.about_image}>
            <Image
              src="/images/about.png"
              width={518}
              height={618}
              alt="Подготовка свежего мяса к продаже"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
