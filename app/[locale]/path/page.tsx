'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconRadio, IconArrowLeft, IconCheck, IconMap2, IconRefresh } from '@tabler/icons-react'
import { guides, STAGE_CONFIG } from '@/lib/guides'
import { getCompletedGuides, markGuideComplete, unmarkGuideComplete, PROGRESS_KEY } from '@/lib/progress'
import GuideCard from '@/components/home/GuideCard'

const NAV_OFFSET = 120

export default function PathPage({ params: { locale } }: { params: { locale: string } }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [activeStage, setActiveStage] = useState<string>('starter')
  const [celebratedStage, setCelebratedStage] = useState<string | null>(null)
  const [shownStages, setShownStages] = useState<Set<string>>(new Set())
  const router = useRouter()

  const stageGroups = STAGE_CONFIG.map((s) => ({
    ...s,
    guides: guides.filter((g) => g.stage === s.id && g.showIn.includes('path')),
  }))

  useEffect(() => {
    setCompleted(getCompletedGuides())
  }, [])

  // Scroll-spy on stage sections
  useEffect(() => {
    const ids = stageGroups.map((s) => s.id)
    const onScroll = () => {
      const positions = ids
        .map((id) => {
          const el = document.getElementById(`stage-${id}`)
          if (!el) return null
          return { id, top: el.getBoundingClientRect().top }
        })
        .filter(Boolean) as { id: string; top: number }[]

      const passed = positions.filter((p) => p.top <= NAV_OFFSET)
      if (passed.length > 0) {
        setActiveStage(passed[passed.length - 1].id)
      } else if (positions.length > 0) {
        setActiveStage(positions[0].id)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkCelebration = (next: number[]) => {
    for (const s of stageGroups) {
      const allDone = s.guides.every((g) => next.includes(g.id))
      if (allDone && !shownStages.has(s.id)) {
        setCelebratedStage(s.id)
        setShownStages((prev) => { const ns = new Set(prev); ns.add(s.id); return ns })
        break
      }
    }
  }

  const toggleDot = (id: number) => {
    if (completed.includes(id)) {
      unmarkGuideComplete(id)
    } else {
      markGuideComplete(id)
    }
    const next = getCompletedGuides()
    setCompleted(next)
    checkCelebration(next)
  }

  const reset = () => {
    localStorage.removeItem(PROGRESS_KEY)
    setCompleted([])
    setShownStages(new Set())
  }

  const scrollToStage = (id: string) => {
    const el = document.getElementById(`stage-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const celebrateData = celebratedStage ? stageGroups.find((s) => s.id === celebratedStage) : null
  const currentStep = guides.filter((g) => g.showIn.includes('path')).find((g) => !completed.includes(g.id))

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-page)', color: 'var(--text-primary)' }}>

      {/* Celebration overlay */}
      {celebrateData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)' }}>
          <div className="mx-6 p-6 rounded-2xl text-center max-w-[340px] w-full"
            style={{ background: 'var(--surface-card)', border: `1px solid ${celebrateData.colorBorder}` }}>
            <div className="text-4xl mb-3">
              {celebrateData.id === 'starter' ? '🚀' : celebrateData.id === 'amateur' ? '🏆' : '👑'}
            </div>
            <div className="text-lg font-bold mb-1" style={{ color: celebrateData.colorText }}>
              {locale === 'th' ? celebrateData.celebrate.th : celebrateData.celebrate.en}
            </div>
            <div className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'th' ? celebrateData.celebrateSub.th : celebrateData.celebrateSub.en}
            </div>
            <button onClick={() => setCelebratedStage(null)}
              className="px-5 py-2 rounded-lg text-sm font-semibold"
              style={{ background: celebrateData.colorText, color: '#0C110D' }}>
              {locale === 'th' ? 'ต่อไป →' : 'Continue →'}
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 py-3 sticky top-2 z-40 rounded-xl mb-2"
        style={{ background: 'var(--surface-card)', border: '0.5px solid var(--kick-green-22)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)' }}>
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
          <Link href={`/${locale}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' }}>
            <IconArrowLeft size={13} />
            {locale === 'th' ? 'หน้าหลัก' : 'Home'}
          </Link>
          <Link href={`/${locale}/guides`}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' }}>
            {locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides'}
          </Link>
          <button
            onClick={() => router.push(locale === 'th' ? '/en/path' : '/th/path')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
            style={{ background: 'var(--surface-card2)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            {locale === 'th' ? 'EN' : 'TH'}
          </button>
        </div>
      </nav>

      <div className="flex gap-0">
        {/* ── LEFT SIDEBAR ── always visible, no collapse */}
        <aside className="w-[220px] flex-shrink-0 hidden lg:block"
          style={{ borderRight: '1px solid var(--border-default)' }}>
          <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide py-4 pr-3">

            {/* Page title */}
            <div className="flex items-center gap-2 px-2 mb-4">
              <IconMap2 size={14} style={{ color: 'var(--purple)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                Streamer Path
              </span>
            </div>

            {/* Stage groups */}
            {stageGroups.map((stage) => {
              const isActive = activeStage === stage.id
              const stageDone = stage.guides.every((g) => completed.includes(g.id))

              return (
                <div key={stage.id} className="mb-4">
                  {/* Stage header — clickable, scrolls to section */}
                  <button
                    onClick={() => scrollToStage(stage.id)}
                    className="w-full text-left flex items-center gap-2 px-2 py-1.5 mb-1 rounded-lg transition-all"
                    style={{
                      background: isActive ? stage.colorBg : 'transparent',
                      border: `1px solid ${isActive ? stage.colorBorder : 'transparent'}`,
                    }}
                  >
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: isActive || stageDone ? stage.colorBg : 'var(--surface-card2)',
                        color: isActive || stageDone ? stage.colorText : 'var(--text-muted)',
                        border: `1px solid ${isActive || stageDone ? stage.colorBorder : 'var(--border-strong)'}`,
                      }}>
                      {stageDone ? '✓ ' : (stage.required ? '⭐ ' : '')}{locale === 'th' ? stage.label.th : stage.label.en}
                    </span>
                    <span className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                      {locale === 'th' ? stage.sub.th : stage.sub.en}
                    </span>
                  </button>

                  {/* Guide links */}
                  <div className="space-y-0.5 pl-2">
                    {stage.guides.map((g) => {
                      const done = completed.includes(g.id)
                      return (
                        <Link key={g.slug} href={`/${locale}/guide/${g.slug}`}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all group"
                          style={{ color: done ? stage.colorText : 'var(--text-secondary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--surface-card2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}>
                          <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium flex-shrink-0"
                            style={{
                              background: done ? stage.colorBg : 'var(--surface-card2)',
                              color: done ? stage.colorText : 'var(--text-muted)',
                              border: `1px solid ${done ? stage.colorBorder : 'var(--border-strong)'}`,
                            }}>
                            {done ? <IconCheck size={8} /> : g.id}
                          </span>
                          <span className="truncate leading-tight">{locale === 'th' ? g.title.th : g.title.en}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Stats + reset */}
            <div className="mt-2 pt-3 px-2" style={{ borderTop: '1px solid var(--border-default)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  {completed.filter(id => guides.find(g => g.id === id && g.showIn.includes('path'))).length}
                  /{guides.filter(g => g.showIn.includes('path')).length} {locale === 'th' ? 'เสร็จ' : 'done'}
                </span>
                <button onClick={reset}
                  className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded transition-all hover:text-red-400"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}>
                  <IconRefresh size={9} />
                  {locale === 'th' ? 'รีเซ็ต' : 'Reset'}
                </button>
              </div>
              {/* Overall progress bar */}
              {(() => {
                const pathGuides = guides.filter(g => g.showIn.includes('path'))
                const doneCount = pathGuides.filter(g => completed.includes(g.id)).length
                const pct = pathGuides.length > 0 ? (doneCount / pathGuides.length) * 100 : 0
                return (
                  <div className="h-1 rounded-full" style={{ background: 'var(--border-default)' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: 'var(--kick-green)' }} />
                  </div>
                )
              })()}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 px-5 py-4">

          {/* Page header */}
          <div className="mb-6 pb-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
            <div className="flex items-center gap-2 mb-1">
              <IconMap2 size={18} style={{ color: 'var(--purple)' }} />
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {locale === 'th' ? 'เส้นทาง Streamer' : 'Streamer Path'}
              </h1>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'th'
                ? 'ทำ Starter ให้ครบก่อน — ใช้เวลาแค่ 15 นาทีก็พร้อมสตรีมได้เลย'
                : 'Complete Starter first — takes ~15 min then you can go live'}
            </p>

            {/* Start CTA */}
            {currentStep && (
              <button
                onClick={() => router.push(`/${locale}/guide/${currentStep.slug}`)}
                className="mt-3 w-full py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(139,130,224,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, var(--purple) 0%, #3b6fd4 100%)',
                  color: '#fff',
                  boxShadow: '0 2px 12px rgba(139,130,224,0.25)',
                }}>
                {locale === 'th'
                  ? `🚀 ถัดไป: ${currentStep.title.th}`
                  : `🚀 Next: ${currentStep.title.en}`}
              </button>
            )}
            {!currentStep && (
              <div className="mt-3 py-2 text-center text-sm font-semibold"
                style={{ color: 'var(--kick-green)', background: 'var(--kick-green-bg)', borderRadius: 10 }}>
                👑 {locale === 'th' ? 'เสร็จทุกขั้นตอนแล้ว! Pro Streamer ตัวจริง' : "All done! True Pro Streamer"}
              </div>
            )}
          </div>

          {/* Stage sections */}
          {stageGroups.map((stage, si) => {
            const stageDone = stage.guides.every((g) => completed.includes(g.id))
            const stageCurrentIdx = stage.guides.findIndex((g) => !completed.includes(g.id))
            const totalMins = stage.guides.reduce((s, g) => s + g.duration, 0)

            return (
              <section key={stage.id} id={`stage-${stage.id}`}
                style={{ scrollMarginTop: '100px' }}
                className="mb-10">

                {/* Stage header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold px-3 py-1 rounded-full"
                    style={{
                      background: stageDone ? stage.colorBg : si === 0 ? stage.colorBg : 'var(--surface-card2)',
                      color: stageDone ? stage.colorText : si === 0 ? stage.colorText : 'var(--text-muted)',
                      border: `1px solid ${stageDone ? stage.colorBorder : si === 0 ? stage.colorBorder : 'var(--border-strong)'}`,
                    }}>
                    {stageDone ? '✓ ' : (stage.required ? '⭐ ' : '')}{locale === 'th' ? stage.label.th : stage.label.en}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {locale === 'th' ? stage.sub.th : stage.sub.en}
                  </span>
                  {stage.required ? (
                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold"
                      style={{ background: 'var(--kick-green-bg)', color: 'var(--kick-green-text)', border: '1px solid var(--kick-green-22)' }}>
                      {locale === 'th' ? 'ต้องทำ' : 'Required'}
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded"
                      style={{ color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}>
                      optional
                    </span>
                  )}
                  <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
                    ~{totalMins} {locale === 'th' ? 'นาที' : 'min'}
                  </span>
                </div>

                {/* Progress dots */}
                <div className="flex mb-5 px-2">
                  {stage.guides.map((g, i) => {
                    const done = completed.includes(g.id)
                    const current = i === stageCurrentIdx
                    return (
                      <div key={g.id} className="flex-1 flex flex-col items-center relative">
                        {i < stage.guides.length - 1 && (
                          <div className="absolute top-4 left-1/2 w-full h-[1.5px]"
                            style={{ background: done ? stage.colorBorder : 'var(--border-default)' }} />
                        )}
                        <button
                          onClick={() => toggleDot(g.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative z-10 transition-all hover:scale-110"
                          style={{
                            background: done ? stage.colorBg : current ? stage.colorBg : 'var(--surface-card)',
                            border: `1px solid ${done ? stage.colorBorder : current ? stage.color : 'var(--border-strong)'}`,
                            color: done ? stage.colorText : current ? stage.colorText : 'var(--text-muted)',
                          }}>
                          {done ? <IconCheck size={12} /> : g.id}
                        </button>
                        <div className="text-[11px] mt-1.5 text-center max-w-[60px] leading-tight"
                          style={{ color: done ? stage.colorText : current ? stage.colorText : 'var(--text-muted)' }}>
                          {g.label}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Guide cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {stage.guides.map((g) => (
                    <GuideCard key={g.id} guide={g} locale={locale} />
                  ))}
                </div>

                {/* Stage divider (not on last) */}
                {si < stageGroups.length - 1 && (
                  <div className="mt-8" style={{ borderBottom: '1px solid var(--border-default)' }} />
                )}
              </section>
            )
          })}
        </main>
      </div>
    </div>
  )
}
