'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { guides } from '@/lib/guides'

const STAGE_GROUPS = [
  {
    id: 'starter',
    label: { th: 'Starter', en: 'Starter' },
    required: true,
    color: 'var(--kick-green-text)',
    colorBg: 'var(--kick-green-bg)',
    colorBorder: 'var(--kick-green-22)',
    guideIds: [1, 2],
  },
  {
    id: 'amateur',
    label: { th: 'Amateur', en: 'Amateur' },
    required: false,
    color: 'var(--amber)',
    colorBg: 'var(--amber-10)',
    colorBorder: 'var(--amber-25)',
    guideIds: [3, 4, 5, 6],
  },
  {
    id: 'pro',
    label: { th: 'Pro', en: 'Pro' },
    required: false,
    color: 'var(--purple)',
    colorBg: 'var(--purple-13)',
    colorBorder: 'var(--purple-28)',
    guideIds: [7, 8, 10, 11],
  },
]

const NAV_OFFSET = 110

export default function GuideSidebar({
  locale,
  currentSlug,
  completed,
}: {
  locale: string
  currentSlug: string
  completed: number[]
}) {
  const [activeSection, setActiveSection] = useState<string>('')

  const currentGuide = guides.find((g) => g.slug === currentSlug)

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

      const passed = positions.filter((p) => p.top <= NAV_OFFSET)
      if (passed.length > 0) {
        setActiveSection(passed[passed.length - 1].id)
      } else if (positions.length > 0) {
        setActiveSection(positions[0].id)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [currentSlug, currentGuide])

  return (
    <div className="w-[200px] flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-1">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-1.5 text-xs mb-4 transition-colors hover:opacity-80"
          style={{ color: 'var(--text-secondary)' }}
        >
          <IconArrowLeft size={13} />
          {locale === 'th' ? 'กลับ' : 'Back'}
        </Link>

        <div className="space-y-3">
          {STAGE_GROUPS.map((stage) => {
            const stageGuides = guides.filter((g) => stage.guideIds.includes(g.id))
            if (stageGuides.length === 0) return null

            return (
              <div key={stage.id}>
                {/* Stage label */}
                <div className="flex items-center gap-1.5 mb-1.5 px-1">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: stage.colorBg,
                      color: stage.color,
                      border: `1px solid ${stage.colorBorder}`,
                    }}
                  >
                    {locale === 'th' ? stage.label.th : stage.label.en}
                  </span>
                  {stage.required ? (
                    <span className="text-[9px]" style={{ color: stage.color }}>⭐</span>
                  ) : (
                    <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>optional</span>
                  )}
                </div>

                {/* Guides in this stage */}
                <div className="space-y-0.5 ml-1">
                  {stageGuides.map((g) => {
                    const done = completed.includes(g.id)
                    const current = g.slug === currentSlug
                    return (
                      <div key={g.slug}>
                        <Link href={`/${locale}/guide/${g.slug}`}>
                          <div
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all"
                            style={{
                              background: current ? stage.colorBg : done ? 'rgba(30,122,10,0.04)' : 'transparent',
                              border: `1px solid ${current ? stage.colorBorder : done ? 'rgba(30,122,10,0.1)' : 'transparent'}`,
                              color: current ? stage.color : done ? 'var(--kick-green-text)' : 'var(--text-secondary)',
                            }}
                          >
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-medium"
                              style={{
                                background: done ? 'var(--kick-green-bg)' : current ? stage.colorBg : 'var(--surface-card2)',
                                border: `1px solid ${done ? 'rgba(30,122,10,0.3)' : current ? stage.colorBorder : 'var(--border-default)'}`,
                                color: done ? 'var(--kick-green-text)' : current ? stage.color : 'var(--text-muted)',
                              }}
                            >
                              {done ? <IconCheck size={8} /> : g.id}
                            </div>
                            <span className="truncate">{locale === 'th' ? g.title.th : g.title.en}</span>
                          </div>
                        </Link>

                        {/* Sub-sections for current guide */}
                        {current && g.sections.length > 0 && (
                          <div
                            className="mt-0.5 mb-0.5 ml-3 pl-2 space-y-0.5"
                            style={{ borderLeft: `2px solid ${stage.colorBorder}` }}
                          >
                            {g.sections.map((sec) => {
                              const isActive = activeSection === sec.id
                              return (
                                <a
                                  key={sec.id}
                                  href={`#${sec.id}`}
                                  className="block px-1.5 py-0.5 rounded text-[11px] transition-all"
                                  style={{
                                    color: isActive ? stage.color : 'var(--text-muted)',
                                    background: isActive ? stage.colorBg : 'transparent',
                                    fontWeight: isActive ? 600 : 400,
                                  }}
                                >
                                  {locale === 'th' ? sec.label.th : sec.label.en}
                                </a>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
