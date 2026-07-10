'use client'

import { useState, useEffect, useRef } from 'react'

const OUTPUT_LINES = [
  { prefix: 'user', text: 'Input HT 190/120 pada pasien hamil', class: 'cmd-user' },
  { prefix: 'audrey', text: '[SYSTEM]: Menerima parameter vital [HT 190/120]...', class: 'cmd-ai' },
  {
    prefix: 'audrey',
    text: '[SINKRONISASI EMR]: Memindai ID Pasien #882-A (Perempuan, 32 Thn)...',
    class: 'cmd-ai',
  },
  {
    prefix: 'audrey',
    text: '[IDENTIFIKASI RISIKO]: Usia Kehamilan 34 Minggu | Riwayat PEB (2024).',
    class: 'cmd-ai',
  },
  {
    prefix: 'audrey',
    text: '*** CODE ALERT: PREEKLAMPSIA BERAT (SUPERIMPOSED) ***',
    class: 'cmd-warning',
  },
  {
    prefix: 'audrey',
    text: '[ANALISIS PREDIKTIF]: Probabilitas eklampsia dalam 2 jam: TINGGI (84%).',
    class: 'cmd-body',
  },
  { prefix: 'audrey', text: '[TINDAKAN TERKALIBRASI]:', class: 'cmd-heading' },
  { prefix: 'audrey', text: '- Akses IV ganda sekarang.', class: 'cmd-body' },
  { prefix: 'audrey', text: '- MgSO4 4g IV (Protokol Sentrapedia #PEB-04).', class: 'cmd-body' },
  {
    prefix: 'audrey',
    text: '- Nicardipine drip 5 mg/jam (Target MAP < 110 mmHg).',
    class: 'cmd-body',
  },
  { prefix: 'audrey', text: '[&_] Menunggu otorisasi klinis...', class: 'cmd-pending' },
]

const CHAR_SPEED = 20
const LINE_DELAY = 100

export default function CommandPrompt() {
  const [lines, setLines] = useState<number[]>([])
  const [charCount, setCharCount] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [done, setDone] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (done || lineIdx >= OUTPUT_LINES.length) {
      if (lineIdx >= OUTPUT_LINES.length) setDone(true)
      return
    }

    const line = OUTPUT_LINES[lineIdx]
    const isFinished = charCount >= line.text.length

    if (isFinished) {
      // Line done, move to next
      const id = setTimeout(() => {
        if (!mountedRef.current) return
        setLines((prev) => [...prev, lineIdx])
        setLineIdx((prev) => prev + 1)
        setCharCount(0)
      }, LINE_DELAY)
      return () => clearTimeout(id)
    }

    // Type next char
    const id = setTimeout(() => {
      if (!mountedRef.current) return
      setCharCount((prev) => prev + 1)
    }, CHAR_SPEED)
    return () => clearTimeout(id)
  }, [charCount, lineIdx, done])

  const currentLine = lineIdx < OUTPUT_LINES.length ? OUTPUT_LINES[lineIdx] : null
  const partialText = currentLine ? currentLine.text.slice(0, charCount) : ''

  return (
    <div className="command-prompt">
      <div className="command-prompt-body">
        {lines.map((idx) => {
          const line = OUTPUT_LINES[idx]
          return (
            <div key={idx} className={`command-prompt-line ${line.class}`}>
              <span className={line.prefix === 'user' ? 'cmd-user' : 'cmd-ai'}>
                {line.prefix}&gt;{' '}
              </span>
              {line.text}
            </div>
          )
        })}
        {currentLine && !done && (
          <div className={`command-prompt-line ${currentLine.class}`}>
            <span className={currentLine.prefix === 'user' ? 'cmd-user' : 'cmd-ai'}>
              {currentLine.prefix}&gt;{' '}
            </span>
            {partialText}
            <span className="command-prompt-cursor" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}
