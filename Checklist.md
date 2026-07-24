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
| 10 | kickbot-functions  | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 11 | botrix-functions   | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## Flag Key
- streamer_path = show_on_streamer_path
- highlight = show_on_highlight
- popular = show_on_popular

## Legend
- ⬜ Pending
- 🟡 In Progress
- ✅ Done

## Commands
- Build chapter N: "Build Chapter N from this intake form" + paste filled content-intake-template.md
- Verify: `npm run build`
- Deploy: push to main → Vercel auto-deploys
