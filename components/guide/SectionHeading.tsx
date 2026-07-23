import type { ReactNode } from 'react'

export default function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-lg font-semibold mt-6 mb-3 scroll-mt-24"
      style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-default)', paddingBottom: '0.5rem' }}
    >
      {children}
    </h2>
  )
}
