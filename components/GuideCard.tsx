import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Guide } from 'contentlayer/generated'

const levelColor: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  pro: 'bg-red-100 text-red-800',
}

export default function GuideCard({ guide, locale }: { guide: Guide; locale: string }) {
  const title = locale === 'th' ? guide.title_th : guide.title_en
  const description = locale === 'th' ? guide.description_th : guide.description_en

  return (
    <Link href={`/${locale}/guide/${guide.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">#{guide.number}</span>
            <Badge className={levelColor[guide.level]}>{guide.level}</Badge>
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
