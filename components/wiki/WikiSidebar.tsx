import React from 'react'
import Link from 'next/link'
import { WikiPageItem } from '@/lib/wiki'

interface WikiSidebarProps {
  items: WikiPageItem[]
  currentPath: string
}

export default function WikiSidebar({ items, currentPath }: WikiSidebarProps) {
  return (
    <aside className="wiki-sidebar sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4">
      <nav className="space-y-1" aria-label="Wiki navigation">
        {items.map((item) => (
          <SidebarItem key={item.slug} item={item} currentPath={currentPath} depth={0} />
        ))}
      </nav>
    </aside>
  )
}

function SidebarItem({
  item,
  currentPath,
  depth,
}: {
  item: WikiPageItem
  currentPath: string
  depth: number
}) {
  const isActive = currentPath === item.slug
  const isParent = item.children && item.children.length > 0
  const hasActiveChild = isParent && item.children!.some((child) => child.slug === currentPath)

  return (
    <div className="sidebar-item">
      <Link
        href={`/wiki/${item.slug}`}
        className={`sidebar-link block py-1.5 px-3 rounded-none text-sm transition-colors duration-200 ${
          isActive
            ? 'bg-signal/10 text-signal font-medium'
            : hasActiveChild
              ? 'text-ink font-medium'
              : 'text-ink-soft hover:text-ink hover:bg-paper-pure'
        }`}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        <span className="font-mono text-xs mr-2 opacity-50">
          {String(item.order + 1).padStart(2, '0')}
        </span>
        {item.title}
      </Link>

      {isParent && (hasActiveChild || isActive) && (
        <div className="sidebar-children mt-1 space-y-1">
          {item.children!.map((child) => (
            <SidebarItem
              key={child.slug}
              item={child}
              currentPath={currentPath}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
