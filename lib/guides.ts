export type GuideLevel = 'beginner' | 'intermediate' | 'pro'
export type GuideCategory = 'Setup' | 'Chat' | 'Tools & Bot' | 'Monetization' | 'Advanced'

export interface GuideSection {
  id: string
  label: { th: string; en: string }
}

export interface GuideData {
  id: number
  slug: string
  level: GuideLevel
  category: GuideCategory
  duration: number
  icon: string
  color: 'green' | 'amber' | 'purple' | 'blue' | 'teal'
  title: { th: string; en: string }
  description: { th: string; en: string }
  label: string
  sections: GuideSection[]
}

export const guides: GuideData[] = [
  {
    id: 1, slug: 'account-setup', level: 'beginner', category: 'Setup', duration: 20,
    icon: 'ti-user-circle', color: 'green', label: 'Account',
    title: { th: 'สมัครและตั้งค่าช่อง', en: 'Account & Channel Setup' },
    description: { th: 'วิธีสมัคร KICK และตั้งค่าช่องสตรีมตั้งแต่เริ่มต้น', en: 'Create your KICK account and set up your stream channel from scratch' },
    sections: [
      { id: 's1-1', label: { th: '1.1 สมัครบัญชีและความปลอดภัย', en: '1.1 Registration & Security' } },
      { id: 's1-2', label: { th: '1.2 ตั้งค่าโปรไฟล์และช่อง', en: '1.2 Profile & Visual Identity' } },
      { id: 's1-3', label: { th: '1.3 Stream Key', en: '1.3 Stream Key & Server URL' } },
      { id: 's1-4', label: { th: '1.4 ระบบรับรายได้', en: '1.4 Monetization & Affiliate' } },
    ],
  },
  {
    id: 2, slug: 'obs-studio', level: 'beginner', category: 'Setup', duration: 30,
    icon: 'ti-device-desktop', color: 'green', label: 'OBS',
    title: { th: 'OBS Studio', en: 'OBS Studio Setup' },
    description: { th: 'ติดตั้งและตั้งค่า OBS Studio สำหรับสตรีมบน KICK', en: 'Install and configure OBS Studio for streaming on KICK' },
    sections: [
      { id: 's2-1', label: { th: '2.1 ติดตั้ง OBS Studio', en: '2.1 Install OBS Studio' } },
      { id: 's2-2', label: { th: '2.2 ตั้งค่า Output', en: '2.2 Output Settings' } },
      { id: 's2-3', label: { th: '2.3 Scene & Source', en: '2.3 Scene & Sources' } },
      { id: 's2-4', label: { th: '2.4 เชื่อมกับ KICK', en: '2.4 Connect to KICK' } },
    ],
  },
  {
    id: 3, slug: 'kick-features', level: 'beginner', category: 'Setup', duration: 20,
    icon: 'ti-dashboard', color: 'blue', label: 'Features',
    title: { th: 'ฟีเจอร์ KICK', en: 'KICK Features' },
    description: { th: 'Dashboard, Clips, VODs, Channel Points และฟีเจอร์อื่นๆ', en: 'Dashboard, Clips, VODs, Channel Points and more' },
    sections: [
      { id: 's3-1', label: { th: '3.1 Creator Dashboard', en: '3.1 Creator Dashboard' } },
      { id: 's3-2', label: { th: '3.2 Clips & VODs', en: '3.2 Clips & VODs' } },
      { id: 's3-3', label: { th: '3.3 Channel Points', en: '3.3 Channel Points' } },
    ],
  },
  {
    id: 4, slug: 'chat-restrictions', level: 'beginner', category: 'Chat', duration: 15,
    icon: 'ti-messages', color: 'teal', label: 'Chat',
    title: { th: 'แชทและการจำกัด', en: 'Chat & Restrictions' },
    description: { th: 'Chat Modes, Banned Words, Link Protection', en: 'Chat Modes, Banned Words, Link Protection' },
    sections: [
      { id: 's4-1', label: { th: '4.1 Chat Modes', en: '4.1 Chat Modes' } },
      { id: 's4-2', label: { th: '4.2 Banned Words', en: '4.2 Banned Words' } },
      { id: 's4-3', label: { th: '4.3 Link Protection', en: '4.3 Link Protection' } },
    ],
  },
  {
    id: 5, slug: 'chatbot', level: 'intermediate', category: 'Tools & Bot', duration: 10,
    icon: 'ti-robot', color: 'amber', label: 'Chatbot',
    title: { th: 'Chatbot Setup', en: 'Chatbot Setup' },
    description: { th: 'เปรียบเทียบ KickBot vs BotRix พร้อมวิธีติดตั้งและเชื่อมต่อบอทกับช่องของคุณ', en: 'KickBot vs BotRix comparison and step-by-step bot installation for your channel' },
    sections: [
      { id: 's5-1', label: { th: '5.1 เปรียบเทียบ Chatbot', en: '5.1 Chatbot Comparison' } },
      { id: 's5-2', label: { th: '5.2 ติดตั้ง KickBot', en: '5.2 Install KickBot' } },
      { id: 's5-3', label: { th: '5.3 ติดตั้ง BotRix', en: '5.3 Install BotRix' } },
    ],
  },
  {
    id: 6, slug: 'moderator', level: 'intermediate', category: 'Chat', duration: 20,
    icon: 'ti-shield', color: 'teal', label: 'Mod',
    title: { th: 'Moderator', en: 'Moderator' },
    description: { th: 'เพิ่ม Mod, คำสั่ง Mod และการจัดการ Ban/Timeout', en: 'Add moderators, mod commands, Ban/Timeout management' },
    sections: [
      { id: 's6-1', label: { th: '6.1 เพิ่ม Moderator', en: '6.1 Add Moderators' } },
      { id: 's6-2', label: { th: '6.2 คำสั่ง Mod', en: '6.2 Mod Commands' } },
      { id: 's6-3', label: { th: '6.3 Ban & Timeout', en: '6.3 Ban & Timeout' } },
    ],
  },
  {
    id: 7, slug: 'discord-connector', level: 'intermediate', category: 'Tools & Bot', duration: 20,
    icon: 'ti-brand-discord', color: 'blue', label: 'Discord',
    title: { th: 'Discord Connector', en: 'Discord Connector' },
    description: { th: 'เชื่อมต่อ KICK กับ Discord และตั้งค่า Live Notifications', en: 'Connect KICK to Discord and set up Live Notifications' },
    sections: [
      { id: 's7-1', label: { th: '7.1 เชื่อมต่อ Discord', en: '7.1 Connect Discord' } },
      { id: 's7-2', label: { th: '7.2 Live Notifications', en: '7.2 Live Notifications' } },
      { id: 's7-3', label: { th: '7.3 Bot Permissions', en: '7.3 Bot Permissions' } },
    ],
  },
  {
    id: 8, slug: 'subscription-donation', level: 'intermediate', category: 'Monetization', duration: 25,
    icon: 'ti-cash', color: 'amber', label: 'รับเงิน',
    title: { th: 'Subscription & Donation', en: 'Subscription & Donation Fees' },
    description: { th: 'KICK Revenue Share 95/5 และการรับเงินสำหรับสตรีมเมอร์ไทย', en: 'KICK 95/5 Revenue Share and payout setup for Thai streamers' },
    sections: [
      { id: 's8-1', label: { th: '8.1 Subscription Tiers', en: '8.1 Subscription Tiers' } },
      { id: 's8-2', label: { th: '8.2 Donation Setup', en: '8.2 Donation Setup' } },
      { id: 's8-3', label: { th: '8.3 การรับเงินไทย', en: '8.3 Thai Payout' } },
    ],
  },
  {
    id: 10, slug: 'kickbot-functions', level: 'intermediate', category: 'Tools & Bot', duration: 20,
    icon: 'ti-robot', color: 'green', label: 'KickBot',
    title: { th: 'KickBot Functions', en: 'KickBot Functions' },
    description: { th: 'คู่มือฟังก์ชั่น KickBot ครบทุกฟีเจอร์: Custom Commands, Timers, AI TTS, !clip, Link Protection, Gimmicks และ Chat Overlay', en: 'Full KickBot function guide: Custom Commands, Timers, AI TTS, !clip, Link Protection, Gimmicks and Chat Overlay' },
    sections: [
      { id: 's10-1', label: { th: '10.1 Custom Commands', en: '10.1 Custom Commands' } },
      { id: 's10-2', label: { th: '10.2 Timers', en: '10.2 Timers' } },
      { id: 's10-3', label: { th: '10.3 AI TTS', en: '10.3 AI TTS' } },
      { id: 's10-4', label: { th: '10.4 !clip VOD Clipping', en: '10.4 !clip VOD Clipping' } },
      { id: 's10-5', label: { th: '10.5 Link Protection', en: '10.5 Link Protection' } },
      { id: 's10-6', label: { th: '10.6 Gimmick Commands', en: '10.6 Gimmick Commands' } },
      { id: 's10-7', label: { th: '10.7 Chat Overlay', en: '10.7 Chat Overlay' } },
    ],
  },
  {
    id: 11, slug: 'botrix-functions', level: 'intermediate', category: 'Tools & Bot', duration: 20,
    icon: 'ti-robot', color: 'amber', label: 'BotRix',
    title: { th: 'BotRix Functions', en: 'BotRix Functions' },
    description: { th: 'คู่มือฟังก์ชั่น BotRix ครบทุกฟีเจอร์: Custom Commands, Timers, Link Protection, Emote Limit, Alerts Overlay, Gimmicks, Chat Overlay และ Music Overlay', en: 'Full BotRix function guide: Custom Commands, Timers, Link Protection, Emote Limit, Alerts Overlay, Gimmicks, Chat Overlay and Music Overlay' },
    sections: [
      { id: 's11-1', label: { th: '11.1 Custom Commands', en: '11.1 Custom Commands' } },
      { id: 's11-2', label: { th: '11.2 Timers', en: '11.2 Timers' } },
      { id: 's11-3', label: { th: '11.3 Link Protection', en: '11.3 Link Protection' } },
      { id: 's11-4', label: { th: '11.4 Emote Limit', en: '11.4 Emote Limit' } },
      { id: 's11-5', label: { th: '11.5 Alerts Overlay', en: '11.5 Alerts Overlay' } },
      { id: 's11-6', label: { th: '11.6 Gimmick Commands', en: '11.6 Gimmick Commands' } },
      { id: 's11-7', label: { th: '11.7 Chat Overlay', en: '11.7 Chat Overlay' } },
      { id: 's11-8', label: { th: '11.8 Music Overlay (!sr)', en: '11.8 Music Overlay (!sr)' } },
    ],
  },
  {
    id: 9, slug: 'api-connector', level: 'pro', category: 'Advanced', duration: 45,
    icon: 'ti-api', color: 'purple', label: 'API',
    title: { th: 'API Connector', en: 'API Connector' },
    description: { th: 'KICK API Overview, Webhooks และการ Integrate กับ Third-party', en: 'KICK API Overview, Webhooks, and third-party integrations' },
    sections: [
      { id: 's9-1', label: { th: '9.1 KICK API Overview', en: '9.1 KICK API Overview' } },
      { id: 's9-2', label: { th: '9.2 Webhooks', en: '9.2 Webhooks' } },
      { id: 's9-3', label: { th: '9.3 Third-party Integration', en: '9.3 Third-party Integration' } },
    ],
  },
]

export function getGuideBySlug(slug: string): GuideData | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getAdjacentGuides(slug: string): { prev: GuideData | null; next: GuideData | null } {
  const idx = guides.findIndex((g) => g.slug === slug)
  return {
    prev: idx > 0 ? guides[idx - 1] : null,
    next: idx < guides.length - 1 ? guides[idx + 1] : null,
  }
}
