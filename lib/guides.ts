export type GuideLevel = 'beginner' | 'intermediate' | 'pro'
export type GuideCategory = 'Setup' | 'Chat' | 'Tools & Bot' | 'Monetization' | 'Advanced'
export type GuideStage = 'starter' | 'amateur' | 'pro'
export type GuideShowIn = 'path' | 'catalog'

export const STAGE_CONFIG = [
  {
    id: 'starter' as GuideStage,
    label: { th: 'Starter', en: 'Starter' },
    sub: { th: 'ขั้นต่ำเพื่อเริ่มสตรีม', en: 'Minimum to go live' },
    required: true,
    color: 'var(--kick-green)',
    colorBg: 'var(--kick-green-bg)',
    colorBorder: 'var(--kick-green-22)',
    colorText: 'var(--kick-green-text)',
    celebrate: { th: 'คุณพร้อมสตรีมแล้ว! 🚀', en: "You're ready to stream! 🚀" },
    celebrateSub: { th: 'ติดตั้ง OBS และตั้งค่าบัญชีเสร็จแล้ว ไปกด Live ได้เลย', en: 'OBS is set up and your account is ready. Go live now!' },
  },
  {
    id: 'amateur' as GuideStage,
    label: { th: 'Amateur', en: 'Amateur' },
    sub: { th: 'สร้างชุมชนคนดู', en: 'Build your audience' },
    required: false,
    color: 'var(--amber)',
    colorBg: 'var(--amber-10)',
    colorBorder: 'var(--amber-25)',
    colorText: 'var(--amber)',
    celebrate: { th: 'ขั้น Amateur สำเร็จ! 🏆', en: 'Amateur stage complete! 🏆' },
    celebrateSub: { th: 'แชทปลอดภัย บอทพร้อม Mod ครบ — ชุมชนโตได้แล้ว', en: 'Chat managed, bots and mods set — time to grow!' },
  },
  {
    id: 'pro' as GuideStage,
    label: { th: 'Pro', en: 'Pro' },
    sub: { th: 'มืออาชีพเต็มขั้น', en: 'Go professional' },
    required: false,
    color: 'var(--purple)',
    colorBg: 'var(--purple-13)',
    colorBorder: 'var(--purple-28)',
    colorText: 'var(--purple)',
    celebrate: { th: 'คุณคือ Pro Streamer แล้ว! 👑', en: "You're a Pro Streamer! 👑" },
    celebrateSub: { th: 'Discord, รายได้, บอทครบ — ยินดีต้อนรับสู่ระดับมืออาชีพ', en: 'Discord, revenue, full bot setup — welcome to pro level!' },
  },
]

export interface GuideSection {
  id: string
  label: { th: string; en: string }
}

export interface GuideData {
  id: number
  slug: string
  level: GuideLevel
  category: GuideCategory
  stage: GuideStage
  showIn: GuideShowIn[]
  highlighted?: boolean
  duration: number
  icon: string
  color: 'green' | 'amber' | 'purple' | 'blue' | 'teal'
  title: { th: string; en: string }
  description: { th: string; en: string }
  label: string
  tags: string[]
  sections: GuideSection[]
}

