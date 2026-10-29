import type { PaginationWindow } from '../types/carousel'

export function getPaginationWindow(count: number, selected: number): PaginationWindow {
  const total = Math.max(0, Math.trunc(count))
  if (total === 0) return { start: 0, from: 0, size: 0, selected: 0, indices: [] }
  const size = Math.min(5, total)
  const current = Math.max(0, Math.min(Math.trunc(selected), total - 1))
  const start = Math.min(Math.max(0, current - Math.floor(size / 2)), total - size)
  // One neighbour on either side lets the visible window slide without creating a dot per review.
  const from = Math.max(0, start - 1)
  const end = Math.min(total, start + size + 1)
  return {
    start,
    from,
    size,
    selected: current,
    indices: Array.from({ length: end - from }, (_, index) => from + index),
  }
}
