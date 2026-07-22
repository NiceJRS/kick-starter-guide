import type { ReactNode } from 'react'

export default function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[15px] font-semibold mt-6 mb-3 scroll-mt-24"
      style={{ color: '#cfd8cc', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}
    >
      {children}
    </h2>
  )
}
