import { describe, expect, it } from 'vitest'
import { heroCopy } from '../data/hero'
import { heroTyping } from '../config/hero'
import { advanceHeroTyping, getHeroTypingDelay, initialHeroTypingState } from './heroTyping'

describe('hero typewriter sequence', () => {
  it('writes a complete phrase before holding, then deletes it completely', () => {
    let state = initialHeroTypingState
    for (let index = 0; index < heroCopy.phrases[0].length; index++) {
      state = advanceHeroTyping(state, heroCopy.phrases)
      expect(state.characterCount).toBe(index + 1)
    }
    expect(state.phase).toBe('holding')
    expect(state.firstPhraseComplete).toBe(true)
    expect(getHeroTypingDelay(state)).toBe(heroTyping.holdDelay)
    state = advanceHeroTyping(state, heroCopy.phrases)
    expect(state.phase).toBe('deleting')
    for (let index = heroCopy.phrases[0].length - 1; index >= 0; index--) {
      state = advanceHeroTyping(state, heroCopy.phrases)
      expect(state.characterCount).toBe(index)
    }
    expect(state.phase).toBe('between')
    expect(getHeroTypingDelay(state)).toBe(heroTyping.betweenDelay)
  })

  it('cycles through all five phrases in order and returns to the first', () => {
    let state = initialHeroTypingState
    const completed: number[] = []
    for (let step = 0; step < 500 && completed.length < 6; step++) {
      state = advanceHeroTyping(state, heroCopy.phrases)
      if (state.phase === 'holding') completed.push(state.phraseIndex)
      expect(state.characterCount).toBeGreaterThanOrEqual(0)
    }
    expect(completed).toEqual([0, 1, 2, 3, 4, 0])
    expect(state.firstPhraseComplete).toBe(true)
  })

  it('uses the opening delay once and remembers completion across cycles', () => {
    expect(getHeroTypingDelay(initialHeroTypingState)).toBe(heroTyping.initialDelay)
    const nextPhrase = advanceHeroTyping(
      { ...initialHeroTypingState, phase: 'between', firstPhraseComplete: true },
      heroCopy.phrases,
    )
    expect(getHeroTypingDelay(nextPhrase)).toBe(heroTyping.typeDelay)
    expect(nextPhrase.firstPhraseComplete).toBe(true)
  })
})
