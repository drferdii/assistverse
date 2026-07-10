const FG = 'var(--ink)'
const BG = 'var(--paper)'
const MUTED = 'var(--ink-soft)'
const BORDER = 'var(--line)'
const ACCENT = 'var(--signal)'
const CHART3 = 'var(--signal-deep)'
const CHART4 = 'var(--ink-soft)'

export function MauChart() {
  const months = [
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
  ]
  const pts: [number, number][] = [
    [40, 180],
    [81, 166],
    [122, 148],
    [163, 133],
    [205, 136],
    [246, 121],
    [287, 102],
    [328, 88],
    [369, 80],
    [410, 66],
    [451, 48],
    [490, 25],
  ]
  const poly = pts.map((p) => p.join(',')).join(' ')
  return (
    <div className="border border-line p-5 bg-paper">
      <h3 className="font-display text-sm font-medium mb-4">
        Pengguna Aktif Bulanan &mdash; 12 Bulan Terakhir
      </h3>
      <svg
        viewBox="0 0 500 220"
        className="w-full h-auto block"
        role="img"
        aria-label="Monthly active users growing from 7,200 to 12,847 over 12 months"
      >
        {[15, 56, 98, 139].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="490"
            y2={y}
            stroke={BORDER}
            strokeWidth="0.5"
            strokeDasharray="4 2"
          />
        ))}
        <line x1="40" y1="180" x2="490" y2="180" stroke={BORDER} strokeWidth="1" />
        {['14K', '12K', '10K', '8K', '6K'].map((l, i) => (
          <text
            key={l}
            x="36"
            y={18 + i * 42}
            fontFamily={MUTED}
            fontSize="9"
            fontWeight="700"
            fill={MUTED}
            textAnchor="end"
          >
            {l}
          </text>
        ))}
        {months.map((m, i) => (
          <text
            key={m}
            x={40 + i * 40.9}
            y="198"
            fontSize="8"
            fontWeight="700"
            fill={MUTED}
            textAnchor="middle"
          >
            {m}
          </text>
        ))}
        <polygon points={`${poly} 490,180 40,180`} fill={FG} opacity="0.05" />
        <polyline
          points={poly}
          fill="none"
          stroke={FG}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pts.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === 11 ? '3.5' : '2.5'}
            fill={i === 11 ? FG : BG}
            stroke={FG}
            strokeWidth="1.5"
          />
        ))}
        <text x="490" y="18" fontSize="10" fontWeight="700" fill={FG} textAnchor="middle">
          12,847
        </text>
      </svg>
      <p className="font-mono text-[10px] text-ink-soft mt-3">
        Aktif = &ge;1 kueri diagnostik dalam bulan kalender.
      </p>
    </div>
  )
}

export function AdoptionFunnel() {
  const bars = [
    { label: 'Terinstal', w: 360, val: '19.200', opacity: 0.2 },
    { label: 'Teraktivasi', w: 270, val: '14.400 (75%)', opacity: 0.4 },
    { label: 'Mingguan', w: 158, val: '8.400 (44%)', opacity: 0.6 },
    { label: 'Harian', w: 101, val: '5.400 (28%)', opacity: 1 },
  ]
  return (
    <div className="border border-line p-5 bg-paper">
      <h3 className="font-display text-sm font-medium mb-4">
        Funnel Adopsi &mdash; Kohort Q1 2026
      </h3>
      <svg
        viewBox="0 0 500 200"
        className="w-full h-auto block"
        role="img"
        aria-label="Funnel adopsi: 19.200 terinstal hingga 5.400 aktif harian"
      >
        {bars.map((b, i) => (
          <g key={i}>
            <text
              x="90"
              y={30 + i * 45}
              fontSize="9"
              fontWeight="700"
              fill={MUTED}
              textAnchor="end"
            >
              {b.label}
            </text>
            <rect
              x="95"
              y={16 + i * 45}
              width={b.w}
              height="24"
              fill={FG}
              opacity={b.opacity}
              rx="1"
            />
            <text x={100 + b.w} y={33 + i * 45} fontSize="10" fontWeight="700" fill={MUTED}>
              {b.val}
            </text>
          </g>
        ))}
      </svg>
      <p className="font-mono text-[10px] text-ink-soft mt-3">
        Aktivasi = &ge;3 kueri dalam 7 hari pertama.
      </p>
    </div>
  )
}

