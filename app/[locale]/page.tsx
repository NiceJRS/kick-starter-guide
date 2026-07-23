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

  const handleModeChange = (m: 'streamer' | 'developer') => {
    if (m === 'developer') {
      window.open('https://docs.kick.com/', '_blank', 'noopener,noreferrer')
      return
    }
    setMode(m)
  }
  const [category, setCategory] = useState<GuideCategory | 'All'>('All')
  const [level, setLevel] = useState<GuideLevel | 'All'>('All')

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchCat = category === 'All' || g.category === category
      const matchLevel = level === 'All' || g.level === level
      return matchCat && matchLevel
    })
  }, [category, level])

  return (
    <>
      <Navbar locale={locale} mode={mode} onModeChange={handleModeChange} />

      {/* Streamer Path */}
      <section id="path" style={{ scrollMarginTop: '80px' }}>
        <SectionDivider label={locale === 'th' ? 'เส้นทาง Streamer' : 'Streamer Path'} />
        <BeginnerPath locale={locale} />
      </section>

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

        {/* All Guides */}
        <section id="guides" style={{ scrollMarginTop: '80px' }}>
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
        </section>

      <DeveloperZone locale={locale} />
    </>
  )
}
