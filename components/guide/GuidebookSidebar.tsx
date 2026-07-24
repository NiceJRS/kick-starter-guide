'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IconBook, IconClock, IconStar } from '@tabler/icons-react'
import { guides, type SidebarCategory } from '@/lib/guides'

const SIDEBAR_CATEGORIES: { key: SidebarCategory; label: { th: string; en: string } }[] = [
  { key: 'getting-started', label: { th: '🚀 เริ่มต้น', en: '🚀 Getting Started' } },
  { key: 'kick-features', label: { th: '🎮 ฟีเจอร์ KICK', en: '🎮 KICK Features' } },
  { key: 'chat-community', label: { th: '💬 Chat & ชุมชน', en: '💬 Chat & Community' } },
  { key: 'monetization', label: { th: '💰 รายได้', en: '💰 Monetization' } },
  { key: 'advanced', label: { th: '⚙️ ขั้นสูง', en: '⚙️ Advanced' } },
]

const NAV_OFFSET = 110

export default function GuidebookSidebar({
  locale,
  currentSlug,
  activeCategory,
  onCategoryChange,
}: {
  locale: string
  currentSlug?: string
  activeCategory?: SidebarCategory | 'all'
  onCategoryChange?: (cat: SidebarCategory | 'all') => void
}) {
  const [activeSection, setActiveSection] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentGuide = currentSlug ? guides.find((g) => g.slug === currentSlug) : null

  useEffect(() => {
    if (!currentGuide || currentGuide.sections.length === 0) return

    const ids = currentGuide.sections.map((s) => s.id)

    const onScroll = () => {
      const positions = ids
        .map((id) => {
          const el = document.getElementById(id)
          if (!el) return null
          return { id, top: el.getBoundingClientRect().top }
        })
        .filter(Boolean) as { id: string; top: number }[]

      const saved = scrollRef.current?.scrollTop ?? 0
      const passed = positions.filter((p) => p.top <= NAV_OFFSET)
      if (passed.length > 0) {
        setActiveSection(passed[passed.length - 1].id)
      } else if (positions.length > 0) {
        setActiveSection(positions[0].id)
      }
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = saved
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [currentSlug, currentGuide])

  const allGuidesList = guides

  return (
    <aside className="w-[240px] flex-shrink-0 hidden lg:block"
      style={{ borderRight: '1px solid var(--border-default)' }}>
      <div ref={scrollRef} className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide py-4 pr-2">

        {/* All Guides button */}
        {onCategoryChange ? (
          <button
            onClick={() => onCategoryChange('all')}
            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold mb-3 transition-all"
            style={{
              background: activeCategory === 'all' ? 'var(--kick-green-bg)' : 'transparent',
              color: activeCategory === 'all' ? 'var(--kick-green-text)' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === 'all' ? 'var(--kick-green-22)' : 'transparent'}`,
            }}>
            <IconBook size={14} />
            {locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides'}
            <span className="ml-auto text-[10px]" style={{ color: 'var(--text-muted)' }}>{allGuidesList.length}</span>
          </button>
        ) : (
          <Link href={`/${locale}/guides`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold mb-3 transition-all"
            style={{
              background: !currentSlug ? 'var(--kick-green-bg)' : 'transparent',
              color: !currentSlug ? 'var(--kick-green-text)' : 'var(--text-secondary)',
              border: `1px solid ${!currentSlug ? 'var(--kick-green-22)' : 'transparent'}`,
            }}>
            <IconBook size={14} />
            {locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides'}
            <span className="ml-auto text-[10px]" style={{ color: 'var(--text-muted)' }}>{allGuidesList.length}</span>
          </Link>
        )}

        {/* Category groups */}
        {SIDEBAR_CATEGORIES.map((cat) => {
          const catGuides = allGuidesList.filter((g) => g.sidebarCategory === cat.key)
          if (catGuides.length === 0) return null
          const isActiveCat = activeCategory === cat.key

          return (
            <div key={cat.key} className="mb-3">
              {/* Category header */}
              {onCategoryChange ? (
                <button
                  onClick={() => onCategoryChange(isActiveCat ? 'all' : cat.key)}
                  className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded-lg transition-all"
                  style={{ background: isActiveCat ? 'var(--surface-card2)' : 'transparent' }}>
                  <span className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: isActiveCat ? 'var(--kick-green-text)' : 'var(--text-primary)' }}>
                    {locale === 'th' ? cat.label.th : cat.label.en}
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ color: 'var(--text-primary)', background: 'var(--surface-card2)' }}>
                    {catGuides.length}
                  </span>
                </button>
              ) : (
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: 'var(--text-primary)' }}>
                    {locale === 'th' ? cat.label.th : cat.label.en}
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ color: 'var(--text-primary)', background: 'var(--surface-card2)' }}>
                    {catGuides.length}
                  </span>
                </div>
              )}

              {/* Guide links with sub-topics */}
              <div className="mt-1 space-y-0.5 pl-1">
                {catGuides.map((g) => {
                  const isCurrent = g.slug === currentSlug
                  return (
                    <div key={g.slug}>
                      <Link href={`/${locale}/guides/${g.slug}`}
                        className="block text-sm font-semibold rounded px-2 py-1.5 transition-colors"
                        style={isCurrent
                          ? { color: 'var(--kick-green-text)', background: 'var(--kick-green-10)' }
                          : { color: 'var(--text-primary)' }
                        }
                        onMouseEnter={(e) => {
                          if (!isCurrent) e.currentTarget.style.background = 'var(--surface-card2)'
                        }}
                        onMouseLeave={(e) => {
                          if (!isCurrent) e.currentTarget.style.background = 'transparent'
                        }}>
                        {g.showInHighlight && (
                          <IconStar size={9} style={{ color: '#facc15', flexShrink: 0, marginRight: 4, display: 'inline' }} />
                        )}
                        <span className="leading-tight">
                          {locale === 'th' ? g.title.th : g.title.en}
                        </span>
                      </Link>

                      {/* Sub-topics — scroll-spy on detail page, plain links on index */}
                      {g.sections.length > 0 && (
                        <div className="pl-4 space-y-0 mt-0.5 mb-1"
                          style={{
                            borderLeft: isCurrent ? '2px solid var(--kick-green-22)' : '1px solid var(--border-default)',
                            marginLeft: '10px',
                          }}>
                          {g.sections.map((sec) => {
                            const isActive = isCurrent && activeSection === sec.id
                            const href = isCurrent
                              ? `#${sec.id}`
                              : `/${locale}/guides/${g.slug}#${sec.id}`

                            return isCurrent ? (
                              <a
                                key={sec.id}
                                href={href}
                                onClick={(e) => {
                                  e.preventDefault()
                                  const el = document.getElementById(sec.id)
                                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                  history.replaceState(null, '', href)
                                }}
                                className={`block text-sm rounded px-2 py-1 pl-4 transition-colors ${isActive ? 'font-medium' : ''}`}
                                style={isActive
                                  ? { color: 'var(--kick-green-text)', background: 'var(--kick-green-10)' }
                                  : { color: 'var(--text-secondary)' }
                                }
                                onMouseEnter={(e) => {
                                  if (!isActive) {
                                    e.currentTarget.style.color = 'var(--text-primary)'
                                    e.currentTarget.style.background = 'var(--surface-card2)'
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isActive) {
                                    e.currentTarget.style.color = 'var(--text-secondary)'
                                    e.currentTarget.style.background = 'transparent'
                                  }
                                }}>
                                {locale === 'th' ? sec.label.th : sec.label.en}
                              </a>
                            ) : (
                              <Link key={sec.id}
                                href={href}
                                className="block text-sm rounded px-2 py-1 pl-4 transition-colors"
                                style={{ color: 'var(--text-secondary)' }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'var(--text-primary)'
                                  e.currentTarget.style.background = 'var(--surface-card2)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'var(--text-secondary)'
                                  e.currentTarget.style.background = 'transparent'
                                }}>
                                {locale === 'th' ? sec.label.th : sec.label.en}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="my-3 border-t" style={{ borderColor: 'var(--border-default)' }} />
            </div>
          )
        })}

        {/* Stats */}
        <div className="mt-4 pt-3 px-2" style={{ borderTop: '1px solid var(--border-default)' }}>
          <div className="text-[10px] space-y-1" style={{ color: 'var(--text-muted)' }}>
            <div className="flex items-center gap-1.5">
              <IconBook size={11} />
              <span>{allGuidesList.length} {locale === 'th' ? 'บท' : 'guides'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconClock size={11} />
              <span>~{allGuidesList.reduce((s, g) => s + g.duration, 0)} {locale === 'th' ? 'นาที' : 'min total'}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
