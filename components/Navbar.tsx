'use client'

import { IconRadio } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import ModeTab from '@/components/home/ModeTab'

type Mode = 'streamer' | 'developer'

const NAV_LINKS = {
  th: [
    { label: 'เส้นทาง', href: '#path' },
    { label: 'แนะนำ', href: '#featured' },
    { label: 'คู่มือ', href: '#guides' },
  ],
  en: [
    { label: 'Path', href: '#path' },
    { label: 'Featured', href: '#featured' },
    { label: 'Guides', href: '#guides' },
  ],
}

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
  const isHome = !pathname.includes('/guide/')

  const toggleLocale = () => {
    const next = locale === 'th' ? 'en' : 'th'
    router.push(pathname.replace(`/${locale}`, `/${next}`))
  }

  const links = locale === 'th' ? NAV_LINKS.th : NAV_LINKS.en

  return (
    <nav
      className="flex items-center justify-between px-5 py-3 rounded-xl mb-6 sticky top-2 z-50"
      style={{ background: 'var(--surface-card)', border: '0.5px solid var(--kick-green-22)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)' }}
        >
          <IconRadio size={16} style={{ color: 'var(--kick-green)' }} />
        </div>
        <div>
          <div className="text-[14px] font-semibold leading-tight" style={{ color: 'var(--kick-green)' }}>
            KICK Guide TH
          </div>
          <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Streamer&apos;s HQ</div>
        </div>
      </div>

      {/* Center: section links (home streamer) */}
      {isHome && mode === 'streamer' ? (
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-white/[0.07] hover:text-[#cfd8cc]"
              style={{ color: '#8fa895' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}

      <ModeTab mode={mode} onChange={onModeChange} />

      {/* Right: locale toggle only */}
      <div className="flex items-center">
        <button
          onClick={toggleLocale}
          className="px-4 py-1.5 rounded-lg text-[12px] font-medium border transition-all hover:bg-[--kick-green-10] hover:border-[--kick-green-22] hover:text-[--kick-green]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.12)',
            color: '#cfd8cc',
          }}
        >
          {locale === 'th' ? 'EN' : 'TH'}
        </button>
      </div>
    </nav>
  )
}
