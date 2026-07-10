import Link from 'next/link'

type Section = {
  key: string
  title: string
  items: { label: string; href: string; ariaCurrent?: boolean }[]
}

const SECTIONS: Section[] = [
  {
    key: 'pages',
    title: 'Pages',
    items: [
      { label: 'Manifesto', href: '/manifesto' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Principles', href: '/principles' },
      { label: 'Contact', href: '/contact' },
      { label: 'ACARS', href: '/acars' },
    ],
  },
  {
    key: 'legal',
    title: 'Legal',
    items: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Press', href: 'mailto:drferdiiskandar@sentrahai.com' },
    ],
  },
  {
    key: 'contact',
    title: 'Contact',
    items: [
      { label: 'drferdiiskandar@sentrahai.com', href: 'mailto:drferdiiskandar@sentrahai.com' },
      { label: 'Kirim brief', href: '/contact' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div>
        <Link className="col-mark" href="/">
          SENTRA&nbsp;ASSIST
        </Link>
        <span className="col-tagline">Clinical intelligence untuk layanan primer Indonesia.</span>
      </div>
      {SECTIONS.map((section) => (
        <div key={section.key}>
          <p className="col-title">{section.title}</p>
          <ul className="col-list">
            {section.items.map((item) => (
              <li key={item.label}>
                <Link href={item.href} aria-current={item.ariaCurrent ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="legal flex-col text-[10px] opacity-60 leading-tight">
        <span>Copyright &copy; 2026 Sentra Artificial intelligence. All rights reserved.</span>
        <span>
          This software is protected by copyright laws and international treaties. Unauthorized
          reproduction or distribution is strictly prohibited.
        </span>
      </div>
    </footer>
  )
}
