export const XP_PER_GUIDE = 10

export const levels = [
  { level: 1, minXP: 0,  label: 'มือใหม่',    labelEn: 'Newbie' },
  { level: 2, minXP: 30, label: 'Streamer',    labelEn: 'Streamer' },
  { level: 3, minXP: 60, label: 'Pro Streamer', labelEn: 'Pro Streamer' },
  { level: 4, minXP: 90, label: 'KICK Master',  labelEn: 'KICK Master' },
]

export function calcXP(completedCount: number): number {
  return completedCount * XP_PER_GUIDE
}

export function calcLevel(xp: number): (typeof levels)[0] {
  return [...levels].reverse().find((l) => xp >= l.minXP) ?? levels[0]
}

export function xpToNextLevel(xp: number): { current: number; needed: number; pct: number } {
  const current = calcLevel(xp)
  const nextIdx = levels.findIndex((l) => l.level === current.level) + 1
  if (nextIdx >= levels.length) return { current: xp, needed: xp, pct: 100 }
  const next = levels[nextIdx]
  const needed = next.minXP - current.minXP
  const earned = xp - current.minXP
  return { current: earned, needed, pct: Math.round((earned / needed) * 100) }
}
