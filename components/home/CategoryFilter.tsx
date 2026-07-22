'use client'

import { IconLayoutGrid, IconSettings, IconMessages, IconRobot, IconCash, IconApi, type Icon } from '@tabler/icons-react'
import type { GuideCategory, GuideLevel } from '@/lib/guides'

const CATEGORIES: { label: string; value: GuideCategory | 'All'; icon: Icon }[] = [
  { label: 'All',           value: 'All',          icon: IconLayoutGrid },
  { label: 'Setup',         value: 'Setup',        icon: IconSettings },
  { label: 'Chat',          value: 'Chat',         icon: IconMessages },
  { label: 'Tools & Bot',   value: 'Tools & Bot',  icon: IconRobot },
  { label: 'Monetization',  value: 'Monetization', icon: IconCash },
  { label: 'Advanced',      value: 'Advanced',     icon: IconApi },
]

const LEVELS: { label: string; value: GuideLevel | 'All'; color: string; bg: string; border: string }[] = [
  { label: 'Beginner',     value: 'beginner',     color: 'var(--kick-green)', bg: 'var(--kick-green-10)', border: 'var(--kick-green-22)' },
  { label: 'Intermediate', value: 'intermediate', color: 'var(--amber)',       bg: 'var(--amber-10)',       border: 'var(--amber-25)' },
  { label: 'Pro',          value: 'pro',          color: 'var(--purple)',      bg: 'var(--purple-13)',      border: 'var(--purple-28)' },
]

export default function CategoryFilter({
  category, level, count, locale,
  onCategory, onLevel,
}: {
  category: GuideCategory | 'All'
  level: GuideLevel | 'All'
  count: number
  locale: string
  onCategory: (c: GuideCategory | 'All') => void
  onLevel: (l: GuideLevel | 'All') => void
}) {
  return (
    <div
      className="p-3 rounded-xl mb-3"
      style={{ background: 'var(--surface-page)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {CATEGORIES.map((c) => {
          const active = category === c.value
          const Icon = c.icon
          return (
            <button
              key={c.value}
              onClick={() => onCategory(c.value)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition-all hover:bg-[--kick-green-10] hover:border-[--kick-green-22] hover:text-[--kick-green]"
              style={{
                background: active ? 'var(--kick-green-10)' : 'rgba(255,255,255,0.03)',
                borderColor: active ? 'var(--kick-green-22)' : 'rgba(255,255,255,0.10)',
                color: active ? 'var(--kick-green)' : '#8fa895',
              }}
            >
              <Icon size={10} />
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div className="mb-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

      {/* Level pills */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
          {locale === 'th' ? 'ระดับ' : 'Level'}
        </span>
        <button
          onClick={() => onLevel('All')}
          className="px-2.5 py-0.5 rounded-full text-[11px] border transition-all hover:bg-white/[0.08] hover:border-white/20 hover:text-[#cfd8cc]"
          style={{
            background: level === 'All' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
            borderColor: level === 'All' ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.10)',
            color: level === 'All' ? '#cfd8cc' : '#8fa895',
          }}
        >
          All
        </button>
        {LEVELS.map((l) => {
          const active = level === l.value
          return (
            <button
              key={l.value}
              onClick={() => onLevel(l.value)}
              className="px-2.5 py-0.5 rounded-full text-[11px] border transition-all hover:opacity-80"
              style={{
                background: active ? l.bg : 'rgba(255,255,255,0.02)',
                borderColor: active ? l.border : 'rgba(255,255,255,0.10)',
                color: active ? l.color : '#8fa895',
              }}
            >
              {l.label}
            </button>
          )
        })}
        <span className="ml-auto text-[11px]" style={{ color: 'var(--text-muted)' }}>
          {count} {locale === 'th' ? 'บทเรียน' : 'guides'}
        </span>
      </div>
    </div>
  )
}
