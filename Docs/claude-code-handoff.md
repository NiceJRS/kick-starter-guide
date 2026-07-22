# Claude Code Handoff — KICK.com Thai Streamer Guidebook
> Status: 🟡 In Progress (Discovery phase)
> Repo: https://github.com/NiceJRS
> Deploy Target: https://vercel.com/nicejrs-projects
> Last Updated: 2026-07-22

---

## Project Overview

A bilingual (TH/EN) guidebook website for Thai streamers on KICK.com, covering beginner to professional level. Built with Next.js 14 and deployed to Vercel.

---

## Architecture Decisions (ADR)

### ADR-001 — Rendering Strategy
- **Decision:** Next.js 14 App Router + MDX for content
- **Reason:** Static generation, easy content updates, Vercel-native
- **Status:** ✅ Accepted

### ADR-002 — Progress Tracking
- **Decision:** localStorage per guide slug (client-side only)
- **Reason:** Zero backend, no auth needed, LEAN
- **Status:** ✅ Accepted

### ADR-003 — Search
- **Decision:** Fuse.js (client-side fuzzy search)
- **Reason:** No backend, works with static export
- **Status:** ✅ Accepted

### ADR-004 — i18n
- **Decision:** next-intl with /th and /en routes
- **Reason:** Standard Next.js i18n, supports SSG
- **Status:** ✅ Accepted

### ADR-005 — Chatbot Coverage
- **Decision:** KICK built-in bot + Nightbot + BotRix
- **Reason:** Most common bots used by Thai KICK streamers
- **Status:** ✅ Accepted

---

## Domain Map

```
Core Domain
├── guide-progression     ← Beginner → Intermediate → Pro path
├── kick-knowledge        ← KICK-specific rules, fees, API quirks
└── thai-streamer-context ← Local norms, Thai bank payout, language

Generic Domain
├── ui-components         ← Cards, nav, progress bar, breadcrumb
├── mdx-renderer          ← Render .mdx guide files
├── i18n                  ← TH/EN translation layer
└── search-index          ← Fuse.js index builder

Supporting Domain
└── progress-tracker      ← localStorage read/write per guide slug
```

---

## Tech Stack

```
Framework:     Next.js 14 (App Router)
Content:       MDX (@next/mdx or contentlayer)
Styling:       Tailwind CSS + shadcn/ui
i18n:          next-intl
Search:        Fuse.js
Progress:      localStorage (client component)
Deploy:        Vercel (nicejrs-projects)
Repo:          github.com/NiceJRS
```

---

## Folder Structure (Proposed)

```
kick-guide/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    ← Home / guide index
│   │   └── guide/
│   │       └── [slug]/
│   │           └── page.tsx            ← Individual guide page
├── content/
│   ├── th/
│   │   ├── 01-account-setup.mdx
│   │   ├── 02-obs-studio.mdx
│   │   ├── 03-kick-features.mdx
│   │   ├── 04-chat-restrictions.mdx
│   │   ├── 05-chatbot.mdx
│   │   ├── 06-moderator.mdx
│   │   ├── 07-discord-connector.mdx
│   │   ├── 08-subscription-donation.mdx
│   │   └── 09-api-connector.mdx
│   └── en/
│       └── [same files in English]
├── components/
│   ├── GuideCard.tsx
│   ├── ProgressBar.tsx
│   ├── SearchBox.tsx
│   ├── LanguageSwitcher.tsx
│   └── StepChecklist.tsx
├── lib/
│   ├── progress.ts                     ← localStorage helpers
│   └── search.ts                       ← Fuse.js index builder
├── messages/
│   ├── th.json                         ← UI string translations
│   └── en.json
└── public/
    └── images/
```

---

## Design Patterns Used

| Pattern | Where | Why |
|---|---|---|
| Strategy | i18n locale switching | Swap TH/EN content cleanly |
| Repository | content loader (MDX) | Abstract file reading from UI |
| Observer | progress tracker | Update UI when localStorage changes |
| Factory | guide page generator | Generate pages from MDX slugs |

