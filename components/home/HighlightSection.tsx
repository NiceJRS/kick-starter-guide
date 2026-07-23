import Link from 'next/link'
import {
  IconDeviceDesktop, IconRobot, IconCash,
  IconStar, IconArrowRight
} from '@tabler/icons-react'
import LevelBadge from '@/components/shared/LevelBadge'

export default function HighlightSection({ locale }: { locale: string }) {
  return (
    <div className="mb-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-base font-medium" style={{ color: 'var(--text-primary)' }}>
          <IconStar size={14} style={{ color: 'var(--kick-green)' }} />
          Highlights
        </div>
        <Link href={`/${locale}`} className="text-sm flex items-center gap-1 hover:underline"
          style={{ color: 'var(--text-secondary)' }}>
          {locale === 'th' ? 'ดูทั้งหมด' : 'View all'} <IconArrowRight size={11} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Featured card */}
        <Link href={`/${locale}/guide/obs-studio`} className="col-span-2">
          <div
            className="relative flex gap-4 p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--kick-green-22)' }}
          >
            <span
              className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'var(--kick-green-text)', color: '#fff' }}
            >
              🔥 {locale === 'th' ? 'มือใหม่ต้องอ่าน' : 'Must read'}
            </span>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--kick-green-10)' }}
            >
              <IconDeviceDesktop size={22} style={{ color: 'var(--kick-green)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                {locale === 'th' ? 'OBS Studio Setup' : 'OBS Studio Setup'}
              </h3>
              <p className="text-sm leading-relaxed mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th'
                  ? 'ติดตั้งและตั้งค่า OBS ให้พร้อมสตรีมบน KICK ใน 30 นาที'
                  : 'Install and configure OBS ready to stream on KICK in 30 minutes'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--kick-green-10)', color: 'var(--kick-green)' }}>OBS</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--kick-green-10)', color: 'var(--kick-green)' }}>Stream Key</span>
                <span className="ml-auto text-sm font-medium px-3 py-1 rounded-lg" style={{ background: 'var(--kick-green-text)', color: '#fff' }}>
                  {locale === 'th' ? 'อ่านเลย →' : 'Read →'}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Small card 1 */}
        <Link href={`/${locale}/guide/chatbot`}>
          <div
            className="relative p-3.5 rounded-xl cursor-pointer transition-all hover:border-[--kick-green-22]"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
          >
            <span className="absolute top-2.5 right-2.5 text-xs px-2 py-0.5 rounded"
              style={{ background: 'var(--amber-10)', color: 'var(--amber)', border: '1px solid var(--amber-25)' }}>
              Bot
            </span>
            <div className="w-8 h-8 rounded-md flex items-center justify-center mb-2.5"
              style={{ background: 'var(--amber-10)' }}>
              <IconRobot size={16} style={{ color: 'var(--amber)' }} />
            </div>
            <h3 className="text-base mb-1" style={{ color: 'var(--text-primary)' }}>CHATBOT Setup</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'th' ? 'Nightbot, BotRix ครบ' : 'Nightbot, BotRix complete'}
            </p>
            <div className="flex items-center justify-between mt-2.5 pt-2.5" style={{ borderTop: '1px solid var(--border-default)' }}>
              <LevelBadge level="intermediate" locale={locale} />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>~25m</span>
            </div>
          </div>
        </Link>

        {/* Small card 2 */}
        <Link href={`/${locale}/guide/subscription-donation`}>
          <div
            className="relative p-3.5 rounded-xl cursor-pointer transition-all hover:border-[--kick-green-22]"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
          >
            <span className="absolute top-2.5 right-2.5 text-xs px-2 py-0.5 rounded"
              style={{ background: 'var(--amber-10)', color: 'var(--amber)', border: '1px solid var(--amber-25)' }}>
              💰
            </span>
            <div className="w-8 h-8 rounded-md flex items-center justify-center mb-2.5"
              style={{ background: 'var(--amber-10)' }}>
              <IconCash size={16} style={{ color: 'var(--amber)' }} />
            </div>
            <h3 className="text-base mb-1" style={{ color: 'var(--text-primary)' }}>
              {locale === 'th' ? 'รับ Donation ไทย' : 'Thai Donation Setup'}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'th' ? 'PromptPay, Wise, PayPal' : 'PromptPay, Wise, PayPal'}
            </p>
            <div className="flex items-center justify-between mt-2.5 pt-2.5" style={{ borderTop: '1px solid var(--border-default)' }}>
              <LevelBadge level="intermediate" locale={locale} />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>~25m</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
