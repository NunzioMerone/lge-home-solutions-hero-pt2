import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'

export const navigation = {
  home: { label: 'Home', path: '/#inizio' },
  work: { label: 'I nostri lavori', path: worksPage.path },
  competencies: { label: 'Competenze', path: competenciesPage.path },
  reviews: { label: 'Recensioni', path: '/#recensioni' },
  contact: { label: 'Contatti', path: '/#contatti' },
} as const
