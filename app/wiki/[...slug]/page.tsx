import React from 'react'
import { notFound } from 'next/navigation'
import { getWikiSidebarItems, getWikiPage, getAllWikiPaths } from '@/lib/wiki'
import WikiLayout from '@/components/wiki/WikiLayout'
import WikiBreadcrumb from '@/components/wiki/WikiBreadcrumb'
import WikiContent from '@/components/wiki/WikiContent'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'

interface WikiPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const paths = getAllWikiPaths()
  return paths.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: WikiPageProps) {
  const { slug } = await params
  const page = getWikiPage(slug)
  if (!page) return { title: 'Not Found' }
  return {
    title: `${page.title} — Sentra Assist Wiki`,
    description: `Dokumentasi ${page.title} untuk Sentra Assist`,
  }
}

export default async function WikiPage({ params }: WikiPageProps) {
  const { slug } = await params
  const page = getWikiPage(slug)

  if (!page) {
    notFound()
  }

  const sidebarItems = getWikiSidebarItems()
  const currentPath = slug.join('/')

  // Build breadcrumb
  const breadcrumbItems = []
  let accumulatedPath = ''
  for (let i = 0; i < slug.length; i++) {
    accumulatedPath = accumulatedPath ? `${accumulatedPath}/${slug[i]}` : slug[i]
    const label = slug[i]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    breadcrumbItems.push({
      label,
      href: `/wiki/${accumulatedPath}`,
    })
  }

  return (
    <WikiLayout sidebarItems={sidebarItems} currentPath={currentPath}>
      <div className="wiki-page">
        <WikiBreadcrumb items={breadcrumbItems} />

        <Reveal>
          <SplitText
            text={page.title}
            className="page-title font-display font-bold text-ink mb-8"
            delay={0.1}
            stagger={0.05}
          />
        </Reveal>

        <Reveal delay={0.3}>
          <WikiContent content={page.content} />
        </Reveal>
      </div>
    </WikiLayout>
  )
}
