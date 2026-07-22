'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { IconClock } from '@tabler/icons-react'
import { allGuides } from 'contentlayer/generated'
import { getGuideBySlug, getAdjacentGuides } from '@/lib/guides'
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
  const isDone = completed.includes(guide.id)

  useEffect(() => {
    setCompleted(getCompletedGuides())
  }, [])

  const toggleDone = () => {
    markGuideComplete(guide.id)
    setCompleted(getCompletedGuides())
  }

  const title = locale === 'th' ? guide.title.th : guide.title.en
  const description = locale === 'th' ? guide.description.th : guide.description.en

  return (
    <div className="flex gap-6">
      <GuideSidebar locale={locale} currentSlug={slug} completed={completed} />

      <div className="flex-1 min-w-0">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[12px] mb-4" style={{ color: 'var(--text-secondary)' }}>
          <Link href={`/${locale}`} className="hover:text-[--text-secondary]">
            {locale === 'th' ? 'หน้าแรก' : 'Home'}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{guide.category}</span>
          <span>/</span>
          <span style={{ color: 'var(--kick-green)' }}>{title}</span>
        </div>

        {/* Header */}
        <div
          className="p-4 rounded-xl mb-4"
          style={{ background: 'var(--surface-card)', border: '0.5px solid var(--kick-green-22)' }}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="text-[18px] font-medium" style={{ color: '#cfd8cc' }}>{title}</h1>
            <LevelBadge level={guide.level} locale={locale} />
          </div>
          <p className="text-[12px] mb-3" style={{ color: 'var(--text-secondary)' }}>{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-muted)' }}>
              <IconClock size={11} />
              ~{guide.duration}{locale === 'th' ? ' นาที' : ' min'}
            </div>
            <button
              onClick={toggleDone}
              className={`px-4 py-1.5 text-[12px] font-semibold rounded-lg transition-all ${isDone ? 'hover:brightness-110' : 'hover:bg-[--kick-green-10] hover:border-[--kick-green-22] hover:text-[--kick-green]'}`}
              style={isDone
                ? { background: 'var(--kick-green-10)', color: 'var(--kick-green)', border: '1px solid var(--kick-green-22)' }
                : { background: 'rgba(255,255,255,0.04)', color: '#cfd8cc', border: '1px solid rgba(255,255,255,0.20)' }
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
          style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {mdxDoc ? (
            <MDXRenderer code={mdxDoc.body.code} />
          ) : (
            <div className="text-center py-6">
              <div className="text-[13px] mb-1" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th' ? '📝 เนื้อหากำลังมา' : '📝 Content coming soon'}
              </div>
              <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {locale === 'th'
                  ? 'บทนี้อยู่ระหว่างการเขียน กรุณากลับมาใหม่เร็วๆ นี้'
                  : 'This chapter is being written. Please check back soon.'}
              </div>
            </div>
          )}
        </div>

        <GuideNav prev={prev} next={next} locale={locale} />
      </div>
    </div>
  )
}
