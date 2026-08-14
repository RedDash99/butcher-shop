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
              <h3 className={styles.item_title}>Безупречное качество</h3>
              <p className={styles.item_text}>
                Строгий контроль безопасности пищевой продукции на каждом этапе производства
                в соответствии с принципами ХАССП
              </p>
            </div>
            <div className={styles.item}>
              <h3 className={styles.item_title}>Превосходный вкус</h3>
              <p className={styles.item_text}>Собственные уникальные рецептуры</p>
            </div>
            <div className={styles.item}>
              <h3 className={styles.item_title}>Передовые европейские технологии</h3>
              <p className={styles.item_text}>
                наши производственные площадки оснащены современным технологичным оборудованием
              </p>
            </div>
          </div>
          <div className={styles.about_image}>
            <Image src="/images/about.png" width={518} height={618} alt="" />
          </div>
        </div>
      </Container>
    </section>
  )
}
