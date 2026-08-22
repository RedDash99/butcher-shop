import type { ReactNode } from 'react'
import SiteChrome from '@/components/siteChrome/SiteChrome'

export default function ContactsLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
