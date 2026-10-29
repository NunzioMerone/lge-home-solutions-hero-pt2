import type { GalleryPhoto } from './gallery'

export type WorkCategoryId =
  'infissi' | 'oscuranti' | 'porte-e-sicurezza' | 'porte-interne' | 'atelier-gibus'

export type WorkFilter = 'tutti' | WorkCategoryId
export type WorkColumnCount = 2 | 3

export interface WorkCategory {
  id: WorkCategoryId
  title: string
  description: string
  galleryCategory: GalleryPhoto['category']
  layout: 'landscape' | 'portrait'
  featuredIds: readonly string[]
}

export interface WorkCollection extends WorkCategory {
  photos: readonly GalleryPhoto[]
}

export interface WorkFiltersProps {
  selected: WorkFilter
}

export interface WorkCollectionProps {
  collection: WorkCollection
  overview: boolean
  onOpen: (photo: GalleryPhoto, trigger: HTMLButtonElement) => void
}

export interface WorksHeroProps {
  onOpen: (photo: GalleryPhoto, trigger: HTMLButtonElement) => void
}
