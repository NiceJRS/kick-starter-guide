import Image from 'next/image'
import { IconBroadcast } from '@tabler/icons-react'

export default function Footer({ locale }: { locale: string }) {
  return (
    <footer className="mt-10 pt-6" style={{ borderTop: '1px solid var(--border-default)' }}>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Image src="/images/brand/kick-logo.webp" alt="KICK" width={140} height={47} className="w-20 h-auto opacity-90 shrink-0" />

        <a
          href="https://kick.com/nicejrs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-full font-medium transition-opacity hover:opacity-90 shrink-0"
          style={{ background: 'var(--kick-green)', color: '#fff' }}
        >
          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0" style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
            <Image src="/images/brand/nicejrs-avatar.jpg" alt="NiceJRS" width={24} height={24} className="w-full h-full object-cover" />
          </div>
          <IconBroadcast size={14} />
          {locale === 'th' ? 'ดูไลฟ์ NiceJRS' : 'Watch NiceJRS Live'}
        </a>

        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          KICK Guide TH — {locale === 'th' ? 'คู่มือชุมชนสำหรับสตรีมเมอร์ไทย' : 'Community guide for Thai streamers'}
        </span>
      </div>

      <div className="mt-4 pt-3 text-xs" style={{ borderTop: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} NiceJRS. {locale === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved.'}
      </div>
    </footer>
  )
}
