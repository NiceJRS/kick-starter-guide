import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import type { GuideData } from '@/lib/guides'

export default function GuideNav({
  prev,
  next,
  locale,
}: {
  prev: GuideData | null
  next: GuideData | null
  locale: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 mt-8 pt-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      {prev ? (
        <Link href={`/${locale}/guide/${prev.slug}`}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] border transition-all hover:border-white/20"
            style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.07)', color: 'var(--text-secondary)' }}>
            <IconArrowLeft size={13} />
            <span>{locale === 'th' ? prev.title.th : prev.title.en}</span>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link href={`/${locale}/guide/${next.slug}`}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] border transition-all"
            style={{
              background: 'rgba(83,252,24,0.08)',
              borderColor: 'var(--kick-green-22)',
              color: 'var(--kick-green)',
            }}>
            <span>{locale === 'th' ? next.title.th : next.title.en}</span>
            <IconArrowRight size={13} />
          </div>
        </Link>
      ) : <div />}
    </div>
  )
}
