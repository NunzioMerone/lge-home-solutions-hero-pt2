import { describe, expect, it } from 'vitest'
import { getPaginationWindow } from './carouselPagination'

describe('compact carousel pagination', () => {
  it('shows every position for short lists and handles an empty list', () => {
    expect(getPaginationWindow(0, 0).indices).toEqual([])
    expect(getPaginationWindow(3, 1)).toEqual({
      start: 0,
      from: 0,
      size: 3,
      selected: 1,
      indices: [0, 1, 2],
    })
  })

  it('keeps the active review inside a maximum of five visible dots for 500 reviews', () => {
    for (let selected = 0; selected < 500; selected++) {
      const window = getPaginationWindow(500, selected)
      expect(window.size).toBe(5)
      expect(window.indices.length).toBeLessThanOrEqual(7)
      expect(window.start).toBeLessThanOrEqual(selected)
      expect(window.start + window.size).toBeGreaterThan(selected)
      expect(window.indices.every((index) => index >= 0 && index < 500)).toBe(true)
    }
  })

  it('anchors the window at the beginning and end, including when the carousel loops', () => {
    expect(getPaginationWindow(9, 0).start).toBe(0)
    expect(getPaginationWindow(9, 4).start).toBe(2)
    expect(getPaginationWindow(9, 8).start).toBe(4)
    expect(getPaginationWindow(9, 0).indices).toEqual([0, 1, 2, 3, 4, 5])
    expect(getPaginationWindow(9, 20).selected).toBe(8)
  })
})
