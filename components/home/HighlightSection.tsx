import Link from 'next/link'
import {
  IconDeviceDesktop, IconRobot, IconCash,
  IconStar, IconArrowRight
} from '@tabler/icons-react'
import LevelBadge from '@/components/shared/LevelBadge'

const HIGHLIGHTS = [
  {
    slug: 'obs-studio',
    section: null,
    featured: true,
    icon: IconDeviceDesktop,
    iconBg: 'var(--kick-green-10)',
    iconColor: 'var(--kick-green)',
    badge: { bg: 'var(--kick-green-text)', color: '#fff', text: { th: '🔥 มือใหม่ต้องอ่าน', en: '🔥 Must read' } },
    title: { th: 'OBS Studio Setup', en: 'OBS Studio Setup' },
    desc: { th: 'ติดตั้งและตั้งค่า OBS ให้พร้อมสตรีมบน KICK ใน 30 นาที', en: 'Install and configure OBS ready to stream on KICK in 30 minutes' },
    tags: ['OBS', 'Stream Key'],
    level: 'beginner' as const,
    duration: 30,
  },
  {
    slug: 'chatbot',
    section: 's5-2',
    featured: false,
    icon: IconRobot,
    iconBg: 'var(--amber-10)',
    iconColor: 'var(--amber)',
    badge: { bg: 'var(--amber-10)', color: 'var(--amber)', text: { th: 'Bot', en: 'Bot' } },
    title: { th: 'ติดตั้ง KickBot', en: 'Install KickBot' },
    desc: { th: 'เชื่อมบอทกับช่องใน 5 นาที', en: 'Connect your bot in 5 min' },
    tags: [],
    level: 'intermediate' as const,
    duration: 10,
  },
  {
    slug: 'subscription-donation',
    section: 's8-3',
    featured: false,
    icon: IconCash,
    iconBg: 'var(--amber-10)',
    iconColor: 'var(--amber)',
    badge: { bg: 'var(--amber-10)', color: 'var(--amber)', text: { th: '💰', en: '💰' } },
    title: { th: 'รับโดเนท PromptPay', en: 'PromptPay Donations' },
    desc: { th: 'รับเงินตรง 100% ไม่โดนหัก', en: '100% revenue, no platform cut' },
    tags: [],
    level: 'intermediate' as const,
    duration: 25,
  },
]

export default function HighlightSection({ locale }: { locale: string }) {
  const featured = HIGHLIGHTS.find((h) => h.featured)!
  const small = HIGHLIGHTS.filter((h) => !h.featured)

  const href = (h: typeof HIGHLIGHTS[0]) =>
    `/${locale}/guides/${h.slug}${h.section ? '#' + h.section : ''}`

  return (
    <div className="mb-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-base font-medium" style={{ color: 'var(--text-primary)' }}>
          <IconStar size={14} style={{ color: 'var(--kick-green)' }} />
          Highlights
        </div>
        <Link href={`/${locale}/guides`} className="text-sm flex items-center gap-1 hover:underline"
          style={{ color: 'var(--text-secondary)' }}>
          {locale === 'th' ? 'ดูทั้งหมด' : 'View all'} <IconArrowRight size={11} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Featured card */}
        <Link href={href(featured)} className="col-span-2">
          <div
            className="relative flex gap-4 p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--kick-green-22)' }}
          >
            <span
              className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: featured.badge.bg, color: featured.badge.color }}
            >
              {locale === 'th' ? featured.badge.text.th : featured.badge.text.en}
            </span>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: featured.iconBg }}
            >
              <featured.icon size={22} style={{ color: featured.iconColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                {locale === 'th' ? featured.title.th : featured.title.en}
              </h3>
              <p className="text-sm leading-relaxed mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th' ? featured.desc.th : featured.desc.en}
              </p>
              <div className="flex items-center gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--kick-green-10)', color: 'var(--kick-green)' }}>{tag}</span>
                ))}
                <span className="ml-auto text-sm font-medium px-3 py-1 rounded-lg" style={{ background: 'var(--kick-green-text)', color: '#fff' }}>
                  {locale === 'th' ? 'อ่านเลย →' : 'Read →'}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Small cards */}
        {small.map((h) => (
          <Link key={h.slug} href={href(h)}>
            <div
              className="relative p-3.5 rounded-xl cursor-pointer transition-all hover:border-[--kick-green-22]"
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
            >
              <span className="absolute top-2.5 right-2.5 text-xs px-2 py-0.5 rounded"
                style={{ background: h.badge.bg, color: h.badge.color, border: '1px solid var(--amber-25)' }}>
                {locale === 'th' ? h.badge.text.th : h.badge.text.en}
              </span>
              <div className="w-8 h-8 rounded-md flex items-center justify-center mb-2.5"
                style={{ background: h.iconBg }}>
                <h.icon size={16} style={{ color: h.iconColor }} />
              </div>
              <h3 className="text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                {locale === 'th' ? h.title.th : h.title.en}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th' ? h.desc.th : h.desc.en}
              </p>
              <div className="flex items-center justify-between mt-2.5 pt-2.5" style={{ borderTop: '1px solid var(--border-default)' }}>
                <LevelBadge level={h.level} locale={locale} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>~{h.duration}m</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
