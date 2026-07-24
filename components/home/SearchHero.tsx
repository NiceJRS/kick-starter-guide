'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IconSearch, IconRocket, IconX, IconChevronRight } from '@tabler/icons-react'
import { guides } from '@/lib/guides'

type Result = {
  guideSlug: string
  guideTitle: string
  sectionId?: string
  sectionLabel?: string
}

const QUICK_TAGS = [
  { th: 'ตั้งค่า OBS', en: 'OBS setup' },
  { th: 'รับ Donation', en: 'Donation' },
  { th: 'บอทแชท', en: 'Chatbot' },
  { th: 'Discord', en: 'Discord' },
  { th: 'Stream Key', en: 'Stream Key' },
  { th: 'VOD คลิป', en: 'VOD Clips' },
  { th: 'Mod จัดการ', en: 'Moderation' },
]

function search(q: string, locale: string): Result[] {
  const lq = q.toLowerCase()
  const out: Result[] = []
  for (const g of guides) {
    const title = locale === 'th' ? g.title.th : g.title.en
    const desc = locale === 'th' ? g.description.th : g.description.en
    const tagHit = g.tags.some((t) => t.toLowerCase().includes(lq))
    if (title.toLowerCase().includes(lq) || desc.toLowerCase().includes(lq) || tagHit) {
      out.push({ guideSlug: g.slug, guideTitle: title })
    }
    for (const sec of g.sections) {
      const secLabel = locale === 'th' ? sec.label.th : sec.label.en
      if (secLabel.toLowerCase().includes(lq)) {
        out.push({ guideSlug: g.slug, guideTitle: title, sectionId: sec.id, sectionLabel: secLabel })
      }
    }
  }
  return out.slice(0, 12)
}

export default function SearchHero({ locale }: { locale: string }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const results = query.trim().length >= 1 ? search(query, locale) : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setQuery('') }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const go = (r: Result) => {
    setOpen(false)
    setQuery('')
    router.push(`/${locale}/guides/${r.guideSlug}${r.sectionId ? '#' + r.sectionId : ''}`)
  }

  const handleChange = (v: string) => {
    setQuery(v)
    setOpen(v.trim().length >= 1)
  }

  const handleTag = (tag: string) => {
    setQuery(tag)
    setOpen(true)
  }

  return (
    <div
      className="rounded-xl p-5 text-center mb-3"
      style={{ background: 'var(--surface-card)', border: '1px solid var(--kick-green-22)' }}
    >
      <div className="flex items-center justify-center gap-1 mb-2">
        <IconRocket size={10} style={{ color: 'var(--kick-green)' }} />
        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--kick-green)' }}>
          {locale === 'th' ? 'คู่มือสตรีมเมอร์ไทย' : 'Thai Streamer Guide'}
        </span>
      </div>

      <h1 className="mb-4" style={{ color: 'var(--text-primary)' }}>
        {locale === 'th' ? (
          <>มีปัญหาอะไร <span style={{ color: 'var(--kick-green-text)' }}>ค้นหาได้เลย</span></>
        ) : (
          <>Got questions? <span style={{ color: 'var(--kick-green-text)' }}>Search here</span></>
        )}
      </h1>

      {/* Search input + popup */}
      <div className="max-w-[500px] mx-auto mb-3 relative" ref={wrapperRef}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => query.trim().length >= 1 && setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results.length > 0) go(results[0])
                if (e.key === 'Escape') { setOpen(false); setQuery('') }
              }}
              placeholder={locale === 'th' ? 'ค้นหา เช่น OBS, donation, chatbot...' : 'Search e.g. OBS, donation, chatbot...'}
              className="w-full h-10 pl-3 pr-8 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--surface-card2)',
                border: `1px solid ${open ? 'var(--kick-green)' : 'var(--kick-green-22)'}`,
                color: 'var(--text-primary)',
              }}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setOpen(false) }}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              >
                <IconX size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => results.length > 0 ? go(results[0]) : undefined}
            className="h-10 px-4 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-90 shrink-0"
            style={{ background: 'var(--kick-green-text)', color: '#fff' }}
          >
            <IconSearch size={14} />
            {locale === 'th' ? 'ค้นหา' : 'Search'}
          </button>
        </div>

        {/* Dropdown results */}
        {open && (
          <div
            className="absolute left-0 right-0 mt-1 rounded-xl overflow-hidden z-50 text-left"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--kick-green-22)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          >
            {results.length === 0 ? (
              <div className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                {locale === 'th' ? 'ไม่พบผลลัพธ์' : 'No results found'}
              </div>
            ) : (
              <div className="py-1">
                {results.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => go(r)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-all text-left hover:bg-[--surface-card2]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <IconSearch size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium" style={{ fontSize: '12px' }}>
                        {r.guideTitle}
                      </div>
                      {r.sectionLabel && (
                        <div className="flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                          <IconChevronRight size={10} />
                          {r.sectionLabel}
                        </div>
                      )}
                    </div>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded shrink-0"
                      style={{ background: 'var(--kick-green-bg)', color: 'var(--kick-green-text)' }}
                    >
                      {r.sectionLabel ? locale === 'th' ? 'หัวข้อ' : 'Section' : locale === 'th' ? 'บท' : 'Guide'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick tags */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {QUICK_TAGS.map((tag) => {
          const label = locale === 'th' ? tag.th : tag.en
          return (
            <button
              key={label}
              onClick={() => handleTag(label)}
              className="px-2.5 py-1 rounded-full text-xs border transition-all"
              style={{
                background: 'var(--surface-card2)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-muted)',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
