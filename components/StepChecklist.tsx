'use client'

import { useEffect, useState } from 'react'
import { getCompletedGuides, markGuideComplete, unmarkGuideComplete } from '@/lib/progress'
import { guides } from '@/lib/guides'

export default function StepChecklist({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const guide = guides.find((g) => g.slug === slug)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!guide) return
    setChecked(getCompletedGuides().includes(guide.id))
  }, [guide])

  const toggle = () => {
    if (!guide) return
    if (checked) {
      unmarkGuideComplete(guide.id)
      setChecked(false)
    } else {
      markGuideComplete(guide.id)
      setChecked(true)
    }
  }

  return (
    <div className="flex items-start gap-3 my-2">
      <input type="checkbox" checked={checked} onChange={toggle} className="mt-1 h-4 w-4 cursor-pointer" />
      <div className={checked ? 'line-through opacity-50' : ''}>{children}</div>
    </div>
  )
}
