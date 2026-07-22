import type { GuideLevel } from '@/lib/guides'

const styles: Record<GuideLevel | 'developer', string> = {
  beginner:     'bg-[--kick-green-10] text-[--kick-green] border border-[--kick-green-22]',
  intermediate: 'bg-[--amber-10] text-[--amber] border border-[--amber-25]',
  pro:          'bg-[--purple-13] text-[--purple] border border-[--purple-28]',
  developer:    'bg-[--blue-10] text-[--blue] border border-[--blue-25]',
}

const labels: Record<GuideLevel | 'developer', { th: string; en: string }> = {
  beginner:     { th: 'มือใหม่', en: 'Beginner' },
  intermediate: { th: 'กลาง', en: 'Intermediate' },
  pro:          { th: 'โปร', en: 'Pro' },
  developer:    { th: 'Dev', en: 'Dev' },
}

export default function LevelBadge({
  level,
  locale = 'en',
}: {
  level: GuideLevel | 'developer'
  locale?: string
}) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium ${styles[level]}`}>
      {locale === 'th' ? labels[level].th : labels[level].en}
    </span>
  )
}
