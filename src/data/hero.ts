import type { HeroDescriptions } from '../types/hero'

export const heroCopy = {
  prefix: 'Il design che',
  phrases: [
    'illumina i tuoi spazi',
    'protegge la tua casa',
    'valorizza ogni ambiente',
    'rispetta la tua privacy',
    'crea nuovi spazi da vivere',
  ] as const,
  subtitle: 'Ogni ambiente merita di essere vissuto al meglio.',
}

export const heroDescriptions: HeroDescriptions = {
  windows: 'Luce naturale, comfort su misura.',
  shading: 'La luce giusta, la tua privacy.',
  security: 'Protezione che incontra il design.',
  interior: 'Armonia in ogni ambiente.',
  outdoor: 'Nuovi spazi, da vivere all’aperto.',
}