export function AccuracyBySpecialty() {
  const bars = [
    { name: 'Cardio.', pct: 96.4, y: 46, h: 164, op: 1 },
    { name: 'Pulm.', pct: 95.1, y: 59, h: 151, op: 0.8 },
    { name: 'Neuro.', pct: 93.7, y: 73, h: 137, op: 0.65 },
    { name: 'Onco.', pct: 92.8, y: 82, h: 128, op: 0.55 },
    { name: 'Gen.P.', pct: 90.8, y: 102, h: 108, op: 0.45 },
  ]
  return (
    <div className="border border-line p-5 bg-paper">
      <h3 className="font-display text-sm font-medium mb-4">
        Akurasi Diagnostik berdasarkan Spesialisasi Medis
      </h3>
      <svg
        viewBox="0 0 500 250"
        className="w-full h-auto block"
        role="img"
        aria-label="Bar chart of diagnostic accuracy by specialty"
      >
        {[10, 60, 110, 160].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="480"
            y2={y}
            stroke={BORDER}
            strokeWidth="0.5"
            strokeDasharray="4 2"
          />
        ))}
        <line x1="40" y1="210" x2="480" y2="210" stroke={BORDER} strokeWidth="1" />
        {['100%', '95%', '90%', '85%', '80%'].map((l, i) => (
          <text
            key={l}
            x="36"
            y={14 + i * 50}
            fontSize="9"
            fontWeight="700"
            fill={MUTED}
            textAnchor="end"
          >
            {l}
          </text>
        ))}
        <line
          x1="40"
          y1="126.5"
          x2="480"
          y2="126.5"
          stroke={MUTED}
          strokeWidth="1"
          strokeDasharray="6 3"
          opacity="0.4"
        />
        <text x="484" y="129" fontSize="8" fontWeight="700" fill={MUTED}>
          88,3% bench.
        </text>
        {bars.map((s, i) => (
          <g key={i}>
            <rect x={60 + i * 88} y={s.y} width="52" height={s.h} fill={FG} opacity={s.op} rx="1" />
            <text
              x={86 + i * 88}
              y={s.y - 6}
              fontSize="10"
              fontWeight="700"
              fill={FG}
              textAnchor="middle"
            >
              {s.pct}%
            </text>
            <text
              x={86 + i * 88}
              y="228"
              fontSize="8"
              fontWeight="700"
              fill={MUTED}
              textAnchor="middle"
            >
              {s.name}
            </text>
          </g>
        ))}
      </svg>
      <p className="font-mono text-[10px] text-ink-soft mt-3">
        Garis putus-putus = baseline klinis tanpa bantuan (88,3%). [3]
      </p>
    </div>
  )
}

