# Claude Code Prompt — Refactor: User Flow, Page Tree & Master Topic Architecture

> Paste this entire file into Claude Code to execute the refactor.
> Read all referenced project files before starting: `claude-code-handoff.md`, `content-intake-template.md`, `kick-guide-chapters.md`

---

## Problem Summary

1. `/th/guides` and `/th/path` both link to the same `/th/guide/{slug}` page — they MUST be separate pages with separate routes
2. Topics need flags to control where they appear (Streamer Path, Highlight, Most Popular Issue)
3. Main Page needs routing to both Guidebook and Stream Path with updated Thai copy
4. Sidebar/navigation must differ between Guidebook and Stream Path
5. Topics must NOT cross-link between Guidebook and Streamer Path

---

## STEP 1 — Extend MDX Frontmatter Schema (Master Topic)

Update `contentlayer.config.ts` — add these four display-flag fields to the `Guide` document type:

```typescript
show_on_streamer_path: { type: 'boolean', default: false },
show_on_highlight:     { type: 'boolean', default: false },
show_on_popular:       { type: 'boolean', default: false },
streamer_path_order:   { type: 'number',  default: 999 },
```

Then update ALL existing MDX files (both `content/th/` and `content/en/`) to include these flags in their frontmatter.

Apply these values:

| Slug | show_on_streamer_path | streamer_path_order | show_on_highlight | show_on_popular |
|---|---|---|---|---|
| account-setup | true | 1 | true | true |
| obs-studio | true | 2 | true | false |
| kick-features | false | 999 | false | false |
| chat-restrictions | false | 999 | false | true |
| chatbot | false | 999 | false | true |
| moderator | false | 999 | false | false |
| discord-connector | false | 999 | false | false |
| subscription-donation | false | 999 | true | false |
| api-connector | false | 999 | false | false |

---

## STEP 2 — New Page Tree (DO NOT REUSE PAGES)

Create these routes. Each is a completely independent page. No shared `[slug]` page between them.

```
app/[locale]/
├── page.tsx                              ← Main Page (updated)
├── guides/
│   ├── page.tsx                          ← Guidebook index (all topics, category sidebar)
│   └── [slug]/
│       └── page.tsx                      ← Guidebook topic detail page
└── path/
    ├── page.tsx                          ← Stream Path index
    └── [slug]/
        └── page.tsx                      ← Stream Path topic detail page
```

Rules:
- `/guides/[slug]` and `/path/[slug]` are completely separate Next.js pages
- `/path/[slug]` only renders guides where `show_on_streamer_path: true`
- `/guides/[slug]` renders all guides
- No redirect or shared component that merges these two routes
- Each page has its own breadcrumb that reflects its origin route

---

## STEP 3 — Update Main Page (`app/[locale]/page.tsx`)

Replace the current homepage content with two prominent entry-point cards side by side:

**Card 1 — Guidebook**
- Thai label: `"คู่มือทั้งหมด"`
- English label: `"Full Guidebook"`
- Thai description: `"เนื้อหาครบทุกหัวข้อ ตั้งแต่เริ่มต้นจนถึงขั้นโปร"`
- English description: `"Complete reference covering all topics from beginner to pro"`
- Link: `/${locale}/guides`

**Card 2 — Stream Path**
- Thai label: `"เส้นทาง Streamer"`
- English label: `"Stream Path"`
- Thai tagline: `"มือใหม่ใช่ไหม? เริ่ม Setup Stream กันเลย!"`
- English tagline: `"New here? Let's get your stream set up!"`
- Link: `/${locale}/path`

Keep the site title/subtitle above the two cards. Both cards must be visually distinct and prominent (large click target, icon or emoji, brief description).

---

## STEP 4 — Guidebook Index Page (`app/[locale]/guides/page.tsx`)

- Show ALL guides from contentlayer, sorted by `number` ascending
- Include `SearchBox` component — search results must link to `/[locale]/guides/[slug]`
- Left sidebar: category navigation grouped by **topic/feature area** (NOT by skill level)

### Sidebar Category Structure

```
🚀 เริ่มต้น / Getting Started
  ├── Account & Channel Setup      (account-setup)
  └── OBS Studio Setup             (obs-studio)

🎮 ฟีเจอร์ KICK / KICK Features
  ├── KICK Features                (kick-features)
  └── Discord Connector            (discord-connector)

💬 Chat & Community
  ├── Chat & Restrictions          (chat-restrictions)
  ├── CHATBOT                      (chatbot)
  └── Moderator                    (moderator)

💰 รายได้ / Monetization
  └── Subscription & Donation Fees (subscription-donation)

⚙️ Advanced / Developer
  └── API Connector                (api-connector)
```

