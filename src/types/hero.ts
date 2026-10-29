import type { PhotoId, Product } from './content'

export type TypingPhase = 'typing' | 'holding' | 'deleting' | 'between'

export interface HeroTypingState {
  phraseIndex: number
  characterCount: number
  phase: TypingPhase
  firstPhraseComplete: boolean
}

export interface HeroProductCardProps {
  product: Product
  description: string
  critical: boolean
}

export type HeroDescriptions = Record<PhotoId, string>
