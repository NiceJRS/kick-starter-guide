import Fuse from 'fuse.js'
import type { Guide } from 'contentlayer/generated'

export type SearchableGuide = {
  slug: string
  title: string
  description: string
  level: string
  excerpt: string
}

export function buildSearchIndex(guides: Guide[], locale: string): Fuse<SearchableGuide> {
  const items: SearchableGuide[] = guides.map((g) => ({
    slug: g.slug,
    title: locale === 'th' ? g.title_th : g.title_en,
    description: locale === 'th' ? g.description_th : g.description_en,
    level: g.level,
    excerpt: g.body.raw.slice(0, 200),
  }))

  return new Fuse(items, {
    keys: ['title', 'description', 'excerpt'],
    threshold: 0.3,
    includeScore: true,
  })
}
