import type { ReactNode } from 'react'

export default function FaqItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <div
      className="rounded-xl mb-2 overflow-hidden"
      style={{ border: '1px solid var(--border-default)' }}
    >
      <div
        className="flex items-start gap-2.5 px-4 py-3"
        style={{ background: 'var(--surface-card2)', borderBottom: '1px solid var(--border-default)' }}
      >
        <span
          className="flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded mt-0.5"
          style={{ background: 'var(--kick-green-bg)', color: 'var(--kick-green-text)', border: '1px solid var(--kick-green-22)' }}
        >
          Q
        </span>
        <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          {q}
        </p>
      </div>
      <div
        className="flex items-start gap-2.5 px-4 py-3"
        style={{ background: 'var(--surface-card)' }}
      >
        <span
          className="flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded mt-0.5"
          style={{ background: 'var(--amber-10)', color: 'var(--amber)', border: '1px solid var(--amber-25)' }}
        >
          A
        </span>
        <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
