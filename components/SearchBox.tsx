'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { buildSearchIndex } from '@/lib/search'
import GuideCard from '@/components/GuideCard'
import type { Guide } from 'contentlayer/generated'

export default function SearchBox({ guides, locale }: { guides: Guide[]; locale: string }) {
  const [query, setQuery] = useState('')
  const fuse = buildSearchIndex(guides, locale)

  const results = query.length > 1
    ? fuse.search(query).map((r) => guides.find((g) => g.slug === r.item.slug)!)
    : []

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={locale === 'th' ? 'ค้นหาคู่มือ...' : 'Search guides...'}
        className="w-full max-w-sm"
      />
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full max-w-sm bg-background border rounded-md shadow-lg p-2 space-y-1">
          {results.map((g) => (
            <GuideCard key={g.slug} guide={g} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}
