import { gallery } from './gallery'
import { orderWorkPhotos } from '../utils/works'
import type { WorkCategory, WorkCollection } from '../types/works'

export const workCategories: readonly WorkCategory[] = [
  {
    id: 'infissi',
    title: 'Infissi',
    description: 'Finestre, portefinestre e vetrate: ambienti e dettagli di posa.',
    galleryCategory: 'Infissi',
    layout: 'landscape',
    featuredIds: ['lge-0db25f41', 'lge-320edfa5', 'lge-8956c0db'],
  },
  {
    id: 'oscuranti',
    title: 'Oscuranti',
    description: 'Frangisole, persiane e tende tecniche nelle nostre realizzazioni.',
    galleryCategory: 'Oscuranti',
    layout: 'landscape',
    featuredIds: ['lge-76cd6474', 'lge-0317eb86', 'lge-1e08fc98'],
  },
  {
    id: 'porte-e-sicurezza',
    title: 'Porte e sicurezza',
    description: 'Porte d’ingresso: pannelli, maniglioni e dettagli d’installazione.',
    galleryCategory: 'Porte e sicurezza',
    layout: 'portrait',
    featuredIds: ['lge-e7b0f444', 'lge-b523a228', 'lge-e2d1ec8e'],
  },
  {
    id: 'porte-interne',
    title: 'Porte interne',
    description: 'Porte a battente, scorrevoli e a filo parete.',
    galleryCategory: 'Porte interne',
    layout: 'portrait',
    featuredIds: ['lge-3b069cab', 'lge-3087d625', 'lge-e131e7a7'],
  },
  {
    id: 'atelier-gibus',
    title: 'Atelier Gibus',
    description: 'Pergole, tende da sole e chiusure vetrate.',
    galleryCategory: 'Outdoor',
    layout: 'landscape',
    featuredIds: ['lge-89a82d37', 'lge-fb1ac1a2', 'lge-4460a88d'],
  },
]

export const workCollections: readonly WorkCollection[] = workCategories.map((category) => ({
  ...category,
  photos: orderWorkPhotos(gallery, category),
}))

export const worksHeroPhotos = {
  outdoor: gallery.find((photo) => photo.id === 'lge-89a82d37'),
  interior: gallery.find((photo) => photo.id === 'lge-98cf7091'),
}

// Alternate categories so the homepage stays varied throughout the carousel.
export const homeGallery = Array.from({ length: 3 }, (_, index) =>
  workCollections.flatMap((collection) => {
    const photo = collection.photos[index]
    return photo ? [photo] : []
  }),
).flat()
