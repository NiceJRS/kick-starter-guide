import Link from 'next/link'
import { IconRobot, IconCash, IconBrandDiscord, IconShield, IconShieldCheck, IconVideo, IconSparkles } from '@tabler/icons-react'

const suggestions = [
  { icon: IconShieldCheck,  color: 'var(--amber)',       bg: 'var(--amber-10)',       slug: 'subscription-donation', section: 's8-2', th: 'Verify ตัวตนไม่ผ่าน',   en: 'Failed Verification',    sub: 'Stripe Connect' },
  { icon: IconRobot,        color: 'var(--kick-green)', bg: 'var(--kick-green-10)', slug: 'chatbot',               th: 'บอทตอบ chat อัตโนมัติ', en: 'Auto Chat Bot',          sub: 'Nightbot, BotRix' },
  { icon: IconCash,         color: 'var(--amber)',       bg: 'var(--amber-10)',       slug: 'subscription-donation', th: 'ตั้งรับ Donation ไทย',  en: 'Thai Donation',          sub: 'PromptPay, Wise' },
  { icon: IconBrandDiscord, color: 'var(--blue)',        bg: 'var(--blue-10)',        slug: 'discord-connector',     th: 'แจ้งเตือน Discord',      en: 'Discord Alerts',         sub: 'Live notifications' },
  { icon: IconShield,       color: 'var(--purple)',      bg: 'var(--purple-13)',      slug: 'moderator',             th: 'จัดการ Troll & Spam',    en: 'Troll & Spam Control',  sub: 'Chat rules, Mod' },
  { icon: IconVideo,        color: 'var(--kick-green)', bg: 'var(--kick-green-10)', slug: 'kick-features',         th: 'ตั้งค่า Clip & VOD',     en: 'Clip & VOD Setup',       sub: 'Highlights' },
]

export default function SuggestionRow({ locale }: { locale: string }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-1.5 mb-3 text-base font-medium" style={{ color: 'var(--text-primary)' }}>
        <IconSparkles size={14} style={{ color: 'var(--kick-green)' }} />
        {locale === 'th' ? 'แนะนำตามปัญหาที่พบบ่อย' : 'Common problems solved'}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {suggestions.map((s) => {
          const Icon = s.icon
          return (
            <Link key={s.slug + (s.section ?? '')} href={`/${locale}/guides/${s.slug}${s.section ? '#' + s.section : ''}`} className="flex-shrink-0 w-[148px]">
              <div
                className="p-3 rounded-xl cursor-pointer transition-all h-full"
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,122,10,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLElement).style.transform = '' }}
              >
                <div className="w-7 h-7 rounded-md flex items-center justify-center mb-2.5"
                  style={{ background: s.bg }}>
                  <Icon size={14} style={{ color: s.color }} />
                </div>
                <h4 className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>
                  {locale === 'th' ? s.th : s.en}
                </h4>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.sub}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
