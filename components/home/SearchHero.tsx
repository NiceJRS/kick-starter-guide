'use client'

import { useState } from 'react'
import { IconSearch, IconRocket } from '@tabler/icons-react'

const QUICK_TAGS = ['OBS ตั้งค่า', 'Nightbot', 'รับ donation', 'Discord bot', 'Stream key', 'VOD คลิป', 'Chatbot command']

export default function SearchHero({
  locale,
  onSearch,
}: {
  locale: string
  onSearch: (q: string) => void
}) {
  const [query, setQuery] = useState('')

  const submit = (q: string) => {
    setQuery(q)
    onSearch(q)
  }

  return (
    <div
      className="rounded-xl p-5 text-center mb-3"
      style={{ background: 'var(--surface-page)', border: '0.5px solid var(--kick-green-22)' }}
    >
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-1 mb-2">
        <IconRocket size={10} style={{ color: 'var(--kick-green)' }} />
        <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: 'var(--kick-green)' }}>
          {locale === 'th' ? 'คู่มือสตรีมเมอร์ไทย' : 'Thai Streamer Guide'}
        </span>
      </div>

      {/* Heading */}
      <h1 className="mb-4" style={{ color: '#cfd8cc' }}>
        {locale === 'th' ? (
          <>มีปัญหาอะไร <span style={{ color: 'var(--kick-green)' }}>ค้นหาได้เลย</span></>
        ) : (
          <>Got questions? <span style={{ color: 'var(--kick-green)' }}>Search here</span></>
        )}
      </h1>

      {/* Search input */}
      <div className="flex gap-2 max-w-[500px] mx-auto mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit(query)}
          placeholder={locale === 'th' ? 'ค้นหา...' : 'Search guides...'}
          className="flex-1 h-10 px-3 rounded-lg text-[13px] outline-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--kick-green-22)',
            color: '#cfd8cc',
          }}
        />
        <button
          onClick={() => submit(query)}
          className="h-10 px-4 rounded-lg flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-90"
          style={{ background: 'var(--kick-green)', color: 'var(--surface-page)' }}
        >
          <IconSearch size={14} />
          {locale === 'th' ? 'ค้นหา' : 'Search'}
        </button>
      </div>

      {/* Quick tags */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => submit(tag)}
            className="px-2.5 py-1 rounded-full text-[11px] border transition-all hover:bg-[--kick-green-10] hover:border-[--kick-green-22] hover:text-[--kick-green]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.10)',
              color: '#8fa895',
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
