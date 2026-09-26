'use client'

import { useState, useMemo, useEffect } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import {
  DISEASES,
  CATEGORIES,
  stats,
  type Disease,
} from '@/components/sentrapedia/data'
import { assetPath } from '@/lib/site'
import './sentrapedia.css'

export default function SentrapediaPage() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    let r: Disease[] = DISEASES
    if (activeCat) r = r.filter((d) => d.kategori === activeCat)
    if (search.trim()) {
      const s = search.toLowerCase()
      r = r.filter(
        (d) =>
          d.nama.toLowerCase().includes(s) ||
          d.kode.toLowerCase().includes(s) ||
          d.definisi.toLowerCase().includes(s)
      )
    }
    return r
  }, [search, activeCat])

  const catCount = (catId: string) => DISEASES.filter((d: Disease) => d.kategori === catId).length

  const openSidebar = (d: Disease) => {
    setSelectedDisease(d)
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
    setTimeout(() => setSelectedDisease(null), 400)
  }

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <>
      <SiteHeader current="sentrapedia" />
      <main id="main" className="sentrapedia-page">
        {/* Hero */}
        <section className="sp-hero relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] max-w-[550px] opacity-60 pointer-events-none mix-blend-multiply z-0">
            <img
              src={assetPath('/images/sentrapedia_sketch.jpg')}
              alt="Sentrapedia sketch"
              className="w-full h-auto grayscale contrast-125"
            />
          </div>
          <div className="sp-hero-inner relative z-10">
            <p className="sp-eyebrow">Referensi Klinis Puskesmas Indonesia</p>
            <h1 className="sp-hero-title">
              <span>Sentra</span>
              <span>pedia</span>
            </h1>
            <p className="sp-hero-subtitle">
              Intisari diagnostik dan terapi 144 penyakit puskesmas. Kami menyuling ribuan halaman
              Permenkes No. 5/2014 menjadi panduan yang langsung bisa Anda pakai di depan pasien.
            </p>
            <p className="sp-hero-curation">
              Dikurasi oleh dr. Ferdi Iskandar. Tidak ada teks bertele-tele, hanya referensi taktis
              dan cepat untuk layanan primer yang sibuk.
            </p>
            <div className="sp-hero-stats">
              {stats.map((s) => (
                <div key={s.label} className="sp-hero-stat">
                  <span className="sp-hero-stat-num">{s.val}</span>
                  <span className="sp-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <span className="sp-hero-vertical" aria-hidden="true">
            REFERENSI
          </span>
        </section>

        {/* Search */}
        <section className="sp-search-section">
          <div className="sp-search-bar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="11.5" y1="11.5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari penyakit, kode ICD-10, atau gejala..."
              autoComplete="off"
            />
          </div>
        </section>

        {/* Filter Pills */}
        <section className="sp-filters">
          <button
            className={`sp-pill ${activeCat === null ? 'active' : ''}`}
            onClick={() => setActiveCat(null)}
          >
            SEMUA<span className="sp-pill-count">{DISEASES.length}</span>
          </button>
          {CATEGORIES.map((c) => {
            const n = catCount(c.id)
            if (n === 0) return null
            return (
              <button
                key={c.id}
                className={`sp-pill ${activeCat === c.id ? 'active' : ''}`}
                onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}
              >
                {c.id}
                <span className="sp-pill-count">{n}</span>
              </button>
            )
          })}
          {search && <span className="sp-filter-result">{filtered.length} hasil</span>}
        </section>

        {/* Category Cards */}
        <section id="categories" className="sp-cat-section">
          <div className="sp-section-header">
            <span className="sp-section-label">Kategori Penyakit</span>
            <span className="sp-section-count">{CATEGORIES.length} kategori</span>
          </div>
          <div className="sp-cat-grid2">
            {(activeCat ? CATEGORIES.filter((c) => c.id === activeCat) : CATEGORIES).map((c) => {
              const n = catCount(c.id)
              if (n === 0) return null
              return (
                <div
                  key={c.id}
                  className={`sp-cat-card2 ${activeCat === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}
                >
                  <div className="sp-cat2-kode">{c.kode}</div>
                  <div className="sp-cat2-name">{c.name}</div>
                  <div className="sp-cat2-desc">{c.desc}</div>
                  <div className="sp-cat2-count">{n} PENYAKIT TERARSIP</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Disease List */}
        <section id="diseases" className="sp-disease-section">
          <div className="sp-section-header">
            <span className="sp-section-label">
              {activeCat ? CATEGORIES.find((c) => c.id === activeCat)?.name : 'Daftar Penyakit'}
            </span>
            <span className="sp-section-count">{filtered.length} penyakit</span>
          </div>
          <div className="sp-disease-list">
            {filtered.map((d) => {
              return (
                <div key={d.id} className="sp-disease-row" onClick={() => openSidebar(d)}>
                  <div className="sp-disease-indicator" />
                  <div className="sp-disease-content">
                    <div className="sp-disease-info">
                      <div className="sp-disease-name">{d.nama}</div>
                      <div className="sp-disease-brief">
                        {(d.definisi || '').substring(0, 120)}
                        {(d.definisi || '').length > 120 ? '...' : ''}
                      </div>
                    </div>
                    <div className="sp-disease-tags">
                      <span className="sp-disease-tag">{d.kode}</span>
                      <span className="sp-disease-tag">{d.kategori}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div className="sp-no-results">
                <div className="sp-no-results-title">Tidak ditemukan hasil</div>
                <div className="sp-no-results-desc">Coba kata kunci lain atau reset filter</div>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Detail Sidebar */}
      <div className={`sp-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar} />
      <aside className={`sp-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {selectedDisease && (
          <>
            <div className="sp-sidebar-header">
              <div className="sp-sidebar-title-wrap">
                <div className="sp-sidebar-kode">
                  {selectedDisease.kode} -{' '}
                  {CATEGORIES.find((c) => c.id === selectedDisease.kategori)?.name ||
                    selectedDisease.kategori}
                </div>
                <div className="sp-sidebar-title">{selectedDisease.nama}</div>
              </div>
              <button className="sp-sidebar-close" onClick={closeSidebar} aria-label="Tutup">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="sp-sidebar-body">
              <div className="sp-sidebar-section">
                <div className="sp-sidebar-label">Definisi</div>
                <div className="sp-sidebar-text">{selectedDisease.definisi}</div>
              </div>
              {selectedDisease.gejala && selectedDisease.gejala.length > 0 && (
                <div className="sp-sidebar-section">
                  <div className="sp-sidebar-label">Gejala Klinis</div>
                  <ul className="sp-sidebar-list">
                    {selectedDisease.gejala.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="sp-sidebar-section">
                <div className="sp-sidebar-label">Diagnosis</div>
                <div className="sp-sidebar-text">{selectedDisease.diagnosis}</div>
              </div>
              <div className="sp-sidebar-section">
                <div className="sp-sidebar-label">Terapi</div>
                <div className="sp-sidebar-text">{selectedDisease.terapi}</div>
              </div>
              <div className="sp-sidebar-section">
                <div className="sp-sidebar-label">Kriteria Rujukan</div>
                <div className="sp-sidebar-text">{selectedDisease.rujukan}</div>
              </div>
              <div className="sp-sidebar-section sp-sidebar-refs">
                <div className="sp-sidebar-label">Referensi</div>
                <div>
                  <span className="sp-ref-badge">Permenkes 5/2014</span>
                  <span className="sp-ref-badge">SK Menkes 1186/2022</span>
                  <span className="sp-ref-badge">WHO 2026</span>
                  <span className="sp-ref-badge">ICD-10</span>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
