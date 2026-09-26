import React from 'react'
import Link from 'next/link'

interface WikiBreadcrumbProps {
  items: { label: string; href: string }[]
}

export default function WikiBreadcrumb({ items }: WikiBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="wiki-breadcrumb mb-6">
      <ol className="flex items-center space-x-2 font-mono text-sm text-ink-soft">
        <li>
          <Link href="/wiki" className="hover:text-signal transition-colors duration-200">
            Wiki
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <span className="mx-2 text-line">/</span>
            {index === items.length - 1 ? (
              <span className="text-ink font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-signal transition-colors duration-200">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
