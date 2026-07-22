'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconMap2, IconCheck } from '@tabler/icons-react'
import { guides } from '@/lib/guides'
import { getCompletedGuides, markGuideComplete } from '@/lib/progress'

export default function BeginnerPath({ locale }: { locale: string }) {
  const [completed, setCompleted] = useState<number[]>([])
  const router = useRouter()

  useEffect(() => {
    setCompleted(getCompletedGuides())
  }, [])

  const currentIdx = guides.findIndex((g) => !completed.includes(g.id))
  const currentStep = currentIdx === -1 ? null : guides[currentIdx]
  const progress = completed.length

  const skip = () => {
    if (!currentStep) return
    markGuideComplete(currentStep.id)
    setCompleted(getCompletedGuides())
  }

  const start = () => {
    if (!currentStep) return
    router.push(`/${locale}/guide/${currentStep.slug}`)
  }

  return (
    <div
      className="rounded-xl overflow-hidden mb-3"
      style={{ background: 'var(--surface-page)', border: '0.5px solid var(--purple-28)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ background: 'var(--surface-card)', borderBottom: '0.5px solid var(--purple-28)' }}
      >
        <div className="flex items-center gap-2">
          <IconMap2 size={14} style={{ color: 'var(--purple)' }} />
          <div>
            <div className="text-[12px] font-medium" style={{ color: '#cfd8cc' }}>
              {locale === 'th' ? 'Streamer Path — ตั้งแต่ศูนย์ถึง Pro' : 'Streamer Path — Zero to Pro'}
            </div>
            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              {locale === 'th' ? 'ทำตามลำดับหรือข้ามบทได้' : 'Follow in order or skip chapters'}
            </div>
          </div>
        </div>
        {/* XP bar */}
        <div className="w-[85px]">
          <div className="flex justify-between text-[9px] mb-1" style={{ color: 'var(--text-muted)' }}>
            <span>Progress</span>
            <span style={{ color: 'var(--purple)' }}>{progress}/{guides.length}</span>
          </div>
          <div className="h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(progress / guides.length) * 100}%`, background: 'var(--purple)' }}
            />
          </div>
          <div className="text-[9px] mt-1 text-right" style={{ color: 'var(--purple)' }}>
            +{progress * 10} XP
          </div>
        </div>
      </div>

      {/* Steps row */}
      <div className="flex px-3 pt-3 pb-2 relative">
        {guides.map((g, i) => {
          const done = completed.includes(g.id)
          const current = i === currentIdx
          return (
            <div key={g.id} className="flex-1 flex flex-col items-center relative">
              {/* Connector */}
              {i < guides.length - 1 && (
                <div
                  className="absolute top-3 left-1/2 w-full h-[1.5px]"
                  style={{
                    background: done
                      ? 'rgba(83,252,24,0.2)'
                      : current
                      ? 'rgba(127,119,221,0.2)'
                      : 'rgba(255,255,255,0.07)',
                  }}
                />
              )}
              {/* Dot */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium relative z-10"
                style={{
                  background: done
                    ? 'rgba(83,252,24,0.1)'
                    : current
                    ? 'var(--purple-13)'
                    : '#111811',
                  border: `1px solid ${done ? 'rgba(83,252,24,0.35)' : current ? 'var(--purple)' : 'rgba(255,255,255,0.07)'}`,
                  color: done ? 'var(--kick-green)' : current ? 'var(--purple)' : 'var(--text-muted)',
                }}
              >
                {done ? <IconCheck size={10} /> : g.id}
              </div>
              {/* Label */}
              <div
                className="text-[8px] mt-1 text-center max-w-[50px] leading-tight"
                style={{
                  color: done
                    ? 'rgba(83,252,24,0.55)'
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
          className="mx-3 mb-3 px-3 py-2.5 rounded-lg flex items-center justify-between"
          style={{ background: 'var(--surface-card2)', border: '0.5px solid var(--purple-28)' }}
        >
          <div>
            <div className="text-[11px] font-medium" style={{ color: '#cfd8cc' }}>
              {locale === 'th' ? `ถัดไป: ${currentStep.title.th}` : `Next: ${currentStep.title.en}`}
            </div>
            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              {locale === 'th' ? `บทที่ ${currentStep.id} · ~${currentStep.duration} นาที` : `Chapter ${currentStep.id} · ${currentStep.level} · ~${currentStep.duration}m`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={skip}
              className="px-2.5 py-1 text-[10px] rounded-md transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              {locale === 'th' ? 'ข้าม' : 'Skip'}
            </button>
            <button
              onClick={start}
              className="px-3 py-1 text-[10px] font-medium rounded-md transition-opacity hover:opacity-90"
              style={{ background: 'var(--purple)', color: '#fff' }}
            >
              {locale === 'th' ? 'เริ่ม' : 'Start'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
