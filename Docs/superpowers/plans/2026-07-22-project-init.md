# Project Init Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the full Next.js 14 bilingual KICK.com streamer guidebook with all infrastructure wired up but zero chapter content.

**Architecture:** Next.js 14 App Router under `app/[locale]/` served by next-intl middleware; MDX content loaded at build time via contentlayer2; client-side search and progress tracking via Fuse.js and localStorage respectively — no backend, static-export-compatible.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, next-intl, contentlayer2, Fuse.js

---

## File Map

| File | Responsibility |
|---|---|
| `next.config.mjs` | Enable contentlayer2 + next-intl |
| `contentlayer.config.ts` | MDX schema, frontmatter types |
| `middleware.ts` | next-intl locale detection |
| `i18n.ts` | next-intl config |
| `messages/th.json` | Thai UI strings |
| `messages/en.json` | English UI strings |
| `app/[locale]/layout.tsx` | Root layout with NextIntlClientProvider |
| `app/[locale]/page.tsx` | Homepage — guide index |
| `app/[locale]/guide/[slug]/page.tsx` | Individual guide page |
| `components/GuideCard.tsx` | Card for guide listing |
| `components/ProgressBar.tsx` | Visual progress bar |
| `components/StepChecklist.tsx` | Per-step checkbox (localStorage) |
| `components/SearchBox.tsx` | Fuse.js search input |
| `components/LanguageSwitcher.tsx` | TH/EN toggle |
| `lib/progress.ts` | localStorage read/write helpers |
| `lib/search.ts` | Fuse.js index builder |
| `content/th/*.mdx` | 9 Thai placeholder MDX files |
| `content/en/*.mdx` | 9 English placeholder MDX files |
| `Checklist.md` | Chapter build status tracker |

---

### Task 1: Scaffold Next.js 14 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.js`

- [ ] **Step 1: Create project via CLI**

Run inside `E:\Work-Freelance\kick-starter-guide`:
```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
```
When prompted: use default options, do NOT create a new directory (`.` = current dir).

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```
Expected: `ready - started server on 0.0.0.0:3000` with no errors. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 with TypeScript + Tailwind"
```

---

### Task 2: Install all dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install next-intl contentlayer2 next-contentlayer2 fuse.js @next/mdx
```

- [ ] **Step 2: Install shadcn/ui CLI and init**

```bash
npx shadcn-ui@latest init
```
When prompted: choose Default style, Slate base color, CSS variables = yes.

- [ ] **Step 3: Install shadcn components used in this project**

```bash
npx shadcn-ui@latest add card button badge progress input
```

- [ ] **Step 4: Verify no peer dep errors**

```bash
npm ls 2>&1 | grep -i "peer\|invalid\|unmet" | head -20
```
Expected: empty output or only optional peer warnings.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install next-intl, contentlayer2, fuse.js, shadcn/ui"
```

---

### Task 3: Configure contentlayer2

**Files:**
- Create: `contentlayer.config.ts`
- Modify: `next.config.mjs`

- [ ] **Step 1: Create contentlayer config**

Create `contentlayer.config.ts`:
```typescript
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    number:         { type: 'number',  required: true },
    slug:           { type: 'string',  required: true },
    level:          { type: 'enum', options: ['beginner', 'intermediate', 'pro'], required: true },
    title_th:       { type: 'string',  required: true },
    title_en:       { type: 'string',  required: true },
    description_th: { type: 'string',  required: true },
    description_en: { type: 'string',  required: true },
    estimated_time: { type: 'string',  required: true },
    prerequisites:  { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields: {
    locale: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileDir,  // 'th' or 'en'
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Guide],
})
```

- [ ] **Step 2: Update next.config.mjs to wrap with contentlayer**

Replace `next.config.mjs` content:
```javascript
import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { mdxRs: false },
}

export default withContentlayer(nextConfig)
```

- [ ] **Step 3: Verify contentlayer compiles (needs content files first — skip build, just type-check)**

```bash
npx tsc --noEmit
```
Expected: exits 0 (or only `contentlayer` generated-type warnings).

- [ ] **Step 4: Commit**

```bash
git add contentlayer.config.ts next.config.mjs
git commit -m "chore: configure contentlayer2 MDX pipeline"
```

---

### Task 4: Configure next-intl

**Files:**
- Create: `i18n.ts`, `middleware.ts`, `messages/th.json`, `messages/en.json`

- [ ] **Step 1: Create i18n config**

Create `i18n.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}))
```

- [ ] **Step 2: Create middleware**

