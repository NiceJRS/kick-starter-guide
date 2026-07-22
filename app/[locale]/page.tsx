import { useTranslations } from 'next-intl'
import { allGuides } from 'contentlayer/generated'
import GuideCard from '@/components/GuideCard'
import SearchBox from '@/components/SearchBox'

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('home')
  const guides = allGuides
    .filter((g) => g.locale === locale)
    .sort((a, b) => a.number - b.number)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-muted-foreground mb-6">{t('subtitle')}</p>
      <SearchBox guides={guides} locale={locale} />
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} locale={locale} />
        ))}
      </div>
    </main>
  )
}
