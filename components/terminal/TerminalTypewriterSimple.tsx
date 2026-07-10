'use client'

import { useState, useEffect, useRef } from 'react'

const BLOCKS = [
  { type: 'eyebrow', text: 'SIDELAB · Clinical Intelligence · Sentra SideLab Project' },
  { type: 'input-label', text: 'INPUT DOKTER >' },
  {
    type: 'input-text',
    text: '1 pasien usia 30 tahun datang dengan nyeri pada panggul kanan yang menjalar hingga lutut. Nyeri dirasakan terus menerus. Nyeri sejak 1 hari yang lalu. BAK :Dysuria (-) Demam (-), Batuk (-) sesak (-) mual (-) muntah (-). Riw. Dm (-) riw. Ht (-) riw. Trauma (-)',
  },
  { type: 'step', text: '✓ Menganalisis keluhan…' },
  { type: 'step', text: '✓ Clinical chains aktif: Batuk, Mual' },
  { type: 'step', text: '✓ Mengambil referensi klinis (RAG)…' },
  { type: 'step', text: '✓ Memproses dengan Sentra Voss 1.7 — mohon tunggu…' },
  {
    type: 'case',
    text: 'Pasien usia 30 tahun dengan nyeri panggul kanan menjalar ke lutut sejak 1 hari, tanpa disuria, demam, riwayat trauma.',
  },
  { type: 'label', text: 'Clinical Chains' },
  { type: 'chain-name', text: 'Batuk' },
  { type: 'chain-sx', text: '→ Demam, Sesak napas, Nyeri dada, Rhinorhea atau pilek' },
  { type: 'chain-px', text: 'Px: Auskultasi Pulmo, Inspeksi Faring' },
  { type: 'chain-name', text: 'Mual' },
  { type: 'chain-sx', text: '→ Muntah, Anoreksia, Pusing, Keringat dingin' },
  { type: 'chain-px', text: 'Px: Palpasi Abdomen, Tanda Vital' },
  { type: 'label', text: 'Klarifikasi' },
  { type: 'list', text: 'Karakter nyeri (tajam/tumpul/ seperti tertusuk)?' },
  { type: 'list', text: 'Apakah nyeri bertambah saat batuk/bersin/mengejan?' },
  { type: 'list', text: 'Apakah ada kelemahan otot atau mati rasa pada tungkai?' },
  { type: 'label', text: 'Diagnosis Kerja' },
  { type: 'dx-status', text: '● DATA KURANG' },
  { type: 'dx-text', text: 'Low back pain (Lumbago) dengan radikulopati' },
  { type: 'footer', text: 'ketik keluhan atau /help untuk daftar perintah' },
]

function getSpeed(char: string): number {
  const base = 15 + Math.random() * 20
  if (char === '.' || char === '…' || char === '!' || char === '?') return base * 5
  if (char === ',' || char === ';' || char === ':') return base * 2.5
  if (char === ' ') return base * 0.6
  return base
}

