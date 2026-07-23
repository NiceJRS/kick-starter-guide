# Image Checklist

Images needed per chapter. Path convention: `public/images/ch{N}/{filename}`

---

## Chapter 1 — Account Setup (`public/images/ch1/`)

| File | Description | Status |
|------|-------------|--------|
| `1_1_0_signup.jpg` | KICK signup page | ✅ Done |
| `1_1_1_email_verify_otp.jpg` | Email OTP verification screen | ✅ Done |
| `1_1_2_profile_setting_activate_2fa_page.jpg` | 2FA settings page | ✅ Done |
| `1_1_3_application_google_authenticator.jpg` | Google Authenticator app | ✅ Done |
| `1_1_4_verify_2fa_scan_qr_code.jpg` | Scan QR code in Authenticator | ✅ Done |
| `1_1_5_verify_2fa_success.jpg` | 2FA success confirmation | ✅ Done |
| `1_2_0_profile_setting.jpg` | Profile settings overview | ✅ Done |
| `1_2_1_change_avatar.jpg` | Upload profile avatar | ✅ Done |
| `1_2_2_change_banner.jpg` | Upload channel banner | ✅ Done |
| `1_2_3_update_bio.jpg` | Edit bio / channel description | ✅ Done |
| `1_2_4_social_link.jpg` | Add social media links | ✅ Done |
| `1_3_0_creator_dashboard.jpg` | Creator Dashboard home | ✅ Done |
| `1_3_1_stream_key_page.jpg` | Stream Key settings page | ✅ Done |
| `1_3_2_click_show_stream_url_need_f2a.jpg` | Show Stream URL (2FA required prompt) | ✅ Done |
| `1_3_3_obs_studio_add_stream_key.jpg` | OBS Studio stream key input | ✅ Done |

---

## Chapter 2 — OBS Studio Setup (`public/images/ch2/`)

Referenced in `content/th/02-obs-studio.mdx` and `content/en/02-obs-studio.mdx`.

| File | Description | Used in MDX | Status |
|------|-------------|-------------|--------|
| `s2_1_step1_obs_download.jpg` | OBS download page at obsproject.com | StepCard 1 ImageCaption | ⬜ Needed |
| `s2_2_step2_output_settings.jpg` | OBS Advanced Output + bitrate settings | StepCard 3 ImageCaption | ⬜ Needed |
| `s2_3_step4_scene_sources.jpg` | OBS Scenes + Sources panel layout | StepCard 4 ImageCaption | ⬜ Needed |
| `s2_4_step6_connect_kick.jpg` | OBS Custom stream settings with KICK RTMP | StepCard 6 ImageCaption | ⬜ Needed |

**Notes for Ch2 screenshots:**
- OBS version: latest stable (7.x)
- OS: Windows recommended (most Thai streamers use Windows)
- For `s2_2_step2_output_settings.jpg`: show Settings → Output → Advanced tab with Encoder dropdown visible
- For `s2_4_step6_connect_kick.jpg`: show Settings → Stream → Service: Custom, Server and Stream Key fields filled (blur/mask the actual Stream Key value)

---

## Chapter 3 — KICK Features (`public/images/ch3/`)

Referenced in `content/th/03-kick-features.mdx` and `content/en/03-kick-features.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s3_1_step1_dashboard_overview.jpg` | Full Creator Dashboard — all 4 panels visible (Stream Preview, Activity Feed, Chat Dock, Quick Actions) | StepCard 1 | ⬜ Needed |
| `s3_1_step2_edit_stream_info.jpg` | Edit Stream Info modal open — title, category, language, 18+ toggle visible | StepCard 2 | ⬜ Needed |
| `s3_1_step3_emotes_badges.jpg` | dashboard.kick.com/community/chat/emotes — Emotes upload page | StepCard 3 | ⬜ Needed |
| `s3_2_step4_vods_list.jpg` | dashboard.kick.com/studio/vods — list of past broadcasts | StepCard 4 | ⬜ Needed |
| `s3_2_step5_clips_management.jpg` | dashboard.kick.com/studio/clips — clips list with Download button visible | StepCard 5 | ⬜ Needed |
| `s3_3_step6_channel_points.jpg` | dashboard.kick.com/community/chat/channel-points — Enable toggle ON + Custom Rewards | StepCard 6 | ⬜ Needed |
| `s3_3_step7_polls_predictions.jpg` | Poll creation UI or Prediction modal (Quick Actions) | StepCard 7 | ⬜ Needed |
| `s3_3_step8_raid.jpg` | Raid countdown banner — 60-second countdown with Raid Now button | StepCard 8 | ⬜ Needed |

