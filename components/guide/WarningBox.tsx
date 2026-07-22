import type { ReactNode } from 'react'

export default function WarningBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex gap-2.5 p-3 rounded-xl my-3 text-[11px] leading-relaxed"
      style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: '#d4a847' }}
    >
      <span className="flex-shrink-0 mt-0.5">⚠️</span>
      <div>{children}</div>
    </div>
  )
}
