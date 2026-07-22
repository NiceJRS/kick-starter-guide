import Link from 'next/link'
import { IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { guides } from '@/lib/guides'

export default function GuideSidebar({
  locale,
  currentSlug,
  completed,
}: {
  locale: string
  currentSlug: string
  completed: number[]
}) {
  return (
    <div className="w-[180px] flex-shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <Link href={`/${locale}`}
          className="flex items-center gap-1.5 text-[11px] mb-4 transition-colors hover:opacity-80"
          style={{ color: 'var(--text-secondary)' }}>
          <IconArrowLeft size={12} />
          {locale === 'th' ? 'กลับ' : 'Back'}
        </Link>

        <div className="text-[10px] mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {locale === 'th' ? 'บทเรียนนี้' : 'Chapters'}
        </div>

        <div className="space-y-0.5">
          {guides.map((g, i) => {
            const done = completed.includes(g.id)
            const current = g.slug === currentSlug
            return (
              <Link key={g.slug} href={`/${locale}/guide/${g.slug}`}>
                <div
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] transition-all"
                  style={{
                    background: current ? 'var(--kick-green-10)' : 'transparent',
                    color: current ? 'var(--kick-green)' : done ? 'rgba(83,252,24,0.5)' : 'var(--text-muted)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: done ? 'rgba(83,252,24,0.1)' : current ? 'var(--kick-green-10)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${done ? 'rgba(83,252,24,0.3)' : current ? 'var(--kick-green-22)' : 'rgba(255,255,255,0.07)'}`,
                      fontSize: '8px',
                    }}
                  >
                    {done ? <IconCheck size={8} /> : i + 1}
                  </div>
                  <span className="truncate">{locale === 'th' ? g.title.th : g.title.en}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