**Notes for Ch3 screenshots:**
- All from dashboard.kick.com (logged-in)
- `s3_3_step8_raid.jpg`: must be captured while live — or ask another streamer to raid you so you can screenshot the receiving side

---

## Chapter 4 — Chat Restrictions (`public/images/ch4/`)

Referenced in `content/th/04-chat-restrictions.mdx` and `content/en/04-chat-restrictions.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s4_1_step1_followers_only.jpg` | Chat Settings → Followers-Only Mode toggle with 15-min minimum | StepCard 1 | ⬜ Needed |
| `s4_1_step2_slow_sub_mode.jpg` | Chat Settings → Slow Mode rate limit + Subscribers-Only toggle | StepCard 2 | ⬜ Needed |
| `s4_1_step3_identity_verification.jpg` | Identity Verification section — Phone/Email verification toggles | StepCard 3 | ⬜ Needed |
| `s4_2_step4_banned_words_list.jpg` | Moderation → Banned Words — input field with scam keywords added | StepCard 4 | ⬜ Needed |
| `s4_2_step5_wildcard_technique.jpg` | Banned Words showing wildcard entries like *slot*, *casino* | StepCard 5 | ⬜ Needed |
| `s4_2_step6_block_emote.jpg` | Banned Words with emote name (beeBobble) added to filter | StepCard 6 | ⬜ Needed |
| `s4_3_step7_block_links.jpg` | Chat Settings → Block Links toggle ON | StepCard 7 | ⬜ Needed |
| `s4_3_step8_chat_rules.jpg` | Moderation → Display — Chat Rules text box + I Agree popup | StepCard 8 | ⬜ Needed |
| `s4_3_step9_mod_commands.jpg` | Example of /clear or /slow command being typed in live chat | StepCard 9 | ⬜ Needed |

**Notes for Ch4 screenshots:**
- Steps 1-3 and 7 are all from dashboard.kick.com/chat/settings (different sections of the same page)
- Steps 4-6 are from dashboard.kick.com/moderation/banned-words
- Step 8 from dashboard.kick.com/moderation/display
- Step 9: screenshot actual chat dock with a slash command typed

---

## Chapter 5 — Chatbot (`public/images/ch5/`)

Referenced in `content/th/05-chatbot.mdx` and `content/en/05-chatbot.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s5_1_step1_compare_bots.jpg` | KickBot homepage + BotRix homepage side by side (or comparison overview) | StepCard 1 | ⬜ Needed |
| `s5_2_step1_link_kickbot.jpg` | kickbot.com — Login with Kick button and verification command prompt | StepCard 2 | ⬜ Needed |
| `s5_2_step2_grant_mod_kickbot.jpg` | dashboard.kick.com/community/moderators — Add New dialog with KickBot added | StepCard 3 | ⬜ Needed |
| `s5_3_step1_link_botrix.jpg` | botrix.live — Profile page / KICK sign-in screen | StepCard 4 | ⬜ Needed |
| `s5_3_step2_grant_mod_botrix.jpg` | dashboard.kick.com/community/moderators — Add New dialog with BotRix added | StepCard 5 | ⬜ Needed |

**Notes for Ch5 screenshots:**
- `s5_1_step1_compare_bots.jpg`: two screenshots stitched side by side, or both homepages visible
- Grant mod screenshots: show the Add New dialog with the respective bot being searched/added

---

## Chapter 10 — KickBot Functions (`public/images/ch10/`)

