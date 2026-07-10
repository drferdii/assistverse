type SideRailProps = {
  dark?: boolean
}

export default function SideRail({ dark = false }: SideRailProps) {
  return (
    <aside className="side-rail" aria-hidden="true">
      <style>{dark ? `.side-rail { color: var(--line-dark); }` : ''}</style>
      <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="4"
          y="2"
          width="56"
          height="116"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line x1="12" y1="22" x2="50" y2="22" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="30" x2="44" y2="30" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="38" x2="48" y2="38" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="58" x2="42" y2="58" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="66" x2="50" y2="66" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="74" x2="40" y2="74" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="92" x2="46" y2="92" stroke="currentColor" strokeWidth="1" />
        <rect
          x="62"
          y="22"
          width="14"
          height="76"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line x1="66" y1="34" x2="72" y2="34" stroke="currentColor" strokeWidth="1" />
        <line x1="66" y1="42" x2="72" y2="42" stroke="currentColor" strokeWidth="1" />
        <line x1="66" y1="50" x2="72" y2="50" stroke="currentColor" strokeWidth="1" />
        <circle className="signal-dot" cx="69" cy="58" r="1.8" />
      </svg>
    </aside>
  )
}
