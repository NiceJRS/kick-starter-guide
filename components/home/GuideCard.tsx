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
        className="rounded-xl cursor-pointer transition-all duration-200 h-full hover:-translate-y-0.5 hover:shadow-md overflow-hidden"
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(30,122,10,0.3)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
      >
        {/* Cover gradient accent */}
        <div
          className="h-10 w-full flex items-center px-3.5 gap-2"
          style={{ background: `linear-gradient(135deg, ${bg} 0%, transparent 100%)` }}
        >
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: bg }}>
            <Icon size={13} style={{ color: fg }} />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: fg }}>
            #{guide.id}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            {guide.showInHighlight && (
              <span title="Highlight" style={{ color: '#facc15', fontSize: 11, lineHeight: 1 }}>⭐</span>
            )}
            <LevelBadge level={guide.level} locale={locale} />
          </div>
        </div>

        <div className="p-3.5 pt-2.5">

        {/* Text */}
        <h3 className="text-base font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
          {locale === 'th' ? guide.title.th : guide.title.en}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {locale === 'th' ? guide.description.th : guide.description.en}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-3 pt-2.5"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {CATEGORY_LABELS[guide.category]}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>~{guide.duration}m</span>
        </div>
        </div>
      </div>
    </Link>
  )
}
