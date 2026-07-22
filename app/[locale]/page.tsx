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

      <SearchHero locale={locale} onSearch={setSearch} />

      {mode === 'streamer' ? (
        <>
          <BeginnerPath locale={locale} />
          <HighlightSection locale={locale} />
          <SuggestionRow locale={locale} />

          {/* Category filter + grid */}
          <CategoryFilter
            category={category}
            level={level}
            count={filtered.length}
            locale={locale}
            onCategory={setCategory}
            onLevel={setLevel}
          />
          <div className="grid grid-cols-2 gap-2">
            {filtered.map((g) => (
              <GuideCard key={g.id} guide={g} locale={locale} />
            ))}
          </div>

          <DeveloperZone locale={locale} onSwitchMode={() => setMode('developer')} />
        </>
      ) : (
        /* Developer mode */
        <div>
          <div className="mb-3 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
            {locale === 'th' ? 'เอกสาร KICK Public API — ครอบคลุม OAuth 2.1, REST, Webhooks' : 'KICK Public API docs — OAuth 2.1, REST, Webhooks'}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEV_SECTIONS.map((s) => (
              <a
                key={s.title}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all hover:border-[--blue-25]"
                style={{ background: 'var(--surface-page)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="text-[11px] font-medium mb-1" style={{ color: '#cfd8cc' }}>{s.title}</div>
                <div className="flex flex-wrap gap-1">
                  {s.items.map((item) => (
                    <span key={item} className="text-[9px] px-1.5 py-0.5 rounded"
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
