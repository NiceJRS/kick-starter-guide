const keyFor = (slug: string) => `kick-guide-progress-${slug}`

export function getProgress(slug: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(keyFor(slug)) ?? '[]')
  } catch {
    return []
  }
}

export function markStep(slug: string, stepId: string): void {
  if (typeof window === 'undefined') return
  const current = getProgress(slug)
  if (!current.includes(stepId)) {
    localStorage.setItem(keyFor(slug), JSON.stringify([...current, stepId]))
  }
}

export function unmarkStep(slug: string, stepId: string): void {
  if (typeof window === 'undefined') return
  const current = getProgress(slug)
  localStorage.setItem(keyFor(slug), JSON.stringify(current.filter((id) => id !== stepId)))
}

export function clearProgress(slug: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(keyFor(slug))
}
