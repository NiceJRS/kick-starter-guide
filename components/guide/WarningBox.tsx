import type { ReactNode } from 'react'

export default function WarningBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex gap-2.5 p-3 rounded-xl my-3 text-sm leading-relaxed"
      style={{ background: '#FEF8E8', borderLeft: '4px solid var(--amber)', color: 'var(--text-secondary)' }}
    >
      <span className="flex-shrink-0 mt-0.5">⚠️</span>
      <div>{children}</div>
    </div>
  )
}
