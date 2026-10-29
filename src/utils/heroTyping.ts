import { heroTyping } from '../config/hero'
import type { HeroTypingState } from '../types/hero'

export const initialHeroTypingState: HeroTypingState = {
  phraseIndex: 0,
  characterCount: 0,
  phase: 'typing',
  firstPhraseComplete: false,
}

export function advanceHeroTyping(
  state: HeroTypingState,
  phrases: readonly [string, ...string[]],
): HeroTypingState {
  const phrase = phrases[state.phraseIndex] ?? phrases[0]
  if (state.phase === 'holding') return { ...state, phase: 'deleting' }
  if (state.phase === 'between')
    return {
      ...state,
      phraseIndex: (state.phraseIndex + 1) % phrases.length,
      characterCount: 0,
      phase: 'typing',
    }
  if (state.phase === 'deleting') {
    const characterCount = Math.max(0, state.characterCount - 1)
    return { ...state, characterCount, phase: characterCount === 0 ? 'between' : 'deleting' }
  }
  const characterCount = Math.min(phrase.length, state.characterCount + 1)
  const complete = characterCount === phrase.length
  return {
    ...state,
    characterCount,
    phase: complete ? 'holding' : 'typing',
    firstPhraseComplete: state.firstPhraseComplete || complete,
  }
}

export function getHeroTypingDelay(state: HeroTypingState): number {
  if (state.phase === 'holding') return heroTyping.holdDelay
  if (state.phase === 'between') return heroTyping.betweenDelay
  if (state.phase === 'deleting') return heroTyping.deleteDelay
  return state.characterCount === 0 && !state.firstPhraseComplete
    ? heroTyping.initialDelay
    : heroTyping.typeDelay
}
