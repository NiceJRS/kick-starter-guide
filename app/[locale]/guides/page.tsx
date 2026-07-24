'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconRadio, IconArrowLeft, IconSearch, IconX, IconChevronRight, IconClock, IconBook, IconStar } from '@tabler/icons-react'
import { guides, type GuideCategory } from '@/lib/guides'
import GuideCard from '@/components/home/GuideCard'

const CATEGORIES: { key: GuideCategory; icon: string; label: { th: string; en: string } }[] = [
  { key: 'Setup', icon: '⚙️', label: { th: 'การติดตั้ง', en: 'Setup' } },
  { key: 'Chat', icon: '💬', label: { th: 'แชทและความปลอดภัย', en: 'Chat & Safety' } },
  { key: 'Tools & Bot', icon: '🤖', label: { th: 'บอทและเครื่องมือ', en: 'Tools & Bot' } },
  { key: 'Monetization', icon: '💰', label: { th: 'การรับรายได้', en: 'Monetization' } },
]

type SearchResult = {
  guideSlug: string
  guideTitle: string
  sectionId?: string
  sectionLabel?: string
}

function searchGuides(q: string, locale: string): SearchResult[] {
  const lq = q.toLowerCase()
  const out: SearchResult[] = []
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

export default function GuidesPage({ params: { locale } }: { params: { locale: string } }) {
  const [activeCategory, setActiveCategory] = useState<GuideCategory | 'all'>('all')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const allGuides = guides
  const filtered = activeCategory === 'all'
    ? allGuides
    : allGuides.filter((g) => g.category === activeCategory)

  const searchResults = query.trim().length >= 1 ? searchGuides(query, locale) : []

  const totalMinutes = filtered.reduce((sum, g) => sum + g.duration, 0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const goResult = (r: SearchResult) => {
    setSearchOpen(false)
    setQuery('')
    router.push(`/${locale}/guide/${r.guideSlug}${r.sectionId ? '#' + r.sectionId : ''}`)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-page)', color: 'var(--text-primary)' }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 py-3 sticky top-2 z-50 rounded-xl mb-0"
        style={{ background: 'var(--surface-card)', border: '0.5px solid var(--kick-green-22)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)' }}>
            <IconRadio size={16} style={{ color: 'var(--kick-green-text)' }} />
          </div>
          <div>
            <div className="text-[14px] font-semibold leading-tight" style={{ color: 'var(--kick-green-text)' }}>KICK Guide TH</div>
            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>By NiceJRS · Community Guide</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/${locale}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' }}>
            <IconArrowLeft size={13} />
            {locale === 'th' ? 'หน้าหลัก' : 'Home'}
          </Link>
          <Link href={`/${locale}/path`}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' }}>
            {locale === 'th' ? 'เส้นทาง' : 'Path'}
          </Link>
          <button
            onClick={() => router.push(locale === 'th' ? '/en/guides' : '/th/guides')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
            style={{ background: 'var(--surface-card2)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            {locale === 'th' ? 'EN' : 'TH'}
          </button>
        </div>
      </nav>

      <div className="flex gap-0 mt-2">
        {/* === LEFT WIKI SIDEBAR — category-based with sub-topics === */}
        <aside className="w-[240px] flex-shrink-0 hidden lg:block"
          style={{ borderRight: '1px solid var(--border-default)' }}>
          <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide py-4 pr-2">

            {/* All Guides button */}
            <button
              onClick={() => setActiveCategory('all')}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold mb-3 transition-all"
              style={{
                background: activeCategory === 'all' ? 'var(--kick-green-bg)' : 'transparent',
                color: activeCategory === 'all' ? 'var(--kick-green-text)' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === 'all' ? 'var(--kick-green-22)' : 'transparent'}`,
              }}>
              <IconBook size={14} />
              {locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides'}
              <span className="ml-auto text-[10px]" style={{ color: 'var(--text-muted)' }}>{allGuides.length}</span>
            </button>

            {/* Category groups with guide + sub-topic links */}
            {CATEGORIES.map((cat) => {
              const catGuides = allGuides.filter((g) => g.category === cat.key)
              if (catGuides.length === 0) return null
              const isActive = activeCategory === cat.key

              return (
                <div key={cat.key} className="mb-3">
                  {/* Category separator */}
                  <button
                    onClick={() => setActiveCategory(isActive ? 'all' : cat.key)}
                    className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded-lg transition-all"
                    style={{
                      background: isActive ? 'var(--surface-card2)' : 'transparent',
                    }}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{cat.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: isActive ? 'var(--kick-green-text)' : 'var(--text-muted)' }}>
                        {locale === 'th' ? cat.label.th : cat.label.en}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{catGuides.length}</span>
                      <IconChevronRight size={10}
                        style={{
                          color: 'var(--text-muted)',
                          transform: isActive ? 'rotate(90deg)' : 'rotate(0)',
                          transition: 'transform 0.15s',
                        }} />
                    </div>
                  </button>

                  {/* Guide links with sub-topics */}
                  <div className="mt-1 space-y-0.5 pl-1">
                    {catGuides.map((g) => (
                      <div key={g.slug}>
                        <Link href={`/${locale}/guide/${g.slug}`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--surface-card2)'
                            e.currentTarget.style.color = 'var(--text-primary)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = 'var(--text-secondary)'
                          }}>
                          {g.showInHighlight && (
                            <IconStar size={9} style={{ color: '#facc15', flexShrink: 0 }} />
                          )}
                          <span className="truncate leading-tight">
                            {locale === 'th' ? g.title.th : g.title.en}
                          </span>
                        </Link>

                        {/* Sub-topics (sections) — always visible */}
                        {g.sections.length > 0 && (
                          <div className="pl-4 space-y-0 mt-0.5 mb-1"
                            style={{ borderLeft: '1px solid var(--border-default)', marginLeft: '10px' }}>
                            {g.sections.map((sec) => (
                              <Link key={sec.id}
                                href={`/${locale}/guide/${g.slug}#${sec.id}`}
                                className="block px-1.5 py-0.5 rounded text-[10px] transition-all truncate"
                                style={{ color: 'var(--text-muted)' }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'var(--text-primary)'
                                  e.currentTarget.style.background = 'var(--surface-card2)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'var(--text-muted)'
                                  e.currentTarget.style.background = 'transparent'
                                }}>
                                {locale === 'th' ? sec.label.th : sec.label.en}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Stats */}
            <div className="mt-4 pt-3 px-2" style={{ borderTop: '1px solid var(--border-default)' }}>
              <div className="text-[10px] space-y-1" style={{ color: 'var(--text-muted)' }}>
                <div className="flex items-center gap-1.5">
                  <IconBook size={11} />
                  <span>{allGuides.length} {locale === 'th' ? 'บท' : 'guides'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconClock size={11} />
                  <span>~{allGuides.reduce((s, g) => s + g.duration, 0)} {locale === 'th' ? 'นาที' : 'min total'}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="flex-1 min-w-0 px-5 py-4">
          {/* Page header + search */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {activeCategory === 'all'
                    ? (locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides')
                    : (locale === 'th'
                      ? CATEGORIES.find(c => c.key === activeCategory)?.label.th
                      : CATEGORIES.find(c => c.key === activeCategory)?.label.en)
                  }
                </h1>
                <div className="flex items-center gap-3 text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  <span>{filtered.length} {locale === 'th' ? 'บท' : 'guides'}</span>
                  <span>·</span>
                  <span>~{totalMinutes} {locale === 'th' ? 'นาที' : 'min'}</span>
                </div>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative max-w-[400px]" ref={searchRef}>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSearchOpen(e.target.value.trim().length >= 1) }}
                  onFocus={() => query.trim().length >= 1 && setSearchOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchResults.length > 0) goResult(searchResults[0])
                    if (e.key === 'Escape') { setSearchOpen(false); setQuery('') }
                  }}
                  placeholder={locale === 'th' ? 'ค้นหาคู่มือ เช่น OBS, donation...' : 'Search guides e.g. OBS, donation...'}
                  className="w-full h-9 pl-8 pr-8 rounded-lg text-xs outline-none"
                  style={{
                    background: 'var(--surface-card)',
                    border: `1px solid ${searchOpen ? 'var(--kick-green)' : 'var(--border-strong)'}`,
                    color: 'var(--text-primary)',
                  }}
                />
                <IconSearch size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }} />
                {query && (
                  <button onClick={() => { setQuery(''); setSearchOpen(false) }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }}>
                    <IconX size={12} />
                  </button>
                )}
              </div>

              {/* Search dropdown */}
              {searchOpen && (
                <div className="absolute left-0 right-0 mt-1 rounded-xl overflow-hidden z-50 text-left"
                  style={{ background: 'var(--surface-card)', border: '1px solid var(--kick-green-22)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
                  {searchResults.length === 0 ? (
                    <div className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {locale === 'th' ? 'ไม่พบผลลัพธ์' : 'No results found'}
                    </div>
                  ) : (
                    <div className="py-1">
                      {searchResults.map((r, i) => (
                        <button key={i} onClick={() => goResult(r)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-all text-left hover:bg-[--surface-card2]"
                          style={{ color: 'var(--text-primary)' }}>
                          <IconSearch size={10} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-medium" style={{ fontSize: '11px' }}>{r.guideTitle}</div>
                            {r.sectionLabel && (
                              <div className="flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                                <IconChevronRight size={8} />
                                {r.sectionLabel}
                              </div>
                            )}
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded shrink-0"
                            style={{ background: 'var(--kick-green-bg)', color: 'var(--kick-green-text)' }}>
                            {r.sectionLabel ? (locale === 'th' ? 'หัวข้อ' : 'Section') : (locale === 'th' ? 'บท' : 'Guide')}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile category tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide lg:hidden">
            <button onClick={() => setActiveCategory('all')}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: activeCategory === 'all' ? 'var(--kick-green-bg)' : 'var(--surface-card)',
                color: activeCategory === 'all' ? 'var(--kick-green-text)' : 'var(--text-muted)',
                border: `1px solid ${activeCategory === 'all' ? 'var(--kick-green-22)' : 'var(--border-strong)'}`,
              }}>
              {locale === 'th' ? 'ทั้งหมด' : 'All'}
            </button>
            {CATEGORIES.map((cat) => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: activeCategory === cat.key ? 'var(--kick-green-bg)' : 'var(--surface-card)',
                  color: activeCategory === cat.key ? 'var(--kick-green-text)' : 'var(--text-muted)',
                  border: `1px solid ${activeCategory === cat.key ? 'var(--kick-green-22)' : 'var(--border-strong)'}`,
                }}>
                {cat.icon} {locale === 'th' ? cat.label.th : cat.label.en}
              </button>
            ))}
          </div>

          {/* Guide cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((g) => (
              <GuideCard key={g.id} guide={g} locale={locale} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
