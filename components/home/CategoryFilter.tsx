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
      style={{ background: 'var(--surface-page)', border: '1px solid var(--border-default)' }}
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
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition-all hover:bg-[--kick-green-10] hover:border-[--kick-green-22] hover:text-[--kick-green]"
              style={{
                background: active ? 'var(--kick-green-10)' : 'var(--surface-card2)',
                borderColor: active ? 'var(--kick-green-22)' : 'var(--border-strong)',
                color: active ? 'var(--kick-green)' : 'var(--text-muted)',
              }}
            >
              <Icon size={10} />
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div className="mb-2.5" style={{ borderTop: '1px solid var(--border-default)' }} />

      {/* Level pills */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {locale === 'th' ? 'ระดับ' : 'Level'}
        </span>
        <button
          onClick={() => onLevel('All')}
          className="px-2.5 py-0.5 rounded-full text-xs border transition-all hover:bg-[--surface-card2] hover:border-[--border-strong] hover:text-[--text-primary]"
          style={{
            background: level === 'All' ? 'var(--surface-card2)' : 'transparent',
            borderColor: level === 'All' ? 'var(--border-strong)' : 'var(--border-default)',
            color: level === 'All' ? 'var(--text-primary)' : 'var(--text-muted)',
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
              className="px-2.5 py-0.5 rounded-full text-xs border transition-all hover:opacity-80"
              style={{
                background: active ? l.bg : 'transparent',
                borderColor: active ? l.border : 'var(--border-default)',
                color: active ? l.color : 'var(--text-muted)',
              }}
            >
              {l.label}
            </button>
          )
        })}
        <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          {count} {locale === 'th' ? 'บทเรียน' : 'guides'}
        </span>
      </div>
    </div>
  )
}
