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
    <div className="w-[200px] flex-shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <Link href={`/${locale}`}
          className="flex items-center gap-1.5 text-[12px] mb-5 transition-colors hover:opacity-80"
          style={{ color: 'var(--text-secondary)' }}>
          <IconArrowLeft size={13} />
          {locale === 'th' ? 'กลับ' : 'Back'}
        </Link>

        <div className="text-[11px] mb-2.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {locale === 'th' ? 'บทเรียน' : 'Chapters'}
        </div>

        <div className="space-y-1">
          {guides.map((g, i) => {
            const done = completed.includes(g.id)
            const current = g.slug === currentSlug
            return (
              <div key={g.slug}>
                <Link href={`/${locale}/guide/${g.slug}`}>
                  <div
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] transition-all"
                    style={{
                      background: current
                        ? 'var(--kick-green-10)'
                        : done
                        ? 'rgba(83,252,24,0.04)'
                        : 'rgba(255,255,255,0.02)',
                      border: `0.5px solid ${current ? 'rgba(83,252,24,0.25)' : done ? 'rgba(83,252,24,0.12)' : 'rgba(255,255,255,0.05)'}`,
                      color: current ? '#ffffff' : done ? 'rgba(83,252,24,0.7)' : '#6b8870',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]"
                      style={{
                        background: done ? 'rgba(83,252,24,0.1)' : current ? 'var(--kick-green-10)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${done ? 'rgba(83,252,24,0.3)' : current ? 'var(--kick-green-22)' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      {done ? <IconCheck size={9} /> : i + 1}
                    </div>
                    <span className="truncate">{locale === 'th' ? g.title.th : g.title.en}</span>
                  </div>
                </Link>

                {/* Sub-sections — visible only for the current chapter */}
                {current && g.sections.length > 0 && (
                  <div className="mt-1 mb-1 ml-3 pl-2.5 space-y-0.5" style={{ borderLeft: '1px solid rgba(83,252,24,0.15)' }}>
                    {g.sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="block px-2 py-1 rounded text-[11px] transition-colors hover:opacity-80"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {locale === 'th' ? sec.label.th : sec.label.en}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
