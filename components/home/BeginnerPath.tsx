'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconMap2, IconCheck, IconChevronDown, IconChevronUp, IconRefresh } from '@tabler/icons-react'
import { guides } from '@/lib/guides'
import { getCompletedGuides, markGuideComplete, unmarkGuideComplete, PROGRESS_KEY } from '@/lib/progress'

export default function BeginnerPath({ locale }: { locale: string }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [open, setOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setCompleted(getCompletedGuides())
  }, [])

  const currentIdx = guides.findIndex((g) => !completed.includes(g.id))
  const currentStep = currentIdx === -1 ? null : guides[currentIdx]
  const progress = completed.length

  const toggleDot = (id: number) => {
    if (completed.includes(id)) {
      unmarkGuideComplete(id)
    } else {
      markGuideComplete(id)
    }
    setCompleted(getCompletedGuides())
  }

  const skip = () => {
    if (!currentStep) return
    markGuideComplete(currentStep.id)
    setCompleted(getCompletedGuides())
  }

  const start = () => {
    if (!currentStep) return
    router.push(`/${locale}/guide/${currentStep.slug}`)
  }

  const reset = () => {
    localStorage.removeItem(PROGRESS_KEY)
    setCompleted([])
  }

  return (
    <div
      className="rounded-xl overflow-hidden mb-6"
      style={{ background: 'var(--surface-page)', border: '0.5px solid var(--purple-28)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ background: 'var(--surface-card)', borderBottom: open ? '0.5px solid var(--purple-28)' : 'none' }}
      >
        <div className="flex items-center gap-3">
          <IconMap2 size={16} style={{ color: 'var(--purple)' }} />
          <div>
            <div className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>
              {locale === 'th' ? 'Streamer Path — ตั้งแต่ศูนย์ถึง Pro' : 'Streamer Path — Zero to Pro'}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {locale === 'th' ? 'ทำตามลำดับหรือข้ามบทได้' : 'Follow in order or skip chapters'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Step progress */}
          <div className="w-[110px]">
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              <span>{locale === 'th' ? 'ขั้นตอน' : 'Step'}</span>
              <span style={{ color: 'var(--purple)' }}>{progress}/{guides.length}</span>
            </div>
            <div className="h-[4px] rounded-full" style={{ background: 'var(--border-default)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(progress / guides.length) * 100}%`, background: 'var(--purple)' }}
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
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all hover:bg-[--surface-card2] hover:border-[--border-strong]"
            style={{ background: 'var(--surface-card2)', border: '1px solid var(--border-strong)' }}
          >
            {open
              ? <IconChevronUp size={14} style={{ color: 'var(--text-muted)' }} />
              : <IconChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          {/* Steps row */}
          <div className="flex px-5 pt-5 pb-3 relative">
            {guides.map((g, i) => {
              const done = completed.includes(g.id)
              const current = i === currentIdx
              return (
                <div key={g.id} className="flex-1 flex flex-col items-center relative">
                  {/* Connector */}
                  {i < guides.length - 1 && (
                    <div
                      className="absolute top-4 left-1/2 w-full h-[1.5px]"
                      style={{
                        background: done
                          ? 'rgba(30,122,10,0.2)'
                          : current
                          ? 'rgba(108,99,200,0.2)'
                          : 'var(--border-default)',
                      }}
                    />
                  )}
                  {/* Dot — clickable to toggle */}
                  <button
                    onClick={() => toggleDot(g.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative z-10 transition-all hover:scale-110"
                    style={{
                      background: done
                        ? 'var(--kick-green-bg)'
                        : current
                        ? 'var(--purple-13)'
                        : 'var(--surface-card)',
                      border: `1px solid ${done ? 'rgba(30,122,10,0.35)' : current ? 'var(--purple)' : 'var(--border-strong)'}`,
                      color: done ? 'var(--kick-green-text)' : current ? 'var(--purple)' : 'var(--text-muted)',
                    }}
                  >
                    {done ? <IconCheck size={12} /> : g.id}
                  </button>
                  {/* Label */}
                  <div
                    className="text-xs mt-1.5 text-center max-w-[56px] leading-tight"
                    style={{
                      color: done
                        ? 'var(--kick-green-text)'
                        : current
                        ? 'var(--purple)'
                        : 'var(--text-muted)',
                    }}
                  >
                    {g.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Current step card */}
          {currentStep && (
            <div
              className="mx-5 mb-5 px-4 py-3.5 rounded-xl flex items-center justify-between"
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
                  className="px-3 py-1.5 text-xs rounded-lg transition-all hover:bg-[--surface-card2] hover:border-[--border-strong] hover:text-[--text-primary]"
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

          {progress === guides.length && (
            <div className="mx-5 mb-5 text-center text-sm" style={{ color: 'var(--kick-green)' }}>
              {locale === 'th' ? '🎉 เสร็จแล้ว! คุณคือ Pro Streamer แล้ว' : "🎉 All done! You're a Pro Streamer now"}
            </div>
          )}
        </>
      )}
    </div>
  )
}
