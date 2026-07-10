import Link from 'next/link'
import { assetPath } from '@/lib/site'

type HeaderProps = {
  current?:
    | 'manifesto'
    | 'capabilities'
    | 'principles'
    | 'contact'
    | 'privacy'
    | 'terms'
    | 'acars'
    | 'sentrapedia'
    | 'wiki'
  dark?: boolean
}

const NAV_ITEMS: { key: NonNullable<HeaderProps['current']>; label: string; href: string }[] = [
  { key: 'acars', label: 'ACARS', href: '/acars' },
  { key: 'capabilities', label: 'Capabilities', href: '/capabilities' },
  { key: 'contact', label: 'Contact', href: '/contact' },
  { key: 'manifesto', label: 'Manifesto', href: '/manifesto' },
  { key: 'principles', label: 'Principles', href: '/principles' },
  { key: 'sentrapedia', label: 'Sentrapedia', href: '/sentrapedia' },
  { key: 'wiki', label: 'Wiki', href: '/wiki' },
]

export default function SiteHeader({ current, dark = false }: HeaderProps) {
  void dark

  return (
    <header className="site-header">
      <Link className="wordmark flex items-center gap-2" href="/">
        <img src={assetPath('/sentralogo.png')} alt="" className="w-6 h-6" />
        <span>SENTRA ARTIFICIAL INTELLIGENCE</span>
      </Link>
      <nav aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            aria-current={current === item.key ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