Add a `sidebar_category` field to the MDX frontmatter schema in `contentlayer.config.ts`:

```typescript
sidebar_category: {
  type: 'enum',
  options: ['getting-started', 'kick-features', 'chat-community', 'monetization', 'advanced'],
  required: true,
}
```

Apply these `sidebar_category` values to ALL MDX files (both `content/th/` and `content/en/`):

| Slug | sidebar_category |
|---|---|
| account-setup | getting-started |
| obs-studio | getting-started |
| kick-features | kick-features |
| discord-connector | kick-features |
| chat-restrictions | chat-community |
| chatbot | chat-community |
| moderator | chat-community |
| subscription-donation | monetization |
| api-connector | advanced |

The sidebar category labels must be bilingual. Define them in `messages/th.json` and `messages/en.json`:

```json
// messages/th.json — add under "sidebar"
"sidebar": {
  "getting-started": "🚀 เริ่มต้น",
  "kick-features": "🎮 ฟีเจอร์ KICK",
  "chat-community": "💬 Chat & ชุมชน",
  "monetization": "💰 รายได้",
  "advanced": "⚙️ ขั้นสูง"
}

// messages/en.json — add under "sidebar"
"sidebar": {
  "getting-started": "🚀 Getting Started",
  "kick-features": "🎮 KICK Features",
  "chat-community": "💬 Chat & Community",
  "monetization": "💰 Monetization",
  "advanced": "⚙️ Advanced"
}
```

Create a reusable `components/GuideSidebar.tsx` component that:
- Reads all guides and groups them by `sidebar_category`
- Renders each category as a collapsible section header
- Lists topic titles as clickable links inside each section
- Highlights the currently active slug
- Default state: all sections expanded; active section always expanded
- On mobile: collapses into a drawer/sheet (use shadcn `Sheet` component)

Reference design for sidebar style: https://guildbook-taletown.whatspaceth.com/th/home

### Typography & Color — IMPORTANT

The current sidebar text is too small and low-contrast — it blends into the background. Fix by applying these exact Tailwind classes. Do NOT use `text-muted-foreground` or any `text-gray-*` on sidebar text.

**Category header** (e.g. "⚙️ การติดตั้ง"):
```tsx
<span className="text-sm font-bold uppercase tracking-wide text-foreground">
```

**Topic title link** (e.g. "สมัครและตั้งค่าช่อง"):
```tsx
// default
<a className="block text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent rounded px-2 py-1.5 transition-colors">
// active
<a className="block text-sm font-semibold text-primary bg-primary/10 rounded px-2 py-1.5">
```

**Sub-topic link** (e.g. "1.1 สมัครบัญชีและความปลอดภัย"):
```tsx
// default
<a className="block text-sm text-foreground/70 hover:text-foreground hover:bg-accent rounded px-2 py-1 pl-4 transition-colors">
// active
<a className="block text-sm font-medium text-primary bg-primary/10 rounded px-2 py-1 pl-4">
```

**Category badge** (topic count, e.g. "3"):
```tsx
<span className="ml-auto text-xs font-bold text-foreground bg-muted px-1.5 py-0.5 rounded-full">
```

**Divider between categories:**
```tsx
<div className="my-3 border-t border-border" />
```

Keep the existing sidebar structure, grouping, and logic as-is. Only update these Tailwind class names — do not change routing, data fetching, or component structure.

Layout: two-column on desktop (sidebar left ~260px, content right), single column on mobile.

---

## STEP 5 — Guidebook Detail Page (`app/[locale]/guides/[slug]/page.tsx`)

```typescript
// generateStaticParams: use ALL guides (no filter)
// If slug not found → notFound()
// Breadcrumb: Home > Guidebook > {title}
// "Back" link → /${locale}/guides
// Sidebar: <GuideSidebar> component (same component used on index page, same links, same grouping)
// All internal "next chapter" / "related" links → /[locale]/guides/[slug]
```

This page must NEVER link to `/path/`.

---

## STEP 6 — Stream Path Index Page (`app/[locale]/path/page.tsx`)

Filter: only guides where `show_on_streamer_path === true`, sorted by `streamer_path_order` ascending.

Layout:

