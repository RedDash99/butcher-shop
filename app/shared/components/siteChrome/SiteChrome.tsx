import type { ReactNode } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import '@/styles/globals.css'

/**
 * Обёртка публичных страниц: шапка, подвал и глобальные стили сайта.
 * Админка на /studio её не подключает, поэтому получает чистый документ.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="page-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
