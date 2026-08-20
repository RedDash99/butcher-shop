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
    question: 'Как выбрать мясо?',
    answer:
      'Здесь вы найдёте именно тот кусок, который растает во рту: с мраморными прожилками, тонкой жировой прослойкой и ароматом настоящего мяса. Вся продукция хранится в идеальных температурных условиях и ждёт только вашего выбора.',
  },
  {
    question: 'Есть ли у вас доставка?',
    answer:
      'Да, мы осуществляем доставку по всему городу. Бесплатная доставка при заказе от 5000 рублей. Доставка осуществляется в течение 2-3 часов после оформления заказа.',
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer:
      'Мы принимаем оплату наличными, банковскими картами, а также безналичный расчёт для юридических лиц. Возможна оплата частями через сервисы-партнёры.',
  },
  {
    question: 'Можно ли вернуть товар?',
    answer:
      'Да, вы можете вернуть товар в течение 14 дней при сохранении товарного вида и упаковки. Для возврата свяжитесь с нашим менеджером по телефону или через форму обратной связи.',
  },
  {
    question: 'Есть ли скидки для постоянных клиентов?',
    answer:
      'Да, мы ценим наших постоянных клиентов и предлагаем накопительную систему скидок: 5% на второй заказ, 10% на пятый заказ и 15% на десятый заказ.',
  },
  {
    question: 'Как хранить мясо после покупки?',
    answer:
      'Мы рекомендуем хранить мясо в холодильнике при температуре от 0 до +4°C не более 3 дней. Для длительного хранения используйте морозильную камеру, предварительно разделив мясо на порции.',
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
