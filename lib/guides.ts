export type GuideLevel = 'beginner' | 'intermediate' | 'pro'
export type GuideCategory = 'Setup' | 'Chat' | 'Tools & Bot' | 'Monetization' | 'Advanced'

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
}

export const guides: GuideData[] = [
  {
    id: 1, slug: 'account-setup', level: 'beginner', category: 'Setup', duration: 20,
    icon: 'ti-user-circle', color: 'green', label: 'Account',
    title: { th: 'สมัครและตั้งค่าช่อง', en: 'Account & Channel Setup' },
    description: { th: 'วิธีสมัคร KICK และตั้งค่าช่องสตรีมตั้งแต่เริ่มต้น', en: 'Create your KICK account and set up your stream channel from scratch' },
  },
  {
    id: 2, slug: 'obs-studio', level: 'beginner', category: 'Setup', duration: 30,
    icon: 'ti-device-desktop', color: 'green', label: 'OBS',
    title: { th: 'OBS Studio', en: 'OBS Studio Setup' },
    description: { th: 'ติดตั้งและตั้งค่า OBS Studio สำหรับสตรีมบน KICK', en: 'Install and configure OBS Studio for streaming on KICK' },
  },
  {
    id: 3, slug: 'kick-features', level: 'beginner', category: 'Setup', duration: 20,
    icon: 'ti-dashboard', color: 'blue', label: 'Features',
    title: { th: 'ฟีเจอร์ KICK', en: 'KICK Features' },
    description: { th: 'Dashboard, Clips, VODs, Channel Points และฟีเจอร์อื่นๆ', en: 'Dashboard, Clips, VODs, Channel Points and more' },
  },
  {
    id: 4, slug: 'chat-restrictions', level: 'beginner', category: 'Chat', duration: 15,
    icon: 'ti-messages', color: 'teal', label: 'Chat',
    title: { th: 'แชทและการจำกัด', en: 'Chat & Restrictions' },
    description: { th: 'Chat Modes, Banned Words, Link Protection', en: 'Chat Modes, Banned Words, Link Protection' },
  },
  {
    id: 5, slug: 'chatbot', level: 'intermediate', category: 'Tools & Bot', duration: 25,
    icon: 'ti-robot', color: 'amber', label: 'Chatbot',
    title: { th: 'CHATBOT', en: 'CHATBOT Setup' },
    description: { th: 'ตั้งค่า KICK built-in bot, Nightbot และ BotRix', en: 'Set up KICK built-in bot, Nightbot, and BotRix' },
  },
  {
    id: 6, slug: 'moderator', level: 'intermediate', category: 'Chat', duration: 20,
    icon: 'ti-shield', color: 'teal', label: 'Mod',
    title: { th: 'Moderator', en: 'Moderator' },
    description: { th: 'เพิ่ม Mod, คำสั่ง Mod และการจัดการ Ban/Timeout', en: 'Add moderators, mod commands, Ban/Timeout management' },
  },
  {
    id: 7, slug: 'discord-connector', level: 'intermediate', category: 'Tools & Bot', duration: 20,
    icon: 'ti-brand-discord', color: 'blue', label: 'Discord',
    title: { th: 'Discord Connector', en: 'Discord Connector' },
    description: { th: 'เชื่อมต่อ KICK กับ Discord และตั้งค่า Live Notifications', en: 'Connect KICK to Discord and set up Live Notifications' },
  },
  {
    id: 8, slug: 'subscription-donation', level: 'intermediate', category: 'Monetization', duration: 25,
    icon: 'ti-cash', color: 'amber', label: 'รับเงิน',
    title: { th: 'Subscription & Donation', en: 'Subscription & Donation Fees' },
    description: { th: 'KICK Revenue Share 95/5 และการรับเงินสำหรับสตรีมเมอร์ไทย', en: 'KICK 95/5 Revenue Share and payout setup for Thai streamers' },
  },
  {
    id: 9, slug: 'api-connector', level: 'pro', category: 'Advanced', duration: 45,
    icon: 'ti-api', color: 'purple', label: 'API',
    title: { th: 'API Connector', en: 'API Connector' },
    description: { th: 'KICK API Overview, Webhooks และการ Integrate กับ Third-party', en: 'KICK API Overview, Webhooks, and third-party integrations' },
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
