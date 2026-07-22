'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { getProgress } from '@/lib/progress'

export default function ProgressBar({ slug, totalSteps }: { slug: string; totalSteps?: number }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (!totalSteps) return
    const completed = getProgress(slug).length
    setPct(Math.round((completed / totalSteps) * 100))
  }, [slug, totalSteps])

  if (!totalSteps) return null

  return (
    <div className="my-4">
      <Progress value={pct} className="h-2" />
      <p className="text-xs text-muted-foreground mt-1">{pct}% complete</p>
    </div>
  )
}
