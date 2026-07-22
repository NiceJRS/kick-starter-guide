'use client'

import { useEffect, useState } from 'react'
import { getCompletedGuides } from '@/lib/progress'
import { calcXP, calcLevel } from '@/lib/xp'

export default function XPBar() {
  const [xp, setXP] = useState(0)

  useEffect(() => {
    setXP(calcXP(getCompletedGuides().length))
  }, [])

  const lvl = calcLevel(xp)

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px]"
      style={{ background: 'var(--purple-13)', borderColor: 'var(--purple-28)', color: 'var(--purple)' }}>
      <span className="font-medium">Lv.{lvl.level}</span>
      <span style={{ color: 'var(--text-muted)' }}>{xp} XP</span>
    </div>
  )
}