---

## Chapters & Content Status

See: `kick-guide-chapters.md` for full discovery log and content outline.

| # | Chapter (EN) | Status |
|---|---|---|
| 1 | Account & Channel Setup | 🟡 In Progress |
| 2 | OBS Studio Setup | ⬜ Pending |
| 3 | KICK Features | ⬜ Pending |
| 4 | Chat & Restrictions | ⬜ Pending |
| 5 | CHATBOT (KICK/Nightbot/BotRix) | ⬜ Pending |
| 6 | Moderator | ⬜ Pending |
| 7 | Discord Connector | ⬜ Pending |
| 8 | Subscription & Donation Fees | ⬜ Pending |
| 9 | API Connector | ⬜ Pending |

---

## Revised Build Flow

```
1. Claude Code  →  init project + generate Checklist.md
2. Per chapter  →  you + Gemini collect content & screenshots
                   → fill content-intake-template.md
                   → paste to Claude Code: "Build Chapter N from this intake"
3. Claude Code  →  generates MDX + page from intake form
4. Repeat until all 9 chapters done
5. Final pass  →  i18n QA, search index, progress tracker test
```

**Content intake template:** `content-intake-template.md`
**Image convention:** `/public/images/ch{N}/{sectionId}-step{N}-{desc}.png`

---

## Claude Code Prompt (use when ready to build)

### INIT PROMPT (run once to scaffold project)

```
You are building a bilingual (TH/EN) KICK.com streamer guidebook website for Thai streamers.

Repo: https://github.com/NiceJRS
Deploy: Vercel (nicejrs-projects)

Stack:
- Next.js 14 App Router
- MDX for guide content (contentlayer2)
- Tailwind CSS + shadcn/ui
- next-intl for TH/EN i18n (/th and /en routes)
- Fuse.js for client-side search
- localStorage for progress tracking (no auth, no backend)

Architecture:
- LEAN: simple code first, complex only when needed
- Design patterns: Strategy (i18n), Repository (content), Observer (progress), Factory (page gen)
- Static export friendly
- Mobile-first

Task — INIT ONLY (no content yet):
1. Scaffold Next.js 14 project with Tailwind + shadcn/ui
2. Install and configure next-intl (/th and /en routes)
3. Set up contentlayer2 MDX pipeline with this frontmatter schema:
   { number, slug, level, title{th,en}, description{th,en}, estimated_time, prerequisites[] }
4. Create full folder structure (see handoff doc)
5. Build components: GuideCard, ProgressBar, StepChecklist, SearchBox, LanguageSwitcher
6. Implement lib/progress.ts (localStorage, key: kick-guide-progress-{slug})
7. Implement lib/search.ts (Fuse.js, index from MDX frontmatter + first 200 chars)
8. Create Checklist.md at root to track chapter build status
9. Create placeholder MDX files for all 9 chapters (TH + EN) with frontmatter only

DO NOT write chapter content yet. Content comes via intake forms per chapter.
Reference: claude-code-handoff.md and content-intake-template.md
```

### PER-CHAPTER PROMPT (run for each chapter)

```
Build Chapter {N} — {Chapter Title} from the intake form below.

Rules:
- Generate both /content/th/{slug}.mdx and /content/en/{slug}.mdx
- Follow the MDX component structure already in the project (StepCard, ImageCaption, TipBox, WarningBox)
- Images are already placed in /public/images/ch{N}/ — reference by filename only
- Update Checklist.md to mark Chapter {N} as complete
- Run `next build` to verify no errors

[PASTE FILLED content-intake-template.md HERE]
```

---

## Notes for Claude Code

- Keep components small, single responsibility
- MDX files use frontmatter: `title`, `slug`, `level` (beginner/intermediate/pro), `chapter`
- Progress key format: `kick-guide-progress-{slug}` in localStorage
- Search index built from MDX frontmatter + first 200 chars of content
- All UI text goes through next-intl (no hardcoded strings)

---

_This file is updated progressively during the discovery phase. Complete all 9 chapters before handing off to Claude Code._