export default function TerminalTypewriter() {
  const [visibleTexts, setVisibleTexts] = useState<string[]>([])
  const [currentBlock, setCurrentBlock] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(interval)
  }, [])

  // Typing effect
  useEffect(() => {
    if (isComplete) return

    if (currentBlock >= BLOCKS.length) {
      setIsComplete(true)
      // Restart after 3 seconds
      timerRef.current = setTimeout(() => {
        setVisibleTexts([])
        setCurrentBlock(0)
        setCurrentChar(0)
        setIsComplete(false)
      }, 3000)
      return
    }

    const block = BLOCKS[currentBlock]
    const fullText = block.text

    if (currentChar >= fullText.length) {
      // Block done, move to next
      timerRef.current = setTimeout(() => {
        setCurrentBlock((prev) => prev + 1)
        setCurrentChar(0)
      }, 180)
      return
    }

    const char = fullText[currentChar]
    const delay = getSpeed(char)

    timerRef.current = setTimeout(() => {
      setVisibleTexts((prev) => {
        const updated = [...prev]
        updated[currentBlock] = fullText.slice(0, currentChar + 1)
        return updated
      })
      setCurrentChar((prev) => prev + 1)
    }, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentBlock, currentChar, isComplete])

  const renderBlock = (block: (typeof BLOCKS)[0], index: number) => {
    const text = visibleTexts[index] || ''
    const isCurrent = index === currentBlock && !isComplete

    const cursor = isCurrent ? (
      <span
        style={{
          display: 'inline-block',
          width: '7px',
          height: '1em',
          background: '#c9a84c',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          opacity: showCursor ? 1 : 0,
        }}
      />
    ) : null

    switch (block.type) {
      case 'eyebrow':
        return (
          <div
            key={index}
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#9E9C95',
              marginBottom: '6px',
            }}
          >
            {text}
            {cursor}
          </div>
        )
      case 'input-label':
        return (
          <div
            key={index}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#c9a84c',
              marginTop: '22px',
              marginBottom: '6px',
            }}
          >
            {text}
            {cursor}
          </div>
        )
      case 'input-text':
        return (
          <div
            key={index}
            style={{
              fontSize: '12.5px',
              color: '#E0DDD5',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {text}
            {cursor}
          </div>
        )
      case 'step':
        return (
          <div key={index} style={{ fontSize: '12px', color: '#B8B5AC', marginBottom: '5px' }}>
            <span style={{ color: '#6b9e6b', marginRight: '6px' }}>✓</span>
            {text}
            {cursor}
          </div>
        )
      case 'case':
        return (
          <div
            key={index}
            style={{
              fontSize: '12px',
              color: '#B8B5AC',
              lineHeight: 1.7,
              margin: '16px 0',
              paddingLeft: '12px',
              borderLeft: '2px solid rgba(138, 115, 48, 0.25)',
            }}
          >
            {text}
            {cursor}
          </div>
        )
      case 'label':
        return (
          <div
            key={index}
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: '#c9a84c',
              marginTop: '22px',
              marginBottom: '8px',
            }}
          >
            {text}
            {cursor}
          </div>
        )
      case 'chain-name':
        return (
          <div
            key={index}
            style={{ fontSize: '12.5px', fontWeight: 600, color: '#E0DDD5', marginBottom: '3px' }}
          >
            {text}
            {cursor}
          </div>
        )
      case 'chain-sx':
        return (
          <div key={index} style={{ fontSize: '11.5px', color: '#B8B5AC', paddingLeft: '14px' }}>
            <span style={{ color: '#9E9C95', marginRight: '4px' }}>→</span>
            {text}
            {cursor}
          </div>
        )
      case 'chain-px':
        return (
          <div
            key={index}
            style={{ fontSize: '11px', color: '#c9a84c', paddingLeft: '14px', marginTop: '2px' }}
          >
            {text}
            {cursor}
          </div>
        )
      case 'list':
        return (
          <li
            key={index}
            style={{
              fontSize: '11.5px',
              color: '#B8B5AC',
              lineHeight: 1.65,
              marginBottom: '6px',
              paddingLeft: '20px',
              position: 'relative',
            }}
          >
            {text}
            {cursor}
          </li>
        )
      case 'dx-status':
        return (
          <div
            key={index}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: '2px solid #d49a4a',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: '#d49a4a',
                letterSpacing: '0.04em',
              }}
            >
              {text}
              {cursor}
            </span>
          </div>
        )
      case 'dx-text':
        return (
          <div key={index} style={{ fontSize: '12px', color: '#B8B5AC', lineHeight: 1.65 }}>
            {text}
            {cursor}
          </div>
        )
      case 'footer':
        return (
          <div
            key={index}
            style={{
              marginTop: '24px',
              paddingTop: '14px',
              fontSize: '10.5px',
              color: '#9E9C95',
              letterSpacing: '0.04em',
            }}
          >
            {text}
            {cursor}
          </div>
        )
      default:
        return (
          <div key={index}>
            {text}
            {cursor}
          </div>
        )
    }
  }

  const renderContent = () => {
    const elements: React.ReactNode[] = []
    let listItems: React.ReactNode[] = []

    BLOCKS.forEach((block, index) => {
      if (index >= currentBlock && !isComplete) return // Don't show future blocks

      if (block.type === 'list') {
        listItems.push(renderBlock(block, index))
      } else {
        if (listItems.length > 0) {
          elements.push(
            <ul
              key={`list-${index}`}
              style={{ listStyle: 'none', counterReset: 'klar', padding: 0, margin: 0 }}
            >
              {listItems}
            </ul>
          )
          listItems = []
        }
        elements.push(renderBlock(block, index))
      }
    })

    if (listItems.length > 0) {
      elements.push(
        <ul
          key="list-final"
          style={{ listStyle: 'none', counterReset: 'klar', padding: 0, margin: 0 }}
        >
          {listItems}
        </ul>
      )
    }

    return elements
  }

  return (
    <div
      style={{
        padding: '24px 10ch 8px 0',
        fontSize: '12.5px',
        lineHeight: 1.7,
        letterSpacing: '0.01em',
        fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        color: '#E0DDD5',
        background: 'transparent',
      }}
    >
      {renderContent()}
    </div>
  )
}
