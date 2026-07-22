'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import SearchHero from '@/components/home/SearchHero'
import BeginnerPath from '@/components/home/BeginnerPath'
import HighlightSection from '@/components/home/HighlightSection'
import SuggestionRow from '@/components/home/SuggestionRow'
import CategoryFilter from '@/components/home/CategoryFilter'
import GuideCard from '@/components/home/GuideCard'
import DeveloperZone from '@/components/home/DeveloperZone'
import { guides, type GuideCategory, type GuideLevel } from '@/lib/guides'

const DEV_SECTIONS = [
  { title: 'Getting Started',    items: ['App Setup', 'OAuth 2.1', 'Scopes'],                           url: 'https://docs.kick.com/' },
  { title: 'Users',              items: ['Get User', 'Search Users'],                                   url: 'https://docs.kick.com/' },
  { title: 'Channels',           items: ['Get Channel', 'Update Channel'],                              url: 'https://docs.kick.com/' },
  { title: 'Channel Rewards',    items: ['List Rewards', 'Create Reward'],                              url: 'https://docs.kick.com/' },
  { title: 'Chat',               items: ['Send Message', 'Get Chat History'],                           url: 'https://docs.kick.com/' },
  { title: 'Moderation',         items: ['Ban User', 'Timeout', 'Unban'],                               url: 'https://docs.kick.com/' },
  { title: 'Livestreams',        items: ['Get Stream', 'Stream Info'],                                  url: 'https://docs.kick.com/' },
  { title: 'Public Key',         items: ['Verify Webhooks'],                                            url: 'https://docs.kick.com/' },
  { title: 'KICKs',              items: ['Channel Points', 'Redemptions'],                              url: 'https://docs.kick.com/' },
  { title: 'Events',             items: ['Webhooks', 'Subscribe', 'Payloads'],                          url: 'https://docs.kick.com/' },
]

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8">
      <span
        className="text-[10px] font-semibold tracking-[0.12em] uppercase shrink-0"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
    </div>
  )
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const [mode, setMode] = useState<'streamer' | 'developer'>('streamer')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<GuideCategory | 'All'>('All')
  const [level, setLevel] = useState<GuideLevel | 'All'>('All')

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const title = locale === 'th' ? g.title.th : g.title.en
      const desc = locale === 'th' ? g.description.th : g.description.en
      const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || g.category === category
      const matchLevel = level === 'All' || g.level === level
      return matchSearch && matchCat && matchLevel
    })
  }, [search, category, level, locale])

  return (
    <>
      <Navbar locale={locale} mode={mode} onModeChange={setMode} />

      {mode === 'streamer' ? (
        <>
          {/* Streamer Path — first section */}
          <SectionDivider label={locale === 'th' ? 'เส้นทาง Streamer' : 'Streamer Path'} />
          <BeginnerPath locale={locale} />

          {/* Search */}
          <SectionDivider label={locale === 'th' ? 'ค้นหา' : 'Search'} />
          <SearchHero locale={locale} onSearch={setSearch} />

          {/* Highlights */}
          <SectionDivider label={locale === 'th' ? 'แนะนำ' : 'Featured'} />
          <HighlightSection locale={locale} />

          {/* Suggestions */}
          <SectionDivider label={locale === 'th' ? 'แก้ปัญหา' : 'Quick Fixes'} />
          <SuggestionRow locale={locale} />

          {/* All Guides */}
          <SectionDivider label={locale === 'th' ? 'คู่มือทั้งหมด' : 'All Guides'} />
          <CategoryFilter
            category={category}
            level={level}
            count={filtered.length}
            locale={locale}
            onCategory={setCategory}
            onLevel={setLevel}
          />
          <div className="grid grid-cols-3 gap-3 mt-4">
            {filtered.map((g) => (
              <GuideCard key={g.id} guide={g} locale={locale} />
            ))}
          </div>

          <DeveloperZone locale={locale} onSwitchMode={() => setMode('developer')} />
        </>
      ) : (
        /* Developer mode */
        <div>
          <div className="mb-4 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
            {locale === 'th' ? 'เอกสาร KICK Public API — ครอบคลุม OAuth 2.1, REST, Webhooks' : 'KICK Public API docs — OAuth 2.1, REST, Webhooks'}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {DEV_SECTIONS.map((s) => (
              <a
                key={s.title}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl transition-all hover:border-[--blue-25]"
                style={{ background: 'var(--surface-page)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="text-[12px] font-medium mb-2" style={{ color: '#cfd8cc' }}>{s.title}</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span key={item} className="text-[10px] px-2 py-0.5 rounded"
                      style={{ background: 'var(--blue-10)', color: 'var(--blue)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
