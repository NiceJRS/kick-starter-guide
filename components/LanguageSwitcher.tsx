'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const toggle = () => {
    const next = locale === 'th' ? 'en' : 'th'
    router.push(pathname.replace(`/${locale}`, `/${next}`))
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {locale === 'th' ? 'EN' : 'TH'}
    </Button>
  )
}