Referenced in `content/th/10-kickbot-functions.mdx` and `content/en/10-kickbot-functions.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s10_1_step1_custom_commands.jpg` | KickBot — Commands → Custom Commands panel with !discord command filled in | StepCard 1 | ⬜ Needed |
| `s10_2_step1_timers.jpg` | KickBot — Timers panel with FacebookPromote timer configured (Interval 15m + Lines 5 visible) | StepCard 2 | ⬜ Needed |
| `s10_3_step1_ai_tts.jpg` | KickBot — Text to Speech settings, Enable TTS ON, voice dropdown visible | StepCard 3 | ⬜ Needed |
| `s10_4_step1_clip_command.jpg` | KickBot — Commands panel with !clip command enabled and highlighted | StepCard 4 | ⬜ Needed |
| `s10_5_step1_link_protection.jpg` | KickBot — Filters panel with Link Protection and Spam Protection toggled ON | StepCard 5 | ⬜ Needed |
| `s10_6_step1_gimmick_commands.jpg` | KickBot — !roll command showing $(random.1-100) variable in Response field | StepCard 6 | ⬜ Needed |
| `s10_7_step1_chat_overlay.jpg` | KickBot — Widgets → Chat Overlay page with Copy Widget URL button visible | StepCard 7 | ⬜ Needed |

**Notes for Ch10 screenshots:**
- All from kickbot.com dashboard (must be logged in)
- `s10_3_step1_ai_tts.jpg`: show Enable TTS toggle ON + voice dropdown open showing Thai voice options
- `s10_6_step1_gimmick_commands.jpg`: show !roll command with $(random.1-100) visible in Response field

---

## Chapter 11 — BotRix Functions (`public/images/ch11/`)

Referenced in `content/th/11-botrix-functions.mdx` and `content/en/11-botrix-functions.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s11_1_step1_custom_commands.jpg` | BotRix — Chatbot → Commands panel with !specs command filled in | StepCard 1 | ⬜ Needed |
| `s11_2_step1_timers.jpg` | BotRix — Chatbot → Timers panel with DonateLink timer configured (Interval + Lines visible) | StepCard 2 | ⬜ Needed |
| `s11_3_step1_link_protection.jpg` | BotRix — Modules → Moderation → Link Protection, Exempted Roles showing Subscribers + Moderators checked | StepCard 3 | ⬜ Needed |
| `s11_4_step1_emote_limit.jpg` | BotRix — Emote Protection panel, Limit: 5, Action: Delete + Timeout 10s | StepCard 4 | ⬜ Needed |
| `s11_5_step1_alerts_overlay.jpg` | BotRix — Widgets → Alerts page with customization options and Copy Widget URL visible | StepCard 5 | ⬜ Needed |
| `s11_6_step1_gimmick_commands.jpg` | BotRix — !roll command showing $(rand.1-100) variable in Response field | StepCard 6 | ⬜ Needed |
| `s11_7_step1_chat_overlay.jpg` | BotRix — Widgets → Chat page with theme options and Copy Widget URL visible | StepCard 7 | ⬜ Needed |
| `s11_8_step1_music_overlay.jpg` | BotRix — Modules → Song Request ON + Widgets → Music with Now Playing preview and Copy Widget URL | StepCard 8 | ⬜ Needed |

**Notes for Ch11 screenshots:**
- All from botrix.live dashboard (must be logged in)
- `s11_3_step1_link_protection.jpg`: show Exempted Roles with both Subscribers and Moderators checkboxes ticked
- `s11_5_step1_alerts_overlay.jpg`: show Alerts widget customization panel — alert animation preview + Copy Widget URL button

---

## Chapter 6 — Moderator (`public/images/ch6/`)

Referenced in `content/th/06-moderator.mdx` and `content/en/06-moderator.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s6_1_step1_add_moderator.jpg` | dashboard.kick.com/community/moderators — Add New dialog with moderator being searched | StepCard 1 | ⬜ Needed |
| `s6_2_step4_prediction_poll_chat.jpg` | Live Prediction and Poll overlay rendered inside the chat dock during a stream | StepCard 4 | ⬜ Needed |
| `s6_3_step5_mod_view_dashboard.jpg` | kick.com/moderator/[username] — Mod View dashboard with Action Log panel visible | StepCard 5 | ⬜ Needed |