Create `middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['th', 'en'],
  defaultLocale: 'th',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

- [ ] **Step 3: Create Thai messages**

Create `messages/th.json`:
```json
{
  "nav": {
    "home": "หน้าแรก",
    "guides": "คู่มือ",
    "search": "ค้นหา"
  },
  "home": {
    "title": "คู่มือ KICK.com สำหรับสตรีมเมอร์ไทย",
    "subtitle": "เริ่มต้นสตรีมบน KICK ตั้งแต่มือใหม่ถึงมืออาชีพ"
  },
  "guide": {
    "level": {
      "beginner": "ผู้เริ่มต้น",
      "intermediate": "ระดับกลาง",
      "pro": "มืออาชีพ"
    },
    "estimatedTime": "เวลาโดยประมาณ",
    "prerequisites": "ต้องทำก่อน",
    "progress": "ความคืบหน้า",
    "markComplete": "ทำเสร็จแล้ว",
    "nextChapter": "บทถัดไป"
  },
  "search": {
    "placeholder": "ค้นหาคู่มือ...",
    "noResults": "ไม่พบผลลัพธ์"
  }
}
```

- [ ] **Step 4: Create English messages**

Create `messages/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "guides": "Guides",
    "search": "Search"
  },
  "home": {
    "title": "KICK.com Guide for Thai Streamers",
    "subtitle": "Start streaming on KICK from beginner to professional"
  },
  "guide": {
    "level": {
      "beginner": "Beginner",
      "intermediate": "Intermediate",
      "pro": "Professional"
    },
    "estimatedTime": "Estimated Time",
    "prerequisites": "Prerequisites",
    "progress": "Progress",
    "markComplete": "Mark Complete",
    "nextChapter": "Next Chapter"
  },
  "search": {
    "placeholder": "Search guides...",
    "noResults": "No results found"
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add i18n.ts middleware.ts messages/
git commit -m "chore: configure next-intl with TH/EN routes"
```

---

### Task 5: Create app layout and pages

**Files:**
- Create: `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `app/[locale]/guide/[slug]/page.tsx`
- Delete: `app/page.tsx`, `app/layout.tsx` (default scaffold files)

- [ ] **Step 1: Remove default scaffold pages**

```bash
rm app/page.tsx app/layout.tsx
```

- [ ] **Step 2: Create root locale layout**

Create `app/[locale]/layout.tsx`:
```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create homepage**

Create `app/[locale]/page.tsx`:
```typescript
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
```

- [ ] **Step 4: Create guide detail page**

Create `app/[locale]/guide/[slug]/page.tsx`:
```typescript
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
```

- [ ] **Step 5: Commit**

```bash
git add app/
git commit -m "feat: add locale layout and guide pages"
```

---

### Task 6: Build lib/progress.ts

**Files:**
- Create: `lib/progress.ts`

- [ ] **Step 1: Write progress helpers**

Create `lib/progress.ts`:
```typescript
const keyFor = (slug: string) => `kick-guide-progress-${slug}`

export function getProgress(slug: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(keyFor(slug)) ?? '[]')
  } catch {
    return []
  }
}

export function markStep(slug: string, stepId: string): void {
  if (typeof window === 'undefined') return
  const current = getProgress(slug)
  if (!current.includes(stepId)) {
    localStorage.setItem(keyFor(slug), JSON.stringify([...current, stepId]))
  }
}

export function unmarkStep(slug: string, stepId: string): void {
  if (typeof window === 'undefined') return
  const current = getProgress(slug)
  localStorage.setItem(keyFor(slug), JSON.stringify(current.filter((id) => id !== stepId)))
}

