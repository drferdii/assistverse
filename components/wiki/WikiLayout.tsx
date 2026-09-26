import React from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import WikiSidebar from './WikiSidebar'
import { WikiPageItem } from '@/lib/wiki'

interface WikiLayoutProps {
  children: React.ReactNode
  sidebarItems: WikiPageItem[]
  currentPath: string
}

export default function WikiLayout({ children, sidebarItems, currentPath }: WikiLayoutProps) {
  return (
    <div className="wiki-layout min-h-screen bg-paper">
      <SiteHeader current="wiki" />
      <div className="max-w-page mx-auto px-gutter">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <WikiSidebar items={sidebarItems} currentPath={currentPath} />
          </div>

          {/* Main Content */}
          <main id="main" className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
