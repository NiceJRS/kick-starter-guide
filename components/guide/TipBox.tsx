import type { ReactNode } from 'react'

export default function TipBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex gap-2.5 p-3 rounded-xl my-3 text-[11px] leading-relaxed"
      style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)', color: '#a8c5a0' }}
    >
      <span className="flex-shrink-0 mt-0.5">💡</span>
      <div>{children}</div>
    </div>
  )
}
