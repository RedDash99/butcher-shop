'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

/**
 * Админка живёт только на клиенте: пакет `sanity` не собирается под серверные
 * компоненты, поэтому конфиг импортируется за границей 'use client'.
 */
export default function Studio() {
  return <NextStudio config={config} />
}
