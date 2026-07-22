import type { ReactNode } from 'react'

export default function StepCard({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: ReactNode
}) {
  return (
    <div
      className="flex gap-3 p-3.5 rounded-xl mb-3"
      style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
        style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)', color: 'var(--kick-green)' }}
      >
        {step}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[12px] font-medium mb-1" style={{ color: '#cfd8cc' }}>{title}</h4>
        <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
