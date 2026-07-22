'use client'

import { useEffect, useState } from 'react'
import { markStep, unmarkStep, getProgress } from '@/lib/progress'

export default function StepChecklist({
  slug,
  stepId,
  children,
}: {
  slug: string
  stepId: string
  children: React.ReactNode
}) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(getProgress(slug).includes(stepId))
  }, [slug, stepId])

  const toggle = () => {
    if (checked) {
      unmarkStep(slug, stepId)
      setChecked(false)
    } else {
      markStep(slug, stepId)
      setChecked(true)
    }
  }

  return (
    <div className="flex items-start gap-3 my-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggle}
        className="mt-1 h-4 w-4 cursor-pointer"
      />
      <div className={checked ? 'line-through text-muted-foreground' : ''}>{children}</div>
    </div>
  )
}
