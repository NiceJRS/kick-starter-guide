'use client'

import { IconRadio } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import ModeTab from '@/components/home/ModeTab'
import XPBar from '@/components/shared/XPBar'

type Mode = 'streamer' | 'developer'

export default function Navbar({
  locale,
  mode,
  onModeChange,
}: {
  locale: string
  mode: Mode
  onModeChange: (m: Mode) => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  const toggleLocale = () => {
    const next = locale === 'th' ? 'en' : 'th'
    router.push(pathname.replace(`/${locale}`, `/${next}`))
  }

  return (
    <nav
      className="flex items-center justify-between px-4 py-2.5 rounded-[10px] mb-4 sticky top-2 z-50"
      style={{ background: 'var(--surface-page)', border: '0.5px solid var(--kick-green-22)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-[26px] h-[26px] rounded-lg flex items-center justify-center"
          style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)' }}>
          <IconRadio size={14} style={{ color: 'var(--kick-green)' }} />
        </div>
        <div>
          <div className="text-[13px] font-medium" style={{ color: 'var(--kick-green)' }}>KICK Guide TH</div>
          <div className="text-[9px]" style={{ color: 'var(--text-muted)' }}>Streamer&apos;s HQ</div>
        </div>
      </div>

      {/* Mode tabs */}
      <ModeTab mode={mode} onChange={onModeChange} />

      {/* Right: locale + XP */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLocale}
          className="px-2 py-1 rounded-md text-[11px] border transition-colors hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}
        >
          {locale === 'th' ? 'EN' : 'TH'}
        </button>
        <XPBar />
      </div>
    </nav>
  )
}
