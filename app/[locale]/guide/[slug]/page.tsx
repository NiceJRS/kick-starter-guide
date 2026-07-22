import { allGuides } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { getMDXComponent } from 'next-contentlayer2/hooks'
import ProgressBar from '@/components/ProgressBar'
import StepChecklist from '@/components/StepChecklist'

export function generateStaticParams() {
  return allGuides.map((g) => ({ locale: g.locale, slug: g.slug }))
}

export default function GuidePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const guide = allGuides.find((g) => g.locale === locale && g.slug === slug)
  if (!guide) notFound()

  const Content = getMDXComponent(guide.body.code)
  const title = locale === 'th' ? guide.title_th : guide.title_en
  const description = locale === 'th' ? guide.description_th : guide.description_en

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ProgressBar slug={guide.slug} />
      <div className="prose prose-neutral dark:prose-invert mt-6">
        <Content components={{ StepChecklist }} />
      </div>
    </main>
  )
}
