import React from 'react'
import Link from 'next/link'
import { getWikiSidebarItems } from '@/lib/wiki'
import WikiLayout from '@/components/wiki/WikiLayout'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export default function WikiIndexPage() {
  const sidebarItems = getWikiSidebarItems()

  return (
    <WikiLayout sidebarItems={sidebarItems} currentPath="">
      <div className="wiki-index">
        {/* Hero */}
        <section className="py-16">
          <SplitText
            text="Assist Wikipedia"
            className="page-title font-display font-bold text-ink"
            delay={0.1}
            stagger={0.05}
          />
          <Reveal delay={0.3} className="mt-6">
            <p className="lede-paragraph text-ink-soft max-w-2xl">
              Dokumentasi komprehensif Sentra Assist — arsitektur, fitur, sistem, dan panduan
              penggunaan untuk pengembang dan klinisi.
            </p>
          </Reveal>
        </section>

        {/* Sections Grid */}
        <section className="py-12">
          <Stagger stagger={0.1} delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sidebarItems.map((item) => (
                <StaggerItem key={item.slug}>
                  <Link
                    href={`/wiki/${item.slug}`}
                    className="card group block p-6 bg-paper-pure border border-line rounded-lg hover:border-signal transition-all duration-180"
                  >
                    <h3 className="font-display text-xl font-semibold text-ink group-hover:text-signal transition-colors duration-180">
                      {item.title}
                    </h3>
                    {item.children && (
                      <p className="prose text-ink-soft mt-2">{item.children.length} halaman</p>
                    )}
                    <span className="signal-link mt-4 inline-block text-sm font-mono">
                      Jelajahi →
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </section>
      </div>
    </WikiLayout>
  )
}
