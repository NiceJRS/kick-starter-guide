import { IconClock, IconUsers } from '@tabler/icons-react'

interface Requirement {
  icon: 'clock' | 'users'
  value: string
  label: { th: string; en: string }
}

const requirements: Requirement[] = [
  { icon: 'clock', value: '5', label: { th: 'ชั่วโมงสตรีมสะสม', en: 'Total Streaming Hours' } },
  { icon: 'users', value: '75', label: { th: 'ผู้ติดตาม', en: 'Followers' } },
]

export default function AffiliateRequirements({ locale = 'en' }: { locale?: string }) {
  return (
    <div className="my-4">
      {/* Header */}
      <p className="text-[12px] mb-3" style={{ color: 'var(--text-secondary)' }}>
        {locale === 'th'
          ? 'เพื่อปลดล็อก Stripe Payout ต้องผ่าน 2 เงื่อนไขนี้:'
          : 'Unlock Stripe payout by meeting both requirements:'}
      </p>

      {/* Requirement cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {requirements.map((req) => (
          <div
            key={req.icon}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl text-center"
            style={{
              background: 'var(--kick-green-10)',
              border: '1px solid var(--kick-green-22)',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(83,252,24,0.12)', border: '1px solid rgba(83,252,24,0.3)' }}
            >
              {req.icon === 'clock'
                ? <IconClock size={18} style={{ color: 'var(--kick-green)' }} />
                : <IconUsers size={18} style={{ color: 'var(--kick-green)' }} />}
            </div>
            <div>
              <div className="text-[22px] font-bold leading-none" style={{ color: 'var(--kick-green)' }}>
                {req.value}
                <span className="text-[12px] font-normal ml-1" style={{ color: 'rgba(83,252,24,0.7)' }}>
                  {req.icon === 'clock'
                    ? (locale === 'th' ? 'ชม.' : 'hrs')
                    : (locale === 'th' ? 'คน' : 'followers')}
                </span>
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th' ? req.label.th : req.label.en}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue split highlight */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="text-center flex-shrink-0">
          <div className="text-[20px] font-bold" style={{ color: 'var(--kick-green)' }}>95%</div>
          <div className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            {locale === 'th' ? 'ส่วนแบ่ง' : 'Your cut'}
          </div>
        </div>
        <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {locale === 'th'
            ? 'คุณได้รับ 95% ของทุก Sub ($4.75 จาก $5) และ KICK รับภาระค่า FX 1.5% ของ Stripe ให้ทั้งหมด'
            : 'Keep 95% of every Sub ($4.75 per $5). KICK covers Stripe\'s 1.5% FX fee — no deductions for Thai streamers.'}
        </div>
      </div>

      <p className="text-[12px] mt-4 mb-1 font-medium" style={{ color: '#cfd8cc' }}>
        {locale === 'th' ? 'เมื่อผ่านเงื่อนไขแล้ว:' : 'Once you qualify:'}
      </p>
    </div>
  )
}