export function PerformanceComparison() {
  const groups = [
    {
      label: 'Sensitivitas',
      cx: 105,
      bars: [
        { v: 88.2, c: MUTED, o: 0.4 },
        { v: 94.8, c: FG, o: 1 },
        { v: 93.1, c: ACCENT, o: 0.7 },
      ],
    },
    {
      label: 'Spesifisitas',
      cx: 245,
      bars: [
        { v: 86.4, c: MUTED, o: 0.4 },
        { v: 93.1, c: FG, o: 1 },
        { v: 92.0, c: ACCENT, o: 0.7 },
      ],
    },
    {
      label: 'PPV',
      cx: 385,
      bars: [
        { v: 84.7, c: MUTED, o: 0.4 },
        { v: 91.7, c: FG, o: 1 },
        { v: 90.5, c: ACCENT, o: 0.7 },
      ],
    },
  ]
  return (
    <div className="border border-line p-5 bg-paper">
      <h3 className="font-display text-sm font-medium mb-4">Sentra vs. Baseline vs. Benchmark</h3>
      <svg
        viewBox="0 0 500 250"
        className="w-full h-auto block"
        role="img"
        aria-label="Grouped bar chart comparing sensitivity, specificity, and PPV"
      >
        {[10, 60, 110, 160].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="460"
            y2={y}
            stroke={BORDER}
            strokeWidth="0.5"
            strokeDasharray="4 2"
          />
        ))}
        <line x1="40" y1="210" x2="460" y2="210" stroke={BORDER} strokeWidth="1" />
        {['100%', '95%', '90%', '85%', '80%'].map((l, i) => (
          <text
            key={l}
            x="36"
            y={14 + i * 50}
            fontSize="9"
            fontWeight="700"
            fill={MUTED}
            textAnchor="end"
          >
            {l}
          </text>
        ))}
        {groups.map((group, gi) => (
          <g key={gi}>
            {group.bars.map((b, bi) => {
              const y = 10 + (100 - b.v) * 2
              const h = 210 - y
              return (
                <g key={bi}>
                  <rect
                    x={group.cx - 45 + bi * 35}
                    y={y}
                    width="30"
                    height={h}
                    fill={b.c}
                    opacity={b.o}
                    rx="1"
                  />
                  <text
                    x={group.cx - 30 + bi * 35}
                    y={y - 5}
                    fontSize="8"
                    fontWeight="700"
                    fill={bi === 1 ? FG : MUTED}
                    textAnchor="middle"
                  >
                    {b.v}
                  </text>
                </g>
              )
            })}
            <text
              x={group.cx}
              y="228"
              fontSize="9"
              fontWeight="700"
              fill={MUTED}
              textAnchor="middle"
            >
              {group.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex gap-5 flex-wrap mt-4 pt-3 border-t border-line font-mono text-[9px] font-bold uppercase tracking-wider text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5" style={{ background: MUTED, opacity: 0.4 }} />
          Baseline
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5" style={{ background: FG }} />
          Sentra Assist
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5" style={{ background: ACCENT, opacity: 0.7 }} />
          Benchmark CDSS
        </span>
      </div>
    </div>
  )
}

export function OutcomesDistribution() {
  const rows = [
    { label: 'Pengguna Baru', data: [38, 28, 22, 12] },
    { label: 'Menengah', data: [48, 25, 18, 9] },
    { label: 'Berpengalaman', data: [55, 22, 15, 8] },
  ]
  const colors = [FG, ACCENT, CHART3, CHART4]
  const opacities = [1, 0.8, 0.7, 0.9]
  return (
    <div className="border border-line p-5 bg-paper">
      <h3 className="font-display text-sm font-medium mb-4">
        Distribusi Luaran Encounter berdasarkan Kohort Pengguna
      </h3>
      <svg
        viewBox="0 0 500 200"
        className="w-full h-auto block"
        role="img"
        aria-label="Stacked horizontal bar chart of clinical outcomes by cohort"
      >
        {rows.map((row, ri) => {
          let x = 95
          return (
            <g key={ri}>
              <text
                x="90"
                y={42 + ri * 55}
                fontSize="9"
                fontWeight="700"
                fill={MUTED}
                textAnchor="end"
              >
                {row.label}
              </text>
              {row.data.map((pct, pi) => {
                const w = pct * 4
                const currentX = x
                x += w
                return (
                  <g key={pi}>
                    <rect
                      x={currentX}
                      y={26 + ri * 55}
                      width={w}
                      height="28"
                      fill={colors[pi]}
                      opacity={opacities[pi]}
                      rx={pi === 0 ? '2' : '0'}
                    />
                    <text
                      x={currentX + w / 2}
                      y={45 + ri * 55}
                      fontSize="9"
                      fontWeight="700"
                      fill={pi < 2 ? BG : FG}
                      textAnchor="middle"
                    >
                      {pct}%
                    </text>
                  </g>
                )
              })}
            </g>
          )
        })}
      </svg>
      <div className="flex gap-5 flex-wrap mt-4 pt-3 border-t border-line font-mono text-[9px] font-bold uppercase tracking-wider text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5" style={{ background: FG }} />
          Terkonfirmasi
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5" style={{ background: ACCENT }} />
          Dimodifikasi
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5" style={{ background: CHART3 }} />
          Rujukan
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5" style={{ background: CHART4 }} />
          Tindak Lanjut
        </span>
      </div>
      <p className="font-mono text-[10px] text-ink-soft mt-3">
        N = 284.128 encounter. Kohort berpengalaman menunjukkan tingkat konfirmasi 17pp lebih
        tinggi.
      </p>
    </div>
  )
}
