import { worksPage } from '../config/works'
import type { GalleryPhoto } from '../types/gallery'
import type { WorkCategory, WorkColumnCount, WorkFilter } from '../types/works'

export function orderWorkPhotos(photos: readonly GalleryPhoto[], category: WorkCategory) {
  const matching = photos.filter((photo) => photo.category === category.galleryCategory)
  const featuredOrder = new Map(category.featuredIds.map((id, index) => [id, index]))
  return matching.sort(
    (left, right) =>
      (featuredOrder.get(left.id) ?? category.featuredIds.length) -
      (featuredOrder.get(right.id) ?? category.featuredIds.length),
  )
}

export function parseWorkFilter(
  value: string | null,
  categories: readonly WorkCategory[],
): WorkFilter {
  return categories.find((category) => category.id === value)?.id ?? 'tutti'
}

export function getWorkCategoryPath(filter: WorkFilter) {
  const path = filter === 'tutti' ? worksPage.path : `${worksPage.path}?categoria=${filter}`
  return `${path}#works-content`
}

export function distributeWorkPhotos(photos: readonly GalleryPhoto[], columns: WorkColumnCount) {
  return Array.from({ length: columns }, (_, column) =>
    photos.filter((_photo, index) => index % columns === column),
  )
}
