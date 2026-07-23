'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { guides } from '@/lib/guides'

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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [currentSlug, currentGuide])

  return (
    <div className="w-[200px] flex-shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <Link href={`/${locale}`}
          className="flex items-center gap-1.5 text-xs mb-5 transition-colors hover:opacity-80"
          style={{ color: 'var(--text-secondary)' }}>
          <IconArrowLeft size={13} />
          {locale === 'th' ? 'กลับ' : 'Back'}
        </Link>

        <div className="text-xs mb-2.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {locale === 'th' ? 'บทเรียน' : 'Chapters'}
        </div>

        <div className="space-y-1">
          {guides.map((g, i) => {
            const done = completed.includes(g.id)
            const current = g.slug === currentSlug
            return (
              <div key={g.slug}>
                <Link href={`/${locale}/guide/${g.slug}`}>
                  <div
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all"
                    style={{
                      background: current ? 'var(--kick-green-bg)' : done ? 'rgba(30,122,10,0.04)' : 'transparent',
                      border: `1px solid ${current ? 'rgba(30,122,10,0.2)' : done ? 'rgba(30,122,10,0.1)' : 'var(--border-default)'}`,
                      color: current ? 'var(--kick-green-text)' : done ? 'var(--kick-green-text)' : 'var(--text-secondary)',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]"
                      style={{
                        background: done ? 'var(--kick-green-bg)' : current ? 'var(--kick-green-10)' : 'var(--surface-card2)',
                        border: `1px solid ${done ? 'rgba(30,122,10,0.3)' : current ? 'var(--kick-green-22)' : 'var(--border-default)'}`,
                      }}
                    >
                      {done ? <IconCheck size={9} /> : i + 1}
                    </div>
                    <span className="truncate">{locale === 'th' ? g.title.th : g.title.en}</span>
                  </div>
                </Link>

                {/* Sub-sections with scroll-spy highlight */}
                {current && g.sections.length > 0 && (
                  <div className="mt-1 mb-1 ml-3 pl-2.5 space-y-0.5" style={{ borderLeft: '2px solid var(--kick-green-22)' }}>
                    {g.sections.map((sec) => {
                      const isActive = activeSection === sec.id
                      return (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          className="block px-2 py-1 rounded text-xs transition-all"
                          style={{
                            color: isActive ? 'var(--kick-green-text)' : 'var(--text-muted)',
                            background: isActive ? 'var(--kick-green-bg)' : 'transparent',
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
    </div>
  )
}
