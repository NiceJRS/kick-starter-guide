'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import ModeTab from '@/components/home/ModeTab'

type Mode = 'streamer' | 'developer'

const NAV_LINKS = {
  th: [
    { label: 'Setup Stream', href: 'PATH' },
    { label: 'แนะนำ', href: '#featured' },
    { label: 'คู่มือ', href: 'GUIDES' },
  ],
  en: [
    { label: 'Path', href: 'PATH' },
    { label: 'Featured', href: '#featured' },
    { label: 'Guides', href: 'GUIDES' },
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
  const isHome = !pathname.includes('/guides/') && !pathname.includes('/path/')

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
          className="w-8 h-8 rounded-lg overflow-hidden shrink-0"
          style={{ border: '1px solid var(--kick-green-22)' }}
        >
          <Image src="/images/brand/nicejrs-avatar.jpg" alt="NiceJRS" width={32} height={32} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-[14px] font-semibold leading-tight" style={{ color: 'var(--kick-green-text)' }}>
            KICK Guide TH
          </div>
          <a
            href="https://kick.com/nicejrs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] hover:underline"
            style={{ color: 'var(--text-muted)' }}
          >
            By NiceJRS · Community Guide
          </a>
        </div>
      </div>

      {/* Center: section links (home streamer) */}
      {isHome && mode === 'streamer' ? (
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const href = l.href === 'GUIDES' ? `/${locale}/guides`
              : l.href === 'PATH' ? `/${locale}/path`
              : l.href
            return (
              <a
                key={l.href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-[--surface-card2] hover:text-[--text-primary]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {l.label}
              </a>
            )
          })}
        </div>
      ) : null}

      <ModeTab mode={mode} onChange={onModeChange} />

      {/* Right: locale toggle only */}
      <div className="flex items-center">
        <button
          onClick={toggleLocale}
          className="px-4 py-1.5 rounded-lg text-[12px] font-medium border transition-all hover:bg-[--kick-green-10] hover:border-[--kick-green-22] hover:text-[--kick-green]"
          style={{
            background: 'var(--surface-card2)',
            borderColor: 'var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        >
          {locale === 'th' ? 'EN' : 'TH'}
        </button>
      </div>
    </nav>
  )
}
