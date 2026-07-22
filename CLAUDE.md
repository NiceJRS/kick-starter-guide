# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project

Bilingual (TH/EN) guidebook website for Thai streamers on KICK.com. Beginner → Professional progression. Deployed to Vercel via GitHub (NiceJRS).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router |
| Content | MDX via contentlayer2 |
| Styling | Tailwind CSS + shadcn/ui |
| i18n | next-intl (`/th` and `/en` routes) |
| Search | Fuse.js (client-side, static-export-safe) |
| Progress | localStorage, no backend, no auth |
| Deploy | Vercel (nicejrs-projects) |

---

## Commands

```bash
npm run dev          # dev server
npm run build        # production build — run after every chapter to catch errors
npm run lint         # eslint
```

---

## Architecture

### Routing
`app/[locale]/` — all pages live under locale prefix. `[locale]` is either `th` or `en`.  
Guide pages: `app/[locale]/guide/[slug]/page.tsx` — slug matches MDX filename without extension.

### Content Pipeline
MDX files live in `content/th/` and `content/en/`. contentlayer2 reads them and generates typed data at build time.  
Frontmatter schema (required on every MDX file):
```yaml
number: 1
slug: "account-setup"
level: "beginner"          # beginner | intermediate | pro
title: { th: "", en: "" }
description: { th: "", en: "" }
estimated_time: "15 นาที / 15 mins"
prerequisites: []          # slug list
```

### Key Libraries
- `lib/progress.ts` — localStorage helpers. Key format: `kick-guide-progress-{slug}`
- `lib/search.ts` — builds Fuse.js index from MDX frontmatter + first 200 chars of content

### i18n
All UI strings go through next-intl. Translations live in `messages/th.json` and `messages/en.json`. No hardcoded strings in components.

### MDX Components
Guides use these components inside MDX: `StepCard`, `ImageCaption`, `TipBox`, `WarningBox`.

### Images
Convention: `/public/images/ch{N}/{sectionId}-step{N}-{desc}.png`  
Example: `ch1/s1-step1-homepage.png`

---

## Build Flow

1. **INIT** (once): scaffold project, install deps, set up contentlayer2 + next-intl, create placeholder MDX files for all 9 chapters.
2. **Per chapter**: fill `Docs/content-intake-template.md` → paste to Claude Code with "Build Chapter N from this intake form" → Claude generates `content/th/{slug}.mdx` + `content/en/{slug}.mdx`, updates `Checklist.md`.
3. **Final pass**: i18n QA, search index verification, progress tracker test.

---

## Chapter Status

Tracked in `Docs/kick-guide-chapters.md` and `Checklist.md` (root, generated during init).

| # | Slug | Status |
|---|---|---|
| 1 | account-setup | 🟡 In Progress |
| 2 | obs-studio | ⬜ Pending |
| 3 | kick-features | ⬜ Pending |
| 4 | chat-restrictions | ⬜ Pending |
| 5 | chatbot | ⬜ Pending |
| 6 | moderator | ⬜ Pending |
| 7 | discord-connector | ⬜ Pending |
| 8 | subscription-donation | ⬜ Pending |
| 9 | api-connector | ⬜ Pending |

---

## Constraints

- Static export must remain possible — no server-only APIs, no database
- Progress tracking is client-side only (`localStorage`) — never add a backend for this
- Search uses Fuse.js client-side — never switch to server search
- KICK bot coverage: KICK built-in + Nightbot + BotRix only (Chapter 5)
- Payout section must cover Thai bank / Wise / PayPal (Chapter 8)
