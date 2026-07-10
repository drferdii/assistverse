'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { User } from './data'

const CENTER: [number, number] = [112.0156, -7.8114]

export default function AcarsMap({ users }: { users: User[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    let m: maplibregl.Map | null = null
    try {
      m = new maplibregl.Map({
        container: containerRef.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: CENTER,
        zoom: 15,
        attributionControl: false,
        scrollZoom: false,
      })

      m.on('load', () => {
        setReady(true)

        const baseEl = document.createElement('div')
        baseEl.className = 'relative flex items-center justify-center'
        baseEl.innerHTML =
          '<div class="absolute w-10 h-10 rounded-full bg-ink/5 border border-ink/20 animate-ping"></div>' +
          '<div class="relative z-10 w-4 h-4 bg-ink rotate-45 border-2 border-paper shadow-lg flex items-center justify-center">' +
          '<div class="w-1 h-1 bg-paper rounded-full"></div></div>' +
          '<div class="absolute top-full mt-3 px-3 py-1 bg-ink text-paper text-[10px] font-mono font-bold rounded-sm whitespace-nowrap z-50 shadow-xl">PUSAT ACARS</div>'
        new maplibregl.Marker({ element: baseEl }).setLngLat(CENTER).addTo(m!)

        users.forEach((u) => {
          const el = document.createElement('div')
          el.className = 'relative flex items-center justify-center group'
          const isAuditor = u.name.includes('Ferdi')
          const bg = isAuditor ? 'var(--ink)' : 'var(--ink-soft)'
          el.innerHTML =
            `<div class="w-3.5 h-3.5 rounded-full border-2 border-paper shadow-md cursor-pointer transition-all duration-300 hover:scale-125" style="background:${bg}"></div>` +
            `<div class="absolute bottom-full mb-3 px-2 py-1 bg-ink text-paper text-[9px] font-mono font-bold rounded-sm opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-50 pointer-events-none shadow-md">${u.name.toUpperCase()}</div>`
          new maplibregl.Marker({ element: el }).setLngLat([u.lng, u.lat]).addTo(m!)
        })
      })
    } catch (e) {
      console.error(e)
    }

    return () => {
      m?.remove()
    }
  }, [users])

  return (
    <div ref={containerRef} className="h-full w-full relative">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-paper-pure z-10 font-mono text-[10px] uppercase tracking-widest text-ink-soft animate-pulse">
          Memulai node spasial...
        </div>
      )}
    </div>
  )
}
