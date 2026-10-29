import { describe, expect, it } from 'vitest'
import { getLoopOffset } from './loopCarousel'

describe('loop carousel positions', () => {
  it('keeps the two neighbours on their correct side across the loop boundary', () => {
    expect(getLoopOffset(9, 0, 10)).toBe(-1)
    expect(getLoopOffset(0, 9, 10)).toBe(1)
    expect(getLoopOffset(8, 0, 10)).toBe(-2)
    expect(getLoopOffset(1, 9, 10)).toBe(2)
  })

  it('shows each source photograph once in the five visible positions', () => {
    for (let selected = 0; selected < 10; selected++) {
      const visible = Array.from({ length: 10 }, (_, index) => index).filter(
        (index) => Math.abs(getLoopOffset(index, selected, 10)) <= 2,
      )
      expect(visible).toHaveLength(5)
      expect(new Set(visible.map((index) => index % 5)).size).toBe(5)
      expect(getLoopOffset(selected, selected, 10)).toBe(0)
    }
  })

  it('keeps three distinct reviews visible when the five-item loop wraps', () => {
    for (let selected = 0; selected < 5; selected++) {
      const visible = Array.from({ length: 5 }, (_, index) => index).filter(
        (index) => Math.abs(getLoopOffset(index, selected, 5)) <= 1,
      )
      expect(visible).toHaveLength(3)
      expect(visible).toContain(selected)
      expect(visible).toContain((selected + 1) % 5)
      expect(visible).toContain((selected + 4) % 5)
    }
  })

  it('keeps five distinct reviews visible across the updated nine-item loop', () => {
    for (let selected = 0; selected < 9; selected++) {
      const visible = Array.from({ length: 9 }, (_, index) => index).filter(
        (index) => Math.abs(getLoopOffset(index, selected, 9)) <= 2,
      )
      expect(visible).toHaveLength(5)
      expect(new Set(visible).size).toBe(5)
      expect(visible).toContain((selected + 7) % 9)
      expect(visible).toContain((selected + 2) % 9)
    }
  })
})
