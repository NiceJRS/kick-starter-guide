'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { IconClock, IconList, IconX, IconChevronUp, IconCheck, IconArrowLeft } from '@tabler/icons-react'
import { allGuides } from 'contentlayer/generated'
import { getGuideBySlug, getAdjacentGuides, guides } from '@/lib/guides'
import { getCompletedGuides, markGuideComplete } from '@/lib/progress'
import LevelBadge from '@/components/shared/LevelBadge'
import GuideSidebar from '@/components/guide/GuideSidebar'
import GuideNav from '@/components/guide/GuideNav'
import MDXRenderer from '@/components/guide/MDXRenderer'

export default function GuidePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const mdxDoc = allGuides.find((g) => g.slug === slug && g.locale === locale)
  const { prev, next } = getAdjacentGuides(slug)

  const [completed, setCompleted] = useState<number[]>([])
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [showBackTop, setShowBackTop] = useState(false)

  const isDone = completed.includes(guide.id)

  useEffect(() => {
    setCompleted(getCompletedGuides())
  }, [])

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDone = () => {
    markGuideComplete(guide.id)
    setCompleted(getCompletedGuides())
  }

  const title = locale === 'th' ? guide.title.th : guide.title.en
  const description = locale === 'th' ? guide.description.th : guide.description.en

  return (
    <>
      <div className="flex gap-6">
        <GuideSidebar locale={locale} currentSlug={slug} completed={completed} />

        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
            <Link href={`/${locale}`} className="hover:opacity-80">
              {locale === 'th' ? 'หน้าแรก' : 'Home'}
            </Link>
            <span>/</span>
            <span>{guide.category}</span>
            <span>/</span>
            <span style={{ color: 'var(--kick-green-text)' }}>{title}</span>
          </div>

          {/* Header */}
          <div
            className="p-4 rounded-xl mb-4"
            style={{ background: 'var(--surface-card)', border: '0.5px solid var(--kick-green-22)' }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{title}</h1>
              <LevelBadge level={guide.level} locale={locale} />
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                <IconClock size={11} />
                ~{guide.duration}{locale === 'th' ? ' นาที' : ' min'}
              </div>
              <button
                onClick={toggleDone}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${isDone ? 'hover:brightness-110' : 'hover:bg-[--kick-green-10] hover:border-[--kick-green-22] hover:text-[--kick-green]'}`}
                style={isDone
                  ? { background: 'var(--kick-green-10)', color: 'var(--kick-green)', border: '1px solid var(--kick-green-22)' }
                  : { background: 'var(--surface-card2)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' }
                }
              >
                {isDone
                  ? (locale === 'th' ? '✓ ทำเสร็จแล้ว' : '✓ Completed')
                  : (locale === 'th' ? 'ทำเสร็จ' : 'Mark Complete')}
              </button>
            </div>
          </div>

          {/* MDX Content */}
          <div
            className="p-4 rounded-xl mb-4 prose-guide"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
          >
            {mdxDoc ? (
              <MDXRenderer code={mdxDoc.body.code} />
            ) : (
              <div className="text-center py-6">
                <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {locale === 'th' ? '📝 เนื้อหากำลังมา' : '📝 Content coming soon'}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {locale === 'th'
                    ? 'บทนี้อยู่ระหว่างการเขียน กรุณากลับมาใหม่เร็วๆ นี้'
                    : 'This chapter is being written. Please check back soon.'}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Mark Complete */}
          <div
            className="flex items-center justify-center p-4 rounded-xl mb-4"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
          >
            <button
              onClick={toggleDone}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${isDone ? 'hover:brightness-110' : 'hover:shadow-md'}`}
              style={isDone
                ? { background: 'var(--kick-green-bg)', color: 'var(--kick-green-text)', border: '1px solid var(--kick-green-22)' }
                : { background: 'var(--kick-green)', color: '#fff', border: '1px solid var(--kick-green)' }
              }
            >
              {isDone
                ? (locale === 'th' ? '✓ ทำเสร็จแล้ว' : '✓ Completed')
                : (locale === 'th' ? '✅ ทำบทนี้เสร็จแล้ว' : '✅ Mark this chapter as done')}
            </button>
          </div>

          <GuideNav prev={prev} next={next} locale={locale} />

          {/* Mobile bottom padding so FAB doesn't overlap content */}
          <div className="h-16 lg:hidden" />
        </div>
      </div>

      {/* Mobile bottom nav bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--border-default)' }}>
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <Link href={`/${locale}`}
            className="flex items-center gap-1.5 text-xs"
            style={{ color: 'var(--text-secondary)' }}>
            <IconArrowLeft size={14} />
            {locale === 'th' ? 'กลับ' : 'Back'}
          </Link>
          <button
            onClick={() => setMobileNavOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: 'var(--kick-green-bg)', color: 'var(--kick-green-text)', border: '1px solid var(--kick-green-22)' }}
          >
            <IconList size={14} />
            {locale === 'th' ? 'บทเรียน' : 'Chapters'}
          </button>
          <button
            onClick={toggleDone}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={isDone
              ? { background: 'var(--kick-green-10)', color: 'var(--kick-green)', border: '1px solid var(--kick-green-22)' }
              : { background: 'var(--kick-green)', color: '#fff' }
            }
          >
            {isDone ? '✓' : '✅'} {isDone
              ? (locale === 'th' ? 'เสร็จแล้ว' : 'Done')
              : (locale === 'th' ? 'ทำเสร็จ' : 'Mark done')}
          </button>
        </div>
      </div>

      {/* Mobile chapter drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMobileNavOpen(false)}
          />
          {/* Sheet */}
          <div
            className="relative rounded-t-2xl p-4 pb-8 max-h-[70vh] overflow-y-auto"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {locale === 'th' ? 'บทเรียนทั้งหมด' : 'All Chapters'}
              </span>
              <button onClick={() => setMobileNavOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <IconX size={18} />
              </button>
            </div>
            <div className="space-y-1">
              {guides.map((g, i) => {
                const done = completed.includes(g.id)
                const current = g.slug === slug
                return (
                  <Link
                    key={g.slug}
                    href={`/${locale}/guide/${g.slug}`}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <div
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                      style={{
                        background: current ? 'var(--kick-green-bg)' : 'transparent',
                        border: `1px solid ${current ? 'var(--kick-green-22)' : 'var(--border-default)'}`,
                        color: current ? 'var(--kick-green-text)' : done ? 'var(--kick-green-text)' : 'var(--text-secondary)',
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                        style={{
                          background: done ? 'var(--kick-green-bg)' : 'var(--surface-card2)',
                          border: `1px solid ${done ? 'rgba(30,122,10,0.3)' : 'var(--border-default)'}`,
                        }}
                      >
                        {done ? <IconCheck size={10} style={{ color: 'var(--kick-green-text)' }} /> : i + 1}
                      </div>
                      <span>{locale === 'th' ? g.title.th : g.title.en}</span>
                      {current && <span className="ml-auto text-xs" style={{ color: 'var(--kick-green)' }}>← อยู่ที่นี่</span>}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Back to top button */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all hover:shadow-lg lg:bottom-6"
          style={{ background: 'var(--surface-card)', border: '1px solid var(--border-strong)', color: 'var(--text-muted)' }}
          aria-label="Back to top"
        >
          <IconChevronUp size={16} />
        </button>
      )}
    </>
  )
}
