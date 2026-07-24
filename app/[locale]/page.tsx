'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SearchHero from '@/components/home/SearchHero'
import HighlightSection from '@/components/home/HighlightSection'
import SuggestionRow from '@/components/home/SuggestionRow'
import DeveloperZone from '@/components/home/DeveloperZone'
import { IconMap2, IconBook, IconChevronRight } from '@tabler/icons-react'

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8">
      <span className="text-[10px] font-semibold tracking-[0.12em] uppercase shrink-0"
        style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
    </div>
  )
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const [mode, setMode] = useState<'streamer' | 'developer'>('streamer')

  const handleModeChange = (m: 'streamer' | 'developer') => {
    if (m === 'developer') {
      window.open('https://docs.kick.com/', '_blank', 'noopener,noreferrer')
      return
    }
    setMode(m)
  }

  return (
    <>
      <Navbar locale={locale} mode={mode} onModeChange={handleModeChange} />

      {/* Two main nav cards */}
      <div className="grid grid-cols-2 gap-3 mb-2 mt-2">
        {/* Streamer Path card */}
        <Link href={`/${locale}/path`}>
          <div
            className="relative flex flex-col gap-2 p-4 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg overflow-hidden"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--purple-28)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--purple)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--purple-28)')}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'linear-gradient(135deg, var(--purple-13) 0%, transparent 60%)' }}
            />
            <div className="relative flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--purple-13)', border: '1px solid var(--purple-28)' }}>
                <IconMap2 size={18} style={{ color: 'var(--purple)' }} />
              </div>
              <IconChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div className="relative">
              <div className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                {locale === 'th' ? 'เส้นทาง Streamer' : 'Stream Path'}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th'
                  ? 'มือใหม่ใช่ไหม? เริ่ม Setup Stream กันเลย!'
                  : "New here? Let's get your stream set up!"}
              </div>
            </div>
            <div className="relative flex items-center gap-1.5 mt-1">
              {['⭐ Starter', 'Amateur', 'Pro'].map((s, i) => (
                <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: i === 0 ? 'var(--kick-green-bg)' : 'var(--surface-card2)',
                    color: i === 0 ? 'var(--kick-green-text)' : 'var(--text-muted)',
                    border: `1px solid ${i === 0 ? 'var(--kick-green-22)' : 'var(--border-strong)'}`,
                  }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Guidebook card */}
        <Link href={`/${locale}/guides`}>
          <div
            className="relative flex flex-col gap-2 p-4 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg overflow-hidden"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--kick-green-22)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--kick-green)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--kick-green-22)')}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'linear-gradient(135deg, var(--kick-green-10) 0%, transparent 60%)' }}
            />
            <div className="relative flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--kick-green-10)', border: '1px solid var(--kick-green-22)' }}>
                <IconBook size={18} style={{ color: 'var(--kick-green)' }} />
              </div>
              <IconChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div className="relative">
              <div className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                {locale === 'th' ? 'คู่มือทั้งหมด' : 'Full Guidebook'}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th'
                  ? 'เนื้อหาครบทุกหัวข้อ ตั้งแต่เริ่มต้นจนถึงขั้นโปร'
                  : 'Complete reference covering all topics from beginner to pro'}
              </div>
            </div>
            <div className="relative flex items-center gap-1.5 mt-1">
              {['Setup', 'Chat', 'Bot', 'Money'].map((s) => (
                <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: 'var(--kick-green-10)',
                    color: 'var(--kick-green-text)',
                    border: '1px solid var(--kick-green-22)',
                  }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>

      {/* Search */}
      <SectionDivider label={locale === 'th' ? 'ค้นหา' : 'Search'} />
      <SearchHero locale={locale} />

      {/* Highlights */}
      <section id="featured" style={{ scrollMarginTop: '80px' }}>
        <SectionDivider label={locale === 'th' ? 'แนะนำ' : 'Featured'} />
        <HighlightSection locale={locale} />
      </section>

      {/* Suggestions */}
      <SectionDivider label={locale === 'th' ? 'แก้ปัญหา' : 'Quick Fixes'} />
      <SuggestionRow locale={locale} />

      <DeveloperZone locale={locale} />
    </>
  )
}
