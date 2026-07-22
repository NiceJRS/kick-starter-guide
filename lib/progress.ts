export const PROGRESS_KEY = 'kick-guide-progress'
export const MODE_KEY = 'kick-guide-mode'

export function getCompletedGuides(): number[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function markGuideComplete(id: number): void {
  if (typeof window === 'undefined') return
  const current = getCompletedGuides()
  if (!current.includes(id)) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...current, id]))
  }
}

export function unmarkGuideComplete(id: number): void {
  if (typeof window === 'undefined') return
  const current = getCompletedGuides()
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(current.filter((n) => n !== id)))
}

export function isGuideComplete(id: number): boolean {
  return getCompletedGuides().includes(id)
}

export function getMode(): 'streamer' | 'developer' {
  if (typeof window === 'undefined') return 'streamer'
  return (localStorage.getItem(MODE_KEY) as 'streamer' | 'developer') ?? 'streamer'
}

export function setMode(mode: 'streamer' | 'developer'): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(MODE_KEY, mode)
}
