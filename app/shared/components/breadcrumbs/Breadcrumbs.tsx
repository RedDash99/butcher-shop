'use client'
import { useSelectedLayoutSegments } from 'next/navigation'
import Container from '../container/Container'
import styles from './breadcrumbs.module.css'

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()
  console.log(segments)
  return (
    <Container>
      <ul className={styles.breadcrumbs_list}>
        {segments.map((segment) => (
          <li key={segment} className={styles.breadcrumbs_item}>
            / {segment}
          </li>
        ))}
      </ul>
    </Container>
  )
}