export function clearProgress(slug: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(keyFor(slug))
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/progress.ts
git commit -m "feat: add localStorage progress helpers"
```

---

### Task 7: Build lib/search.ts

**Files:**
- Create: `lib/search.ts`

- [ ] **Step 1: Write Fuse.js index builder**

Create `lib/search.ts`:
```typescript
import Fuse from 'fuse.js'
import type { Guide } from 'contentlayer/generated'

export type SearchableGuide = {
  slug: string
  title: string
  description: string
  level: string
  excerpt: string
}

export function buildSearchIndex(guides: Guide[], locale: string): Fuse<SearchableGuide> {
  const items: SearchableGuide[] = guides.map((g) => ({
    slug: g.slug,
    title: locale === 'th' ? g.title_th : g.title_en,
    description: locale === 'th' ? g.description_th : g.description_en,
    level: g.level,
    excerpt: g.body.raw.slice(0, 200),
  }))

  return new Fuse(items, {
    keys: ['title', 'description', 'excerpt'],
    threshold: 0.3,
    includeScore: true,
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/search.ts
git commit -m "feat: add Fuse.js search index builder"
```

---

### Task 8: Build components

**Files:**
- Create: `components/GuideCard.tsx`, `components/ProgressBar.tsx`, `components/StepChecklist.tsx`, `components/SearchBox.tsx`, `components/LanguageSwitcher.tsx`

- [ ] **Step 1: GuideCard**

Create `components/GuideCard.tsx`:
```typescript
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
```

- [ ] **Step 2: ProgressBar**

Create `components/ProgressBar.tsx`:
```typescript
'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { getProgress } from '@/lib/progress'

export default function ProgressBar({ slug, totalSteps }: { slug: string; totalSteps?: number }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (!totalSteps) return
    const completed = getProgress(slug).length
    setPct(Math.round((completed / totalSteps) * 100))
  }, [slug, totalSteps])

  if (!totalSteps) return null

  return (
    <div className="my-4">
      <Progress value={pct} className="h-2" />
      <p className="text-xs text-muted-foreground mt-1">{pct}% complete</p>
    </div>
  )
}
```

- [ ] **Step 3: StepChecklist**

Create `components/StepChecklist.tsx`:
```typescript
'use client'

import { useEffect, useState } from 'react'
import { markStep, unmarkStep, getProgress } from '@/lib/progress'

export default function StepChecklist({
  slug,
  stepId,
  children,
}: {
  slug: string
  stepId: string
  children: React.ReactNode
}) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(getProgress(slug).includes(stepId))
  }, [slug, stepId])

  const toggle = () => {
    if (checked) {
      unmarkStep(slug, stepId)
      setChecked(false)
    } else {
      markStep(slug, stepId)
      setChecked(true)
    }
  }

  return (
    <div className="flex items-start gap-3 my-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggle}
        className="mt-1 h-4 w-4 cursor-pointer"
      />
      <div className={checked ? 'line-through text-muted-foreground' : ''}>{children}</div>
    </div>
  )
}
```

- [ ] **Step 4: SearchBox**

Create `components/SearchBox.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { buildSearchIndex } from '@/lib/search'
import GuideCard from '@/components/GuideCard'
import type { Guide } from 'contentlayer/generated'

