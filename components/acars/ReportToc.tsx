'use client'

import { useEffect, useState } from 'react'
import { tocItems } from './data'

export default function ReportToc() {
  const [active, setActive] = useState('executive-summary')

  useEffect(() => {
    const els = tocItems
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="Daftar isi" className="hidden lg:block">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft mb-4 pl-4">
        Daftar Isi
      </div>
      {tocItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault()
            scrollTo(item.id)
          }}
          className={`block py-2 px-4 font-mono text-[11px] font-bold uppercase tracking-wider border-l-2 transition-all cursor-pointer ${
            active === item.id
              ? 'border-ink text-ink'
              : 'border-line text-ink-soft hover:border-ink hover:text-ink'
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