**Notes for Ch6 screenshots:**
- `s6_1_step1_add_moderator.jpg`: show dashboard.kick.com/community/moderators with Add New button clicked
- `s6_2_step4_prediction_poll_chat.jpg`: must be captured live — show prediction or poll active in chat dock
- `s6_3_step5_mod_view_dashboard.jpg`: show full Mod View layout at kick.com/moderator/[username]

---

## Chapter 7 — Discord Connector (`public/images/ch7/`)

Referenced in `content/th/07-discord-connector.mdx` and `content/en/07-discord-connector.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s7_1_step2_verification_reaction_roles.jpg` | Discord #verify channel setup — Onboarding gate with role assignment visible | StepCard 2 | ⬜ Needed |
| `s7_2_step1_discord_webhook_setup.jpg` | Discord Channel Settings → Integrations → Webhooks page with New Webhook dialog | StepCard 3 | ⬜ Needed |
| `s7_2_step2_kickbot_live_notification.jpg` | KickBot notification card in #live-notifications with Direct Mobile Sub Link | StepCard 4 | ⬜ Needed |
| `s7_3_step1_botrix_role_sync.jpg` | BotRix.live → Integrations → Discord → Role Mapping panel (KICK Subscriber → @Subscriber) | StepCard 5 | ⬜ Needed |

**Notes for Ch7 screenshots:**
- `s7_1_step2_verification_reaction_roles.jpg`: show Discord Onboarding or #verify channel with role assignment buttons
- `s7_2_step2_kickbot_live_notification.jpg`: show actual notification embed card in Discord with subscribe link visible
- `s7_3_step1_botrix_role_sync.jpg`: show BotRix Role Mapping UI at botrix.live/integrations/discord

---

## Chapter 8 — Subscription & Donation (`public/images/ch8/`)

Referenced in `content/th/08-subscription-donation.mdx` and `content/en/08-subscription-donation.mdx`.

| File | Description | Step | Status |
|------|-------------|------|--------|
| `s8_1_step1_revenue_dashboard.jpg` | dashboard.kick.com/revenue/payout — Revenue share breakdown and eligibility status | StepCard 1 | ⬜ Needed |
| `s8_2_step3_stripe_connect.jpg` | Stripe Connect Thailand setup form — Country: Thailand + bank details fields | StepCard 3 | ⬜ Needed |
| `s8_3_step5_tipme_setup.jpg` | tipme.in.th dashboard — PromptPay setup, Slip Verification toggle, Widget URL | StepCard 5 | ⬜ Needed |

**Notes for Ch8 screenshots:**
- `s8_1_step1_revenue_dashboard.jpg`: show the payout page with revenue breakdown — must be logged in as a monetized streamer
- `s8_2_step3_stripe_connect.jpg`: show the Stripe Connect form with Country: Thailand selected and bank fields visible
- `s8_3_step5_tipme_setup.jpg`: show tipme.in.th dashboard with PromptPay number linked and Widget URL visible

---

## Chapter 9 — API Connector (TBD)

> Content not yet written. Add images here after receiving Ch9 content from Gemini.

---

## Summary

| Chapter | Total Images | Done | Needed |
|---------|-------------|------|--------|
| Ch1 Account Setup | 15 | 15 | 0 |
| Ch2 OBS Studio | 4 | 0 | 4 |
| Ch3 KICK Features | 8 | 0 | 8 |
| Ch4 Chat Restrictions | 9 | 0 | 9 |
| Ch5 Chatbot | 5 | 0 | 5 |
| Ch10 KickBot Functions | 7 | 0 | 7 |
| Ch11 BotRix Functions | 8 | 0 | 8 |
| Ch6 Moderator | 3 | 0 | 3 |
| Ch7 Discord Connector | 4 | 0 | 4 |
| Ch8 Subscription & Donation | 3 | 0 | 3 |
| Ch9 API Connector | TBD | — | — |
