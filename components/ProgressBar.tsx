'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { getCompletedGuides } from '@/lib/progress'
import { guides } from '@/lib/guides'

export default function ProgressBar({ slug }: { slug: string }) {
  const [pct, setPct] = useState(0)
  const guide = guides.find((g) => g.slug === slug)

  useEffect(() => {
    if (!guide) return
    const completed = getCompletedGuides()
    setPct(completed.includes(guide.id) ? 100 : 0)
  }, [guide])

  return (
    <div className="my-4">
      <Progress value={pct} className="h-2" />
      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{pct}% complete</p>
    </div>
  )
}
