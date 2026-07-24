'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconRadio, IconArrowLeft, IconChevronRight, IconClock, IconBook } from '@tabler/icons-react'
import { guides, STAGE_CONFIG } from '@/lib/guides'
import GuideCard from '@/components/home/GuideCard'
import type { GuideStage } from '@/lib/guides'

export default function GuidesPage({ params: { locale } }: { params: { locale: string } }) {
  const [activeStage, setActiveStage] = useState<GuideStage | 'all'>('all')
  const router = useRouter()

  const catalogGuides = guides.filter((g) => g.showIn.includes('catalog'))

  const filtered = activeStage === 'all'
    ? catalogGuides
    : catalogGuides.filter((g) => g.stage === activeStage)

  const sidebarGroups = STAGE_CONFIG.map((s) => ({
    ...s,
    guides: catalogGuides.filter((g) => g.stage === s.id),
  }))

  const totalMinutes = filtered.reduce((sum, g) => sum + g.duration, 0)

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--surface-page)', color: 'var(--text-primary)' }}
    >
      {/* Top nav bar */}
      <nav
        className="flex items-center justify-between px-5 py-3 sticky top-2 z-50 rounded-xl mb-0"
        style={{ background: 'var(--surface-card)', border: '0.5px solid var(--kick-green-22)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)' }}
          >
            <IconRadio size={16} style={{ color: 'var(--kick-green-text)' }} />
          </div>
          <div>
            <div className="text-[14px] font-semibold leading-tight" style={{ color: 'var(--kick-green-text)' }}>
              KICK Guide TH
            </div>
            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>By NiceJRS · Community Guide</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' }}
          >
            <IconArrowLeft size={13} />
            {locale === 'th' ? 'หน้าหลัก' : 'Home'}
          </Link>
          <button
            onClick={() => router.push(locale === 'th' ? '/en/guides' : '/th/guides')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
            style={{
              background: 'var(--surface-card2)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            {locale === 'th' ? 'EN' : 'TH'}
          </button>
        </div>
      </nav>

      <div className="flex gap-0 mt-2">
        {/* === LEFT WIKI SIDEBAR === */}
        <aside
          className="w-[220px] flex-shrink-0 hidden lg:block"
          style={{ borderRight: '1px solid var(--border-default)' }}
        >
          <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide py-4 pr-3">
            {/* All Guides link */}
            <button
              onClick={() => setActiveStage('all')}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold mb-3 transition-all"
              style={{
                background: activeStage === 'all' ? 'var(--kick-green-bg)' : 'transparent',
                color: activeStage === 'all' ? 'var(--kick-green-text)' : 'var(--text-secondary)',
                border: `1px solid ${activeStage === 'all' ? 'var(--kick-green-22)' : 'transparent'}`,
              }}
            >
              <IconBook size={14} />
              {locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides'}
            </button>

            {/* Stage groups */}
            {sidebarGroups.map((stage) => {
              const isActive = activeStage === stage.id

              return (
                <div key={stage.id} className="mb-4">
                  {/* Stage separator header */}
                  <button
                    onClick={() => setActiveStage(isActive ? 'all' : stage.id)}
                    className="w-full text-left flex items-center justify-between px-2 py-1.5 mb-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: isActive ? stage.colorBg : 'var(--surface-card2)',
                          color: isActive ? stage.colorText : 'var(--text-muted)',
                          border: `1px solid ${isActive ? stage.colorBorder : 'var(--border-strong)'}`,
                        }}
                      >
                        {stage.required ? '⭐ ' : ''}{locale === 'th' ? stage.label.th : stage.label.en}
                      </span>
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {locale === 'th' ? stage.sub.th : stage.sub.en}
                      </span>
                    </div>
                    <IconChevronRight
                      size={12}
                      style={{
                        color: 'var(--text-muted)',
                        transform: isActive ? 'rotate(90deg)' : 'rotate(0)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </button>

                  {/* Guide links under this stage */}
                  <div className="space-y-0.5 pl-2">
                    {stage.guides.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/${locale}/guide/${g.slug}`}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all group"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--surface-card2)'
                          e.currentTarget.style.color = 'var(--text-primary)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = 'var(--text-secondary)'
                        }}
                      >
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium flex-shrink-0"
                          style={{
                            background: stage.colorBg,
                            color: stage.colorText,
                            border: `1px solid ${stage.colorBorder}`,
                          }}
                        >
                          {g.id}
                        </span>
                        <span className="truncate leading-tight">
                          {locale === 'th' ? g.title.th : g.title.en}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Stats */}
            <div
              className="mt-4 pt-3 px-2"
              style={{ borderTop: '1px solid var(--border-default)' }}
            >
              <div className="text-[10px] space-y-1" style={{ color: 'var(--text-muted)' }}>
                <div className="flex items-center gap-1.5">
                  <IconBook size={11} />
                  <span>{catalogGuides.length} {locale === 'th' ? 'บท' : 'guides'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconClock size={11} />
                  <span>~{catalogGuides.reduce((s, g) => s + g.duration, 0)} {locale === 'th' ? 'นาที' : 'min total'}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="flex-1 min-w-0 px-5 py-4">
          {/* Page header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {activeStage === 'all'
                  ? (locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides')
                  : (locale === 'th'
                    ? `${STAGE_CONFIG.find(s => s.id === activeStage)?.label.th} — ${STAGE_CONFIG.find(s => s.id === activeStage)?.sub.th}`
                    : `${STAGE_CONFIG.find(s => s.id === activeStage)?.label.en} — ${STAGE_CONFIG.find(s => s.id === activeStage)?.sub.en}`)
                }
              </h1>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>{filtered.length} {locale === 'th' ? 'บท' : 'guides'}</span>
              <span>·</span>
              <span>~{totalMinutes} {locale === 'th' ? 'นาที' : 'min'}</span>
            </div>
          </div>

          {/* Mobile stage tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide lg:hidden">
            {[{ id: 'all' as const, label: { th: 'ทั้งหมด', en: 'All' } }, ...STAGE_CONFIG].map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id as GuideStage | 'all')}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: activeStage === s.id
                    ? (s.id === 'all' ? 'var(--kick-green-bg)' : (s as typeof STAGE_CONFIG[0]).colorBg ?? 'var(--kick-green-bg)')
                    : 'var(--surface-card)',
                  color: activeStage === s.id
                    ? (s.id === 'all' ? 'var(--kick-green-text)' : (s as typeof STAGE_CONFIG[0]).colorText ?? 'var(--kick-green-text)')
                    : 'var(--text-muted)',
                  border: `1px solid ${activeStage === s.id
                    ? (s.id === 'all' ? 'var(--kick-green-22)' : (s as typeof STAGE_CONFIG[0]).colorBorder ?? 'var(--kick-green-22)')
                    : 'var(--border-strong)'}`,
                }}
              >
                {locale === 'th' ? s.label.th : s.label.en}
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