export default function SearchBox({ guides, locale }: { guides: Guide[]; locale: string }) {
  const [query, setQuery] = useState('')
  const fuse = buildSearchIndex(guides, locale)

  const results = query.length > 1
    ? fuse.search(query).map((r) => guides.find((g) => g.slug === r.item.slug)!)
    : []

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={locale === 'th' ? 'ค้นหาคู่มือ...' : 'Search guides...'}
        className="w-full max-w-sm"
      />
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full max-w-sm bg-background border rounded-md shadow-lg p-2 space-y-1">
          {results.map((g) => (
            <GuideCard key={g.slug} guide={g} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: LanguageSwitcher**

Create `components/LanguageSwitcher.tsx`:
```typescript
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
```

- [ ] **Step 6: Commit**

```bash
git add components/
git commit -m "feat: add GuideCard, ProgressBar, StepChecklist, SearchBox, LanguageSwitcher"
```

---

### Task 9: Create placeholder MDX files

**Files:**
- Create: `content/th/01-account-setup.mdx` through `content/th/09-api-connector.mdx`
- Create: `content/en/01-account-setup.mdx` through `content/en/09-api-connector.mdx`

- [ ] **Step 1: Create content directories**

```bash
mkdir -p content/th content/en
```

- [ ] **Step 2: Create Thai placeholder MDX files**

Create `content/th/01-account-setup.mdx`:
```mdx
---
number: 1
slug: account-setup
level: beginner
title_th: สมัครและตั้งค่าช่อง
title_en: Account & Channel Setup
description_th: วิธีสมัคร KICK และตั้งค่าช่องสตรีมของคุณตั้งแต่เริ่มต้น
description_en: How to create your KICK account and set up your stream channel from scratch
estimated_time: 15 นาที / 15 mins
prerequisites: []
---

{/* Content coming soon — fill via content-intake-template.md */}
```

Create `content/th/02-obs-studio.mdx`:
```mdx
---
number: 2
slug: obs-studio
level: beginner
title_th: OBS Studio
title_en: OBS Studio Setup
description_th: ติดตั้งและตั้งค่า OBS Studio สำหรับสตรีมบน KICK
description_en: Install and configure OBS Studio for streaming on KICK
estimated_time: 20 นาที / 20 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/th/03-kick-features.mdx`:
```mdx
---
number: 3
slug: kick-features
level: beginner
title_th: ฟีเจอร์ KICK
title_en: KICK Features
description_th: Dashboard, Clips, VODs, Channel Points และฟีเจอร์อื่นๆ บน KICK
description_en: Dashboard, Clips, VODs, Channel Points and other KICK features
estimated_time: 20 นาที / 20 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/th/04-chat-restrictions.mdx`:
```mdx
---
number: 4
slug: chat-restrictions
level: beginner
title_th: แชทและการจำกัด
title_en: Chat & Restrictions
description_th: Chat Modes, Banned Words, Link Protection และการจัดการแชท
description_en: Chat Modes, Banned Words, Link Protection and chat management
estimated_time: 15 นาที / 15 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/th/05-chatbot.mdx`:
```mdx
---
number: 5
slug: chatbot
level: intermediate
title_th: CHATBOT
title_en: CHATBOT (KICK / Nightbot / BotRix)
description_th: ตั้งค่า KICK built-in bot, Nightbot และ BotRix
description_en: Set up KICK built-in bot, Nightbot, and BotRix
estimated_time: 30 นาที / 30 mins
prerequisites: [account-setup, kick-features]
---

{/* Content coming soon */}
```

Create `content/th/06-moderator.mdx`:
```mdx
---
number: 6
slug: moderator
level: intermediate
title_th: Moderator
title_en: Moderator
description_th: เพิ่ม Mod, คำสั่ง Mod และการจัดการ Ban/Timeout
description_en: Add moderators, mod commands, and Ban/Timeout management
estimated_time: 15 นาที / 15 mins
prerequisites: [account-setup, chat-restrictions]
---

{/* Content coming soon */}
```

Create `content/th/07-discord-connector.mdx`:
```mdx
---
number: 7
slug: discord-connector
level: intermediate
title_th: Discord Connector
title_en: Discord Connector
description_th: เชื่อมต่อ KICK กับ Discord Server และตั้งค่า Live Notifications
description_en: Connect KICK to Discord Server and set up Live Notifications
estimated_time: 20 นาที / 20 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/th/08-subscription-donation.mdx`:
```mdx
---
number: 8
slug: subscription-donation
level: intermediate
title_th: Subscription & Donation
title_en: Subscription & Donation Fees
description_th: KICK Revenue Share 95/5, Subscription Tiers และการรับเงินสำหรับสตรีมเมอร์ไทย
description_en: KICK 95/5 Revenue Share, Subscription Tiers, and payout setup for Thai streamers
estimated_time: 25 นาที / 25 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/th/09-api-connector.mdx`:
```mdx
---
number: 9
slug: api-connector
level: pro
title_th: API Connector
title_en: API Connector
description_th: KICK API Overview, Webhooks และการ Integrate กับ Third-party
description_en: KICK API Overview, Webhooks, and third-party integrations
estimated_time: 30 นาที / 30 mins
prerequisites: [account-setup, kick-features]
---

{/* Content coming soon */}
```

- [ ] **Step 3: Create English placeholder MDX files**

Create `content/en/01-account-setup.mdx`:
```mdx
---
number: 1
slug: account-setup
level: beginner
title_th: สมัครและตั้งค่าช่อง
title_en: Account & Channel Setup
description_th: วิธีสมัคร KICK และตั้งค่าช่องสตรีมของคุณตั้งแต่เริ่มต้น
description_en: How to create your KICK account and set up your stream channel from scratch
estimated_time: 15 นาที / 15 mins
prerequisites: []
---

{/* Content coming soon — fill via content-intake-template.md */}
```

Create `content/en/02-obs-studio.mdx`:
```mdx
---
number: 2
slug: obs-studio
level: beginner
title_th: OBS Studio
title_en: OBS Studio Setup
description_th: ติดตั้งและตั้งค่า OBS Studio สำหรับสตรีมบน KICK
description_en: Install and configure OBS Studio for streaming on KICK
estimated_time: 20 นาที / 20 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/en/03-kick-features.mdx`:
```mdx
---
number: 3
slug: kick-features
level: beginner
title_th: ฟีเจอร์ KICK
title_en: KICK Features
description_th: Dashboard, Clips, VODs, Channel Points และฟีเจอร์อื่นๆ บน KICK
description_en: Dashboard, Clips, VODs, Channel Points and other KICK features
estimated_time: 20 นาที / 20 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/en/04-chat-restrictions.mdx`:
```mdx
---
number: 4
slug: chat-restrictions
level: beginner
title_th: แชทและการจำกัด
title_en: Chat & Restrictions
description_th: Chat Modes, Banned Words, Link Protection และการจัดการแชท
description_en: Chat Modes, Banned Words, Link Protection and chat management
estimated_time: 15 นาที / 15 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/en/05-chatbot.mdx`:
```mdx
---
number: 5
slug: chatbot
level: intermediate
title_th: CHATBOT
title_en: CHATBOT (KICK / Nightbot / BotRix)
description_th: ตั้งค่า KICK built-in bot, Nightbot และ BotRix
description_en: Set up KICK built-in bot, Nightbot, and BotRix
estimated_time: 30 นาที / 30 mins
prerequisites: [account-setup, kick-features]
---

{/* Content coming soon */}
```

Create `content/en/06-moderator.mdx`:
```mdx
---
number: 6
slug: moderator
level: intermediate
title_th: Moderator
title_en: Moderator
description_th: เพิ่ม Mod, คำสั่ง Mod และการจัดการ Ban/Timeout
description_en: Add moderators, mod commands, and Ban/Timeout management
estimated_time: 15 นาที / 15 mins
prerequisites: [account-setup, chat-restrictions]
---

{/* Content coming soon */}
```

Create `content/en/07-discord-connector.mdx`:
```mdx
---
number: 7
slug: discord-connector
level: intermediate
title_th: Discord Connector
title_en: Discord Connector
description_th: เชื่อมต่อ KICK กับ Discord Server และตั้งค่า Live Notifications
description_en: Connect KICK to Discord Server and set up Live Notifications
estimated_time: 20 นาที / 20 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/en/08-subscription-donation.mdx`:
```mdx
---
number: 8
slug: subscription-donation
level: intermediate
title_th: Subscription & Donation
title_en: Subscription & Donation Fees
description_th: KICK Revenue Share 95/5, Subscription Tiers และการรับเงินสำหรับสตรีมเมอร์ไทย
description_en: KICK 95/5 Revenue Share, Subscription Tiers, and payout setup for Thai streamers
estimated_time: 25 นาที / 25 mins
prerequisites: [account-setup]
---

{/* Content coming soon */}
```

Create `content/en/09-api-connector.mdx`:
```mdx
---
number: 9
slug: api-connector
level: pro
title_th: API Connector
title_en: API Connector
description_th: KICK API Overview, Webhooks และการ Integrate กับ Third-party
description_en: KICK API Overview, Webhooks, and third-party integrations
estimated_time: 30 นาที / 30 mins
prerequisites: [account-setup, kick-features]
---

{/* Content coming soon */}
```

- [ ] **Step 4: Commit**

```bash
git add content/
git commit -m "feat: add 18 placeholder MDX files (9 TH + 9 EN) with frontmatter"
```

---

### Task 10: Create Checklist.md and verify build

**Files:**
- Create: `Checklist.md`

- [ ] **Step 1: Create Checklist.md**

Create `Checklist.md` at project root:
```markdown
# Chapter Build Checklist

| # | Slug | TH Content | EN Content | Build Verified |
|---|---|---|---|---|
| 1 | account-setup | ⬜ | ⬜ | ⬜ |
| 2 | obs-studio | ⬜ | ⬜ | ⬜ |
| 3 | kick-features | ⬜ | ⬜ | ⬜ |
| 4 | chat-restrictions | ⬜ | ⬜ | ⬜ |
| 5 | chatbot | ⬜ | ⬜ | ⬜ |
| 6 | moderator | ⬜ | ⬜ | ⬜ |
| 7 | discord-connector | ⬜ | ⬜ | ⬜ |
| 8 | subscription-donation | ⬜ | ⬜ | ⬜ |
| 9 | api-connector | ⬜ | ⬜ | ⬜ |

## Legend
- ⬜ Pending
- 🟡 In Progress
- ✅ Done

## Commands
- Build chapter N: "Build Chapter N from this intake form" + paste filled content-intake-template.md
- Verify: `npm run build`
- Deploy: push to main → Vercel auto-deploys
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: build completes with 0 errors. Warnings about missing Tailwind classes are OK.

- [ ] **Step 3: Commit everything**

```bash
git add Checklist.md
git commit -m "chore: add Checklist.md and verify production build passes"
```

---

## Self-Review Notes

- All 9 chapters covered in both TH/EN MDX (Task 9) ✓
- contentlayer2 typed fields match what components consume (`title_th`, `title_en`, etc.) ✓
- `lib/progress.ts` SSR-guarded with `typeof window === 'undefined'` check ✓
- `lib/search.ts` uses same locale-aware field access as components ✓
- No placeholder "TBD" content in plan ✓
- Build verification in final task ✓
