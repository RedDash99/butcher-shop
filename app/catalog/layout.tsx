import type { ReactNode } from 'react'
import SiteChrome from '@/components/siteChrome/SiteChrome'

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
