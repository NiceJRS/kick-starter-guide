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
      style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
        style={{ background: 'var(--kick-green-bg)', border: '1px solid var(--kick-green-22)', color: 'var(--kick-green-text)' }}
      >
        {step}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h4>
        <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
