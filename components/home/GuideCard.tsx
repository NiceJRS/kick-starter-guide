import Link from 'next/link'
import {
  IconUserCircle, IconDeviceDesktop, IconLayoutDashboard,
  IconMessages, IconRobot, IconShield, IconBrandDiscord,
  IconCash, IconApi, type Icon
} from '@tabler/icons-react'
import LevelBadge from '@/components/shared/LevelBadge'
import type { GuideData } from '@/lib/guides'

const ICONS: Record<string, Icon> = {
  'ti-user-circle':    IconUserCircle,
  'ti-device-desktop': IconDeviceDesktop,
  'ti-dashboard':      IconLayoutDashboard,
  'ti-messages':       IconMessages,
  'ti-robot':          IconRobot,
  'ti-shield':         IconShield,
  'ti-brand-discord':  IconBrandDiscord,
  'ti-cash':           IconCash,
  'ti-api':            IconApi,
}

const COLOR_MAP: Record<string, { bg: string; fg: string }> = {
  green:  { bg: 'var(--kick-green-10)', fg: 'var(--kick-green)' },
  amber:  { bg: 'var(--amber-10)',       fg: 'var(--amber)' },
  purple: { bg: 'var(--purple-13)',      fg: 'var(--purple)' },
  blue:   { bg: 'var(--blue-10)',        fg: 'var(--blue)' },
  teal:   { bg: 'rgba(20,184,166,0.1)', fg: '#14b8a6' },
}

const CATEGORY_LABELS: Record<string, string> = {
  'Setup': 'Setup',
  'Chat': 'Chat',
  'Tools & Bot': 'Bot',
  'Monetization': 'Money',
  'Advanced': 'Advanced',
}

export default function GuideCard({ guide, locale }: { guide: GuideData; locale: string }) {
  const Icon = ICONS[guide.icon] ?? IconApi
  const { bg, fg } = COLOR_MAP[guide.color] ?? COLOR_MAP.green

  return (
    <Link href={`/${locale}/guide/${guide.slug}`}>
      <div
        className="p-3 rounded-xl cursor-pointer transition-all h-full"
        style={{
          background: 'var(--surface-page)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--kick-green-22)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>#{guide.id}</span>
          <LevelBadge level={guide.level} locale={locale} />
        </div>

        {/* Icon */}
        <div className="w-7 h-7 rounded-md flex items-center justify-center mb-2" style={{ background: bg }}>
          <Icon size={15} style={{ color: fg }} />
        </div>

        {/* Text */}
        <h3 className="text-[11px] font-medium mb-1" style={{ color: '#cfd8cc' }}>
          {locale === 'th' ? guide.title.th : guide.title.en}
        </h3>
        <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {locale === 'th' ? guide.description.th : guide.description.en}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-2 pt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="text-[8px]" style={{ color: 'var(--text-muted)' }}>
            {CATEGORY_LABELS[guide.category]}
          </span>
          <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>~{guide.duration}m</span>
        </div>
      </div>
    </Link>
  )
}
