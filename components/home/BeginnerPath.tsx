'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconMap2, IconCheck, IconChevronDown, IconChevronUp, IconRefresh } from '@tabler/icons-react'
import { guides, STAGE_CONFIG } from '@/lib/guides'
import { getCompletedGuides, markGuideComplete, unmarkGuideComplete, PROGRESS_KEY } from '@/lib/progress'

const STAGES = STAGE_CONFIG.map((s) => ({
  ...s,
  guideIds: guides.filter((g) => g.stage === s.id && g.showInPath).map((g) => g.id),
}))

export default function BeginnerPath({ locale }: { locale: string }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [open, setOpen] = useState(true)
  const [celebratedStage, setCelebratedStage] = useState<string | null>(null)
  const [shownStages, setShownStages] = useState<Set<string>>(new Set())
  const router = useRouter()

  useEffect(() => {
    setCompleted(getCompletedGuides())
  }, [])

  const stageGuides = (stage: typeof STAGES[0]) =>
    guides.filter((g) => stage.guideIds.includes(g.id))

  const stageCompleted = (stage: typeof STAGES[0]) =>
    stage.guideIds.every((id) => completed.includes(id))

  const checkStageCelebration = (newCompleted: number[]) => {
    for (const stage of STAGES) {
      const done = stage.guideIds.every((id) => newCompleted.includes(id))
      if (done && !shownStages.has(stage.id)) {
        setCelebratedStage(stage.id)
        setShownStages((prev) => { const s = new Set(prev); s.add(stage.id); return s })
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
    checkStageCelebration(next)
  }

  const skip = () => {
    const currentStep = guides.find((g) => !completed.includes(g.id))
    if (!currentStep) return
    markGuideComplete(currentStep.id)
    const next = getCompletedGuides()
    setCompleted(next)
    checkStageCelebration(next)
  }

  const start = () => {
    const target = guides.find((g) => !completed.includes(g.id)) ?? guides[0]
    router.push(`/${locale}/guide/${target.slug}`)
  }

  const reset = () => {
    localStorage.removeItem(PROGRESS_KEY)
    setCompleted([])
    setShownStages(new Set())
  }

  const totalStarter = STAGES[0].guideIds.length
  const starterDone = STAGES[0].guideIds.filter((id) => completed.includes(id)).length
  const currentStep = guides.find((g) => !completed.includes(g.id))
  const celebrateData = celebratedStage ? STAGES.find((s) => s.id === celebratedStage) : null

  return (
    <div
      className="rounded-xl overflow-hidden mb-6 relative"
      style={{ background: 'var(--surface-page)', border: '0.5px solid var(--purple-28)' }}
    >
      {/* Celebration overlay */}
      {celebrateData && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center rounded-xl"
          style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="mx-6 p-6 rounded-2xl text-center max-w-[340px] w-full"
            style={{ background: 'var(--surface-card)', border: `1px solid ${celebrateData.colorBorder}` }}
          >
            <div className="text-4xl mb-3">
              {celebrateData.id === 'starter' ? '🚀' : celebrateData.id === 'amateur' ? '🏆' : '👑'}
            </div>
            <div className="text-lg font-bold mb-1" style={{ color: celebrateData.colorText }}>
              {locale === 'th' ? celebrateData.celebrate.th : celebrateData.celebrate.en}
            </div>
            <div className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'th' ? celebrateData.celebrateSub.th : celebrateData.celebrateSub.en}
            </div>
            <button
              onClick={() => setCelebratedStage(null)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: celebrateData.colorText, color: '#fff' }}
            >
              {locale === 'th' ? 'ต่อไป →' : 'Continue →'}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: 'var(--surface-card)', borderBottom: open ? '0.5px solid var(--purple-28)' : 'none' }}>
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <IconMap2 size={16} style={{ color: 'var(--purple)' }} />
            <div>
              <div className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>
                Streamer Path
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {locale === 'th'
                  ? `ทำ ${totalStarter} บทแรก (Starter) แล้วไปสตรีมได้เลย — ที่เหลือเป็น optional`
                  : `Complete ${totalStarter} Starter chapters to go live — rest is optional`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Starter progress */}
            <div className="w-[110px]">
              <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                <span>Starter</span>
                <span style={{ color: 'var(--kick-green-text)' }}>{starterDone}/{totalStarter}</span>
              </div>
              <div className="h-[4px] rounded-full" style={{ background: 'var(--border-default)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(starterDone / totalStarter) * 100}%`, background: 'var(--kick-green-text)' }}
                />
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-300"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' }}
              title={locale === 'th' ? 'รีเซ็ต' : 'Reset'}
            >
              <IconRefresh size={12} />
              <span>{locale === 'th' ? 'รีเซ็ต' : 'Reset'}</span>
            </button>

            {/* Collapse toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-7 h-7 rounded-lg transition-all"
              style={{ background: 'var(--surface-card2)', border: '1px solid var(--border-strong)' }}
            >
              {open
                ? <IconChevronUp size={14} style={{ color: 'var(--text-muted)' }} />
                : <IconChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
            </button>
          </div>
        </div>

        {/* CTA — always visible, even when collapsed */}
        <div className="px-5 pb-4">
          <button
            onClick={start}
            className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(127,119,221,0.45)] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, var(--purple) 0%, #3b6fd4 100%)',
              color: '#fff',
              boxShadow: '0 2px 12px rgba(127,119,221,0.3)',
            }}
          >
            {locale === 'th'
              ? '🚀 มือใหม่ใช่ไหม? เริ่ม Setup Stream กันเลย'
              : '🚀 New here? Start your Stream Setup!'}
          </button>
        </div>
      </div>

      {open && (
        <>
          <div className="px-5 pt-4 pb-2 space-y-5">
            {STAGES.map((stage, si) => {
              const stageDone = stageCompleted(stage)
              const stageGs = stageGuides(stage)
              const stageCurrentIdx = stageGs.findIndex((g) => !completed.includes(g.id))

              return (
                <div key={stage.id}>
                  {/* Stage label row */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: stageDone || si === 0 ? stage.colorBg : 'var(--surface-card2)',
                        color: stageDone || si === 0 ? stage.colorText : 'var(--text-muted)',
                        border: `1px solid ${stageDone || si === 0 ? stage.colorBorder : 'var(--border-strong)'}`,
                      }}
                    >
                      {stageDone ? '✓ ' : ''}{locale === 'th' ? stage.label.th : stage.label.en}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      — {locale === 'th' ? stage.sub.th : stage.sub.en}
                    </span>
                    {si === 0 ? (
                      <span
                        className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: 'var(--kick-green-bg)', color: 'var(--kick-green-text)', border: '1px solid var(--kick-green-22)' }}
                      >
                        ⭐ {locale === 'th' ? 'ต้องทำ' : 'Required'}
                      </span>
                    ) : (
                      <span
                        className="ml-auto text-[9px] px-1.5 py-0.5 rounded"
                        style={{ color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}
                      >
                        optional
                      </span>
                    )}
                  </div>

                  {/* Dots row */}
                  <div className="flex">
                    {stageGs.map((g, i) => {
                      const done = completed.includes(g.id)
                      const current = i === stageCurrentIdx
                      return (
                        <div key={g.id} className="flex-1 flex flex-col items-center relative">
                          {/* Connector */}
                          {i < stageGs.length - 1 && (
                            <div
                              className="absolute top-4 left-1/2 w-full h-[1.5px]"
                              style={{ background: done ? stage.colorBorder : 'var(--border-default)' }}
                            />
                          )}
                          {/* Dot */}
                          <button
                            onClick={() => toggleDot(g.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative z-10 transition-all hover:scale-110"
                            style={{
                              background: done ? stage.colorBg : current ? stage.colorBg : 'var(--surface-card)',
                              border: `1px solid ${done ? stage.colorBorder : current ? stage.color : 'var(--border-strong)'}`,
                              color: done ? stage.colorText : current ? stage.colorText : 'var(--text-muted)',
                            }}
                          >
                            {done ? <IconCheck size={12} /> : g.id}
                          </button>
                          {/* Label */}
                          <div
                            className="text-xs mt-1.5 text-center max-w-[56px] leading-tight"
                            style={{ color: done ? stage.colorText : current ? stage.colorText : 'var(--text-muted)' }}
                          >
                            {g.label}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Current step card */}
          {currentStep && (
            <div
              className="mx-5 mb-5 mt-1 px-4 py-3.5 rounded-xl flex items-center justify-between"
              style={{ background: 'var(--surface-card2)', border: '0.5px solid var(--purple-28)' }}
            >
              <div>
                <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>
                  {locale === 'th' ? `ถัดไป: ${currentStep.title.th}` : `Next: ${currentStep.title.en}`}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {locale === 'th'
                    ? `บทที่ ${currentStep.id} · ~${currentStep.duration} นาที`
                    : `Chapter ${currentStep.id} · ${currentStep.level} · ~${currentStep.duration}m`}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={skip}
                  className="px-3 py-1.5 text-xs rounded-lg transition-all"
                  style={{ color: 'var(--text-primary)', border: '1px solid var(--border-strong)' }}
                >
                  {locale === 'th' ? 'ข้าม' : 'Skip'}
                </button>
                <button
                  onClick={start}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg transition-all hover:brightness-110 hover:shadow-[0_0_12px_rgba(127,119,221,0.5)]"
                  style={{ background: 'var(--purple)', color: '#fff' }}
                >
                  {locale === 'th' ? 'เริ่ม' : 'Start'}
                </button>
              </div>
            </div>
          )}

          {!currentStep && (
            <div className="mx-5 mb-5 text-center text-sm" style={{ color: 'var(--kick-green-text)' }}>
              {locale === 'th' ? '👑 เสร็จทุกขั้นตอนแล้ว! คุณคือ Pro Streamer ตัวจริง' : "👑 All done! You're a true Pro Streamer"}
            </div>
          )}
        </>
      )}
    </div>
  )
}
