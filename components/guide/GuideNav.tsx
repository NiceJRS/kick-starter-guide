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
      style={{ borderTop: '1px solid var(--border-default)' }}>
      {prev ? (
        <Link href={`/${locale}/guide/${prev.slug}`}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all hover:border-[--border-strong]"
            style={{ background: 'transparent', borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            <IconArrowLeft size={13} />
            <span>{locale === 'th' ? prev.title.th : prev.title.en}</span>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link href={`/${locale}/guide/${next.slug}`}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all"
            style={{
              background: 'var(--kick-green-bg)',
              borderColor: 'var(--kick-green-22)',
              color: 'var(--kick-green-text)',
            }}>
            <span>{locale === 'th' ? next.title.th : next.title.en}</span>
            <IconArrowRight size={13} />
          </div>
        </Link>
      ) : <div />}
    </div>
  )
}
