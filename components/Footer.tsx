import Image from 'next/image'

export default function Footer({ locale }: { locale: string }) {
  return (
    <footer
      className="mt-10 pt-6 flex flex-col items-center gap-4 text-xs text-center"
      style={{ borderTop: '1px solid var(--border-default)', color: 'var(--text-muted)' }}
    >
      <Image src="/images/brand/kick-logo.webp" alt="KICK" width={140} height={47} className="w-32 h-auto opacity-90" />

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        <a
          href="https://kick.com/nicejrs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0" style={{ border: '1px solid var(--kick-green-22)' }}>
            <Image src="/images/brand/nicejrs-avatar.jpg" alt="NiceJRS" width={28} height={28} className="w-full h-full object-cover" />
          </div>
          <span>
            {locale === 'th' ? 'ทำโดย ' : 'Made by '}
            <span style={{ color: 'var(--kick-green-text)' }} className="font-semibold">NiceJRS</span>
            {locale === 'th' ? ' · ดูไลฟ์ได้ที่ kick.com/nicejrs' : ' · Watch live at kick.com/nicejrs'}
          </span>
        </a>
        <span className="hidden sm:inline" style={{ color: 'var(--border-strong)' }}>·</span>
        <span>
          © {new Date().getFullYear()} KICK Guide TH — {locale === 'th' ? 'คู่มือชุมชนสำหรับสตรีมเมอร์ไทย' : 'Community guide for Thai streamers'}
        </span>
      </div>
    </footer>
  )
}
