import Link from 'next/link'
import { IconRobot, IconCash, IconBrandDiscord, IconShield, IconVideo, IconSparkles } from '@tabler/icons-react'

const suggestions = [
  { icon: IconRobot,        color: 'var(--kick-green)', bg: 'var(--kick-green-10)', slug: 'chatbot',               th: 'บอทตอบ chat อัตโนมัติ', en: 'Auto Chat Bot',          sub: 'Nightbot, BotRix' },
  { icon: IconCash,         color: 'var(--amber)',       bg: 'var(--amber-10)',       slug: 'subscription-donation', th: 'ตั้งรับ Donation ไทย',  en: 'Thai Donation',          sub: 'PromptPay, Wise' },
  { icon: IconBrandDiscord, color: 'var(--blue)',        bg: 'var(--blue-10)',        slug: 'discord-connector',     th: 'แจ้งเตือน Discord',      en: 'Discord Alerts',         sub: 'Live notifications' },
  { icon: IconShield,       color: 'var(--purple)',      bg: 'var(--purple-13)',      slug: 'moderator',             th: 'จัดการ Troll & Spam',    en: 'Troll & Spam Control',  sub: 'Chat rules, Mod' },
  { icon: IconVideo,        color: 'var(--kick-green)', bg: 'var(--kick-green-10)', slug: 'kick-features',         th: 'ตั้งค่า Clip & VOD',     en: 'Clip & VOD Setup',       sub: 'Highlights' },
]

export default function SuggestionRow({ locale }: { locale: string }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-1.5 mb-2 text-[12px] font-medium" style={{ color: '#cfd8cc' }}>
        <IconSparkles size={13} style={{ color: 'var(--kick-green)' }} />
        {locale === 'th' ? 'แนะนำตามปัญหาที่พบบ่อย' : 'Common problems solved'}
      </div>
      <div className="flex gap-[7px] overflow-x-auto pb-0.5 scrollbar-hide">
        {suggestions.map((s) => {
          const Icon = s.icon
          return (
            <Link key={s.slug} href={`/${locale}/guide/${s.slug}`} className="flex-shrink-0 w-[132px]">
              <div
                className="p-2.5 rounded-xl cursor-pointer transition-all hover:border-white/20 h-full"
                style={{ background: 'var(--surface-page)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-6 h-6 rounded-md flex items-center justify-center mb-2"
                  style={{ background: s.bg }}>
                  <Icon size={13} style={{ color: s.color }} />
                </div>
                <h4 className="text-[10px] font-medium mb-0.5" style={{ color: '#cfd8cc' }}>
                  {locale === 'th' ? s.th : s.en}
                </h4>
                <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