```
Section 1 — "เริ่มต้น Stream" / "Start Streaming" (required steps)
  → Chapter 1: Account & Channel Setup   [large card, required badge]
  → Chapter 2: OBS Studio Setup          [large card, required badge]

Section 2 — "ขั้นต่อไป" / "Level Up" (optional, show_on_streamer_path but order > 2)
  → any additional flagged chapters shown here as smaller cards
```

Use the existing sidebar (as-is from current implementation, no redesign needed here).
No search box on this page.

---

## STEP 7 — Stream Path Detail Page (`app/[locale]/path/[slug]/page.tsx`)

```typescript
// generateStaticParams: ONLY guides where show_on_streamer_path === true
// If slug not in streamer path → notFound()
// Breadcrumb: Home > Stream Path > {title}
// "Back" link → /${locale}/path
// Sidebar: streamer path sidebar (only show_on_streamer_path chapters, sorted by streamer_path_order)
// All internal "next chapter" links → /[locale]/path/[slug]
```

This page must NEVER link to `/guides/`.

---

## STEP 8 — Delete Old Route

**DELETE** the entire directory: `app/[locale]/guide/` (with the old `[slug]/page.tsx` inside it).

Do NOT create a redirect. If accessed, it should 404.

---

## STEP 9 — Update GuideCard Component

Add a `basePath` prop so the card generates the correct href based on its context:

```typescript
// components/GuideCard.tsx
interface GuideCardProps {
  guide: Guide
  locale: string
  basePath: 'guides' | 'path'   // NEW required prop
}

export default function GuideCard({ guide, locale, basePath }: GuideCardProps) {
  const href = `/${locale}/${basePath}/${guide.slug}`
  // rest unchanged
}
```

Update every usage of `<GuideCard>` across all pages to pass the correct `basePath`:
- Used inside `app/[locale]/guides/` → `basePath="guides"`
- Used inside `app/[locale]/path/` → `basePath="path"`
- Used in `SearchBox` on Guidebook pages → `basePath="guides"`

---

## STEP 10 — Update Checklist.md

Replace the Checklist.md table with:

```markdown
# Chapter Build Checklist

| # | Slug | streamer_path | highlight | popular | TH Content | EN Content | Build Verified |
|---|---|---|---|---|---|---|---|
| 1 | account-setup       | ✅ | ✅ | ✅ | ⬜ | ⬜ | ⬜ |
| 2 | obs-studio          | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| 3 | kick-features       | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 4 | chat-restrictions   | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ |
| 5 | chatbot             | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ |
| 6 | moderator           | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 7 | discord-connector   | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 8 | subscription-donation | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| 9 | api-connector       | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## Flag Key
- streamer_path = show_on_streamer_path
- highlight = show_on_highlight
- popular = show_on_popular
```

---

## STEP 11 — Verify

Run:
```bash
npm run build
```

Confirm all of the following before marking done:

- [ ] `/th/guides` loads all 9 topics with category sidebar and search
- [ ] `/th/guides/account-setup` renders with breadcrumb "Home > Guidebook > ..."
- [ ] `/th/guides/account-setup` does NOT have any link pointing to `/path/`
- [ ] `/th/path` loads only chapters 1 and 2 in "Start Streaming" section
- [ ] `/th/path/account-setup` renders with breadcrumb "Home > Stream Path > ..."
- [ ] `/th/path/account-setup` does NOT have any link pointing to `/guides/`
- [ ] `/th/path/kick-features` returns 404 (not flagged for streamer path)
- [ ] `/th/guide/account-setup` returns 404 (old route deleted)
- [ ] Main page `/th` shows two cards: "คู่มือทั้งหมด" and "เส้นทาง Streamer"
- [ ] Stream Path card tagline reads: "มือใหม่ใช่ไหม? เริ่ม Setup Stream กันเลย!"
- [ ] Build completes with 0 errors

---

## Summary of What Changes

| What | Before | After |
|---|---|---|
| Guide detail route | `/guide/[slug]` (shared) | `/guides/[slug]` and `/path/[slug]` (separate) |
| Guidebook sidebar | Basic list | Category sidebar (Beginner / Intermediate / Pro) |
| Stream Path filter | All chapters | Only `show_on_streamer_path: true` |
| Main page | Guide index | Two entry cards (Guidebook + Stream Path) |
| GuideCard href | Hardcoded `/guide/` | Dynamic via `basePath` prop |
| Topic config | No flags | `show_on_streamer_path`, `show_on_highlight`, `show_on_popular` in MDX frontmatter |
