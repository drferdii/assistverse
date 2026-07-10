import fs from 'fs'
import path from 'path'

export interface WikiPageItem {
  title: string
  path: string
  slug: string
  children?: WikiPageItem[]
  order: number
}

export interface WikiMeta {
  generatedAt: string
  commitHash: string
  branch: string
  pageCount: number
  topLevelSections: string[]
  pageOrder: string[]
}

const WIKI_DIR = path.join(process.cwd(), 'public', 'wiki')

export function getWikiMeta(): WikiMeta {
  const metaPath = path.join(WIKI_DIR, '.wiki-meta.json')
  const raw = fs.readFileSync(metaPath, 'utf-8')
  return JSON.parse(raw)
}

export function getWikiSidebarItems(): WikiPageItem[] {
  const meta = getWikiMeta()
  const items: WikiPageItem[] = []
  const sectionMap = new Map<string, WikiPageItem>()

  for (const pagePath of meta.pageOrder) {
    const parts = pagePath.split('/')
    const fileName = parts[parts.length - 1]
    const slug = fileName.replace('.md', '')
    const title = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    if (parts.length === 1) {
      // Top-level file
      items.push({
        title,
        path: pagePath,
        slug: pagePath.replace('.md', ''),
        order: items.length,
      })
    } else {
      // Nested file
      const sectionSlug = parts[0]
      let section = sectionMap.get(sectionSlug)

      if (!section) {
        section = {
          title: sectionSlug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          path: `${sectionSlug}/index.md`,
          slug: sectionSlug,
          children: [],
          order: items.length,
        }
        sectionMap.set(sectionSlug, section)
        items.push(section)
      }

      section.children = section.children || []
      section.children.push({
        title,
        path: pagePath,
        slug: `${sectionSlug}/${slug}`,
        order: section.children.length,
      })
    }
  }

  return items
}

export function getWikiPage(slug: string[]): { content: string; title: string } | null {
  const meta = getWikiMeta()
  const slugPath = slug.join('/')

  // Try exact match first
  let pagePath = meta.pageOrder.find((p) => p.replace('.md', '') === slugPath)

  // If not found, try with index.md
  if (!pagePath) {
    pagePath = meta.pageOrder.find((p) => p.startsWith(slugPath + '/index'))
  }

  if (!pagePath) return null

  const fullPath = path.join(WIKI_DIR, pagePath)
  if (!fs.existsSync(fullPath)) return null

  const content = fs.readFileSync(fullPath, 'utf-8')

  // Extract title from first H1
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : 'Wiki Page'

  return { content, title }
}

export function getAllWikiPaths(): string[][] {
  const meta = getWikiMeta()
  return meta.pageOrder.map((pagePath) => {
    const slug = pagePath.replace('.md', '')
    return slug.split('/')
  })
}