export const guides: GuideData[] = [
  {
    id: 1, slug: 'account-setup', level: 'beginner', category: 'Setup', stage: 'starter', showIn: ['path', 'catalog'], duration: 5,
    icon: 'ti-user-circle', color: 'green', label: 'Account',
    title: { th: 'สมัครและตั้งค่าช่อง', en: 'Account & Channel Setup' },
    description: { th: 'วิธีสมัคร KICK และตั้งค่าช่องสตรีมตั้งแต่เริ่มต้น', en: 'Create your KICK account and set up your stream channel from scratch' },
    tags: ['สมัคร', 'register', 'บัญชี', 'account', 'โปรไฟล์', 'profile', 'stream key', 'rtmp', 'affiliate', 'เงิน', '2fa', 'password', 'รหัสผ่าน', 'ช่อง', 'channel'],
    sections: [
      { id: 's1-1', label: { th: '1.1 สมัครบัญชีและความปลอดภัย', en: '1.1 Registration & Security' } },
      { id: 's1-2', label: { th: '1.2 ตั้งค่าโปรไฟล์และช่อง', en: '1.2 Profile & Visual Identity' } },
      { id: 's1-3', label: { th: '1.3 Stream Key', en: '1.3 Stream Key & Server URL' } },
      { id: 's1-4', label: { th: '1.4 ระบบรับรายได้', en: '1.4 Monetization & Affiliate' } },
    ],
  },
  {
    id: 2, slug: 'obs-studio', level: 'beginner', category: 'Setup', stage: 'starter', showIn: ['path', 'catalog'], highlighted: true, duration: 10,
    icon: 'ti-device-desktop', color: 'green', label: 'OBS',
    title: { th: 'OBS Studio', en: 'OBS Studio Setup' },
    description: { th: 'ติดตั้งและตั้งค่า OBS Studio สำหรับสตรีมบน KICK', en: 'Install and configure OBS Studio for streaming on KICK' },
    tags: ['obs', 'ติดตั้ง', 'install', 'scene', 'source', 'bitrate', 'output', 'overlay', 'capture', 'webcam', 'กล้อง', 'microphone', 'ไมค์', 'encoder', 'x264', 'nvenc', 'lag', 'หน่วง'],
    sections: [
      { id: 's2-1', label: { th: '2.1 ติดตั้ง OBS Studio', en: '2.1 Install OBS Studio' } },
      { id: 's2-2', label: { th: '2.2 ตั้งค่า Output', en: '2.2 Output Settings' } },
      { id: 's2-3', label: { th: '2.3 Scene & Source', en: '2.3 Scene & Sources' } },
      { id: 's2-4', label: { th: '2.4 เชื่อมกับ KICK', en: '2.4 Connect to KICK' } },
    ],
  },
  {
    id: 3, slug: 'kick-features', level: 'beginner', category: 'Setup', stage: 'amateur', showIn: ['path', 'catalog'], duration: 8,
    icon: 'ti-dashboard', color: 'blue', label: 'Features',
    title: { th: 'ฟีเจอร์ KICK', en: 'KICK Features' },
    description: { th: 'Dashboard, Clips, VODs, Channel Points และฟีเจอร์อื่นๆ', en: 'Dashboard, Clips, VODs, Channel Points and more' },
    tags: ['dashboard', 'clip', 'คลิป', 'vod', 'highlight', 'channel points', 'คะแนน', 'replay', 'creator', 'gift', 'ของขวัญ', 'viewer', 'ผู้ชม'],
    sections: [
      { id: 's3-1', label: { th: '3.1 Creator Dashboard', en: '3.1 Creator Dashboard' } },
      { id: 's3-2', label: { th: '3.2 Clips & VODs', en: '3.2 Clips & VODs' } },
      { id: 's3-3', label: { th: '3.3 Channel Points', en: '3.3 Channel Points' } },
    ],
  },
  {
    id: 4, slug: 'chat-restrictions', level: 'beginner', category: 'Chat', stage: 'amateur', showIn: ['path', 'catalog'], duration: 8,
    icon: 'ti-messages', color: 'teal', label: 'Chat',
    title: { th: 'แชทและการจำกัด', en: 'Chat & Restrictions' },
    description: { th: 'Chat Modes, Banned Words, Link Protection', en: 'Chat Modes, Banned Words, Link Protection' },
    tags: ['แบน', 'ban', 'คำต้องห้าม', 'banned words', 'ลิงก์', 'link', 'spam', 'สแปม', 'slow mode', 'follower only', 'sub only', 'emote only', 'filter', 'กรอง', 'แชท', 'chat'],
    sections: [
      { id: 's4-1', label: { th: '4.1 Chat Modes', en: '4.1 Chat Modes' } },
      { id: 's4-2', label: { th: '4.2 Banned Words', en: '4.2 Banned Words' } },
      { id: 's4-3', label: { th: '4.3 Link Protection', en: '4.3 Link Protection' } },
    ],
  },
  {
    id: 5, slug: 'chatbot', level: 'intermediate', category: 'Tools & Bot', stage: 'amateur', showIn: ['path', 'catalog'], highlighted: true, duration: 5,
    icon: 'ti-robot', color: 'amber', label: 'Chatbot',
    title: { th: 'Chatbot Setup', en: 'Chatbot Setup' },
    description: { th: 'เปรียบเทียบ KickBot vs BotRix พร้อมวิธีติดตั้งและเชื่อมต่อบอทกับช่องของคุณ', en: 'KickBot vs BotRix comparison and step-by-step bot installation for your channel' },
    tags: ['bot', 'บอท', 'kickbot', 'botrix', 'nightbot', 'chatbot', 'ติดตั้งบอท', 'install bot', 'เชื่อมบอท', 'connect bot', 'command', 'คำสั่ง', 'auto reply', 'ตอบกลับอัตโนมัติ'],
    sections: [
      { id: 's5-1', label: { th: '5.1 เปรียบเทียบ Chatbot', en: '5.1 Chatbot Comparison' } },
      { id: 's5-2', label: { th: '5.2 ติดตั้ง KickBot', en: '5.2 Install KickBot' } },
      { id: 's5-3', label: { th: '5.3 ติดตั้ง BotRix', en: '5.3 Install BotRix' } },
    ],
  },
  {
    id: 6, slug: 'moderator', level: 'intermediate', category: 'Chat', stage: 'amateur', showIn: ['path', 'catalog'], duration: 10,
    icon: 'ti-shield', color: 'teal', label: 'Mod',
    title: { th: 'การตั้งค่าและการจัดการ Moderator', en: 'Moderator Setup & Management' },
    description: { th: 'คู่มือการแต่งตั้งทีมงาน Moderator คำสั่งแชต Mod View Dashboard และขั้นตอนการจัดการคนเกรียนอย่างเป็นระบบ', en: 'Appointing moderators, live chat commands, Mod View Dashboard tools, and structured moderation workflows' },
    tags: ['mod', 'moderator', 'โมด', 'ban', 'timeout', 'troll', 'เกรียน', 'spam', 'จัดการ', 'แบน', 'kick user', 'ไล่ออก', 'mod view', 'dashboard', 'รายงาน', 'report'],
    sections: [
      { id: 's6-1', label: { th: '6.1 แต่งตั้ง Mod และความปลอดภัย', en: '6.1 Add Moderators & Security' } },
      { id: 's6-2', label: { th: '6.2 คำสั่ง Mod และ Interactive', en: '6.2 Mod Commands & Tools' } },
      { id: 's6-3', label: { th: '6.3 Mod Dashboard และ Workflow', en: '6.3 Mod Dashboard & Workflow' } },
    ],
  },
  {
    id: 7, slug: 'discord-connector', level: 'intermediate', category: 'Tools & Bot', stage: 'pro', showIn: ['path', 'catalog'], duration: 10,
    icon: 'ti-brand-discord', color: 'blue', label: 'Discord',
    title: { th: 'การเชื่อมต่อ Discord กับช่อง KICK', en: 'Discord Connector Setup' },
    description: { th: 'สร้าง Discord Server ระบบ Onboarding ยืนยันตัวตน แจ้งเตือนไลฟ์สดอัตโนมัติ และซิงก์ยศ Subscriber', en: 'Discord Server setup, onboarding verification, automated Go-Live webhooks, and Sub Role sync' },
    tags: ['discord', 'เซิร์ฟเวอร์', 'server', 'webhook', 'แจ้งเตือน', 'notification', 'live alert', 'sub role', 'ยศ', 'role', 'onboarding', 'ยืนยัน', 'verify', 'bot', 'community', 'ชุมชน'],
    sections: [
      { id: 's7-1', label: { th: '7.1 โครงสร้าง Server และ Onboarding', en: '7.1 Server Structure & Onboarding' } },
      { id: 's7-2', label: { th: '7.2 แจ้งเตือนสตรีมสดอัตโนมัติ', en: '7.2 Automated Go-Live Notifications' } },
      { id: 's7-3', label: { th: '7.3 ซิงก์ยศ Sub และ Community Perks', en: '7.3 Sub Role Sync & Community Perks' } },
    ],
  },
  {
    id: 8, slug: 'subscription-donation', level: 'intermediate', category: 'Monetization', stage: 'pro', showIn: ['path', 'catalog'], highlighted: true, duration: 12,
    icon: 'ti-cash', color: 'amber', label: 'รับเงิน',
    title: { th: 'ระบบซับและการรับรายได้', en: 'Subscription & Donation Fees' },
    description: { th: 'ส่วนแบ่งรายได้ 95/5 บน KICK แก้ปัญหาซับมือถือ ผูกบัญชีธนาคารไทยผ่าน Stripe Connect และโดเนทพร้อมเพย์ 100%', en: "KICK's 95/5 revenue share, Direct Sub Link fix for mobile, Stripe Connect Thailand payout, and 100% PromptPay donations" },
    tags: ['donation', 'โดเนท', 'subscribe', 'ซับ', 'sub', 'promptpay', 'พร้อมเพย์', 'truemoney', 'stripe', 'ธนาคาร', 'bank', 'รายได้', 'income', 'payout', 'ถอนเงิน', 'easydonate', 'ezy', 'widget', 'ค่าธรรมเนียม', 'fee', '95/5', 'verify', 'w-8', 'kyc'],
    sections: [
      { id: 's8-1', label: { th: '8.1 Revenue Share & Direct Sub Link', en: '8.1 Revenue Share & Direct Sub Link' } },
      { id: 's8-2', label: { th: '8.2 ผูกบัญชี Stripe Connect ไทย', en: '8.2 Stripe Connect Thailand Payout' } },
      { id: 's8-3', label: { th: '8.3 โดเนท PromptPay & EasyDonate', en: '8.3 PromptPay & EasyDonate' } },
    ],
  },
  {
    id: 10, slug: 'kickbot-functions', level: 'intermediate', category: 'Tools & Bot', stage: 'pro', showIn: ['path', 'catalog'], duration: 10,
    icon: 'ti-robot', color: 'green', label: 'KickBot',
    title: { th: 'KickBot Functions', en: 'KickBot Functions' },
    description: { th: 'คู่มือฟังก์ชั่น KickBot ครบทุกฟีเจอร์: Custom Commands, Timers, AI TTS, !clip, Link Protection, Gimmicks และ Chat Overlay', en: 'Full KickBot function guide: Custom Commands, Timers, AI TTS, !clip, Link Protection, Gimmicks and Chat Overlay' },
    tags: ['kickbot', 'custom command', 'คำสั่ง', 'timer', 'ประกาศ', 'tts', 'text to speech', 'เสียงอ่านแชต', 'clip', 'คลิป', 'gimmick', 'มินิเกม', 'overlay', 'กรอบแชต', 'link protection', 'spam', 'สแปม'],
    sections: [
      { id: 's10-1', label: { th: '10.1 ตั้งคำสั่งตอบกลับอัตโนมัติ', en: '10.1 Custom Commands' } },
      { id: 's10-2', label: { th: '10.2 ตั้งเวลาประกาศข้อความ', en: '10.2 Timers' } },
      { id: 's10-3', label: { th: '10.3 AI TTS เสียงอ่านแชต', en: '10.3 AI TTS' } },
      { id: 's10-4', label: { th: '10.4 !clip ตัดคลิปไฮไลต์', en: '10.4 !clip VOD Clipping' } },
      { id: 's10-5', label: { th: '10.5 ระบบกันสแปมลิงก์', en: '10.5 Link Protection' } },
      { id: 's10-6', label: { th: '10.6 คำสั่งมินิเกมแชต', en: '10.6 Gimmick Commands' } },
      { id: 's10-7', label: { th: '10.7 กรอบแชตบนหน้าจอ', en: '10.7 Chat Overlay' } },
    ],
  },
  {
    id: 11, slug: 'botrix-functions', level: 'intermediate', category: 'Tools & Bot', stage: 'pro', showIn: ['path', 'catalog'], duration: 10,
    icon: 'ti-robot', color: 'amber', label: 'BotRix',
    title: { th: 'BotRix Functions', en: 'BotRix Functions' },
    description: { th: 'คู่มือฟังก์ชั่น BotRix ครบทุกฟีเจอร์: Custom Commands, Timers, Link Protection, Emote Limit, Alerts Overlay, Gimmicks, Chat Overlay และ Music Overlay', en: 'Full BotRix function guide: Custom Commands, Timers, Link Protection, Emote Limit, Alerts Overlay, Gimmicks, Chat Overlay and Music Overlay' },
    tags: ['botrix', 'custom command', 'คำสั่ง', 'timer', 'ประกาศ', 'emote limit', 'อีโมจิ', 'alert', 'แจ้งเตือน', 'gimmick', 'มินิเกม', 'overlay', 'กรอบแชต', 'music', 'เพลง', 'song request', 'sr', 'link protection', 'spam'],
    sections: [
      { id: 's11-1', label: { th: '11.1 ตั้งคำสั่งตอบกลับอัตโนมัติ', en: '11.1 Custom Commands' } },
      { id: 's11-2', label: { th: '11.2 ตั้งเวลาประกาศข้อความ', en: '11.2 Timers' } },
      { id: 's11-3', label: { th: '11.3 ระบบกันสแปมลิงก์', en: '11.3 Link Protection' } },
      { id: 's11-4', label: { th: '11.4 จำกัดการส่ง Emote', en: '11.4 Emote Limit' } },
      { id: 's11-5', label: { th: '11.5 กรอบแจ้งเตือนบน OBS', en: '11.5 Alerts Overlay' } },
      { id: 's11-6', label: { th: '11.6 คำสั่งมินิเกมแชต', en: '11.6 Gimmick Commands' } },
      { id: 's11-7', label: { th: '11.7 กรอบแชตบนหน้าจอ', en: '11.7 Chat Overlay' } },
      { id: 's11-8', label: { th: '11.8 ระบบขอเพลง + กรอบชื่อเพลง', en: '11.8 Music Overlay (!sr)' } },
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
