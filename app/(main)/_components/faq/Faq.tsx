'use client'
import { useState, useRef } from 'react'
import Container from '@/components/container/Container'
import styles from './faq.module.css'

type list = {
  question: string
  answer: string
}

const data: list[] = [
  {
    question: 'Как выбрать мясо для конкретного блюда?',
    answer:
      'Расскажите, что планируете приготовить, и мы подберём подходящий отруб. Для жарки и гриля нужны мягкие части, для тушения — мясо с соединительной тканью, а для насыщенного бульона — отрубы на кости.',
  },
  {
    question: 'Откуда поступает мясо?',
    answer:
      'Мы отбираем свежее мясо и мясные продукты у домашних фермерских хозяйств. Информацию о происхождении конкретного продукта можно уточнить у продавца перед покупкой.',
  },
  {
    question: 'Что можно купить в мясной лавке?',
    answer:
      'В ассортименте есть мясо для стейков, шашлыка, запекания и тушения, а также фарш, отрубы на кости и другие мясные продукты. Актуальные позиции и цены представлены в каталоге.',
  },
  {
    question: 'Как оформить заказ?',
    answer:
      'Выберите продукты в каталоге и позвоните нам. Мы уточним наличие, вес и подготовку мяса, а также согласуем удобное время получения заказа.',
  },
  {
    question: 'Можно ли подготовить мясо к приготовлению?',
    answer:
      'Да, при оформлении заказа сообщите, для какого блюда покупаете мясо. Мы поможем выбрать размер порций, подготовим продукт и аккуратно его упакуем.',
  },
  {
    question: 'Как хранить мясо после покупки?',
    answer:
      'Храните охлаждённое мясо в холодильнике при температуре от 0 до +4 °C и соблюдайте срок, указанный на упаковке. Если не планируете готовить продукт в ближайшее время, разделите его на порции и заморозьте.',
  },
]

export default function Faq() {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleToggleQuestion = (index: number) => {
    setOpenedIndex(openedIndex === index ? null : index)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': data.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    }))
  }

  return (
    <section className={styles.faq} id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Container>
        <h2 className="section-title">Часто задаваемые вопросы</h2>
        <ul className={styles.faq_list}>
          {data.map((item, index) => (
            <li className={styles.list_item} key={item.question}>
              <button
                type="button"
                className={`${styles.item_question} ${openedIndex === index ? styles.isOpened : ''}`}
                onClick={() => handleToggleQuestion(index)}
                aria-expanded={openedIndex === index}
              >
                {item.question}
                <span className={styles.item_button} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <title>Крестик</title>
                    <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="currentColor" />
                  </svg>
                </span>
              </button>
              <div
                className={styles.item_answer}
                ref={(el) => { answerRefs.current[index] = el }}
                style={{
                  maxHeight:
                    openedIndex === index
                      ? `${answerRefs.current[index]?.scrollHeight || 200}px`
                      : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}
              >
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
