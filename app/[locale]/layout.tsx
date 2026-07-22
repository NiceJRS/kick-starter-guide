import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import '../globals.css'

const locales = ['th', 'en']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen" style={{ background: 'var(--surface-page)' }}>
            <div className="max-w-5xl mx-auto px-5 pt-4 pb-12">
              {children}
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
