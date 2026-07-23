import type { ReactNode } from 'react'

export default function TipBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex gap-2.5 p-3 rounded-xl my-3 text-sm leading-relaxed"
      style={{ background: 'var(--kick-green-bg)', borderLeft: '4px solid var(--kick-green-text)', color: 'var(--text-secondary)' }}
    >
      <span className="flex-shrink-0 mt-0.5">💡</span>
      <div>{children}</div>
    </div>
  )
}
