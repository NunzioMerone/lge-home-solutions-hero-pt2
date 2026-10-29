import { describe, expect, it } from 'vitest'
import { gallery } from '../data/gallery'
import { homeGallery, workCategories, workCollections } from '../data/works'
import { worksPage } from '../config/works'
import { distributeWorkPhotos, getWorkCategoryPath, parseWorkFilter } from './works'

describe('work collections', () => {
  it('includes every original photograph exactly once across the five categories', () => {
    const ids = workCollections.flatMap((collection) => collection.photos.map((photo) => photo.id))
    expect(workCollections).toHaveLength(5)
    expect(ids).toHaveLength(gallery.length)
    expect(new Set(ids).size).toBe(gallery.length)
    expect(new Set(ids)).toEqual(new Set(gallery.map((photo) => photo.id)))
    for (const collection of workCollections) {
      expect(
        collection.photos.every((photo) => photo.category === collection.galleryCategory),
      ).toBe(true)
      expect(collection.photos.slice(0, 3).map((photo) => photo.id)).toEqual(collection.featuredIds)
    }
  })

  it('keeps three authentic photographs per category on the homepage without duplicates', () => {
    expect(homeGallery).toHaveLength(15)
    expect(new Set(homeGallery.map((photo) => photo.id)).size).toBe(15)
    for (const category of workCategories) {
      expect(
        homeGallery.filter((photo) => photo.category === category.galleryCategory),
      ).toHaveLength(3)
    }
    expect(homeGallery.every((photo) => gallery.includes(photo))).toBe(true)
  })

  it('round-trips category links and falls back safely for unknown URL values', () => {
    expect(getWorkCategoryPath('tutti')).toBe(`${worksPage.path}#works-content`)
    for (const category of workCategories) {
      const url = new URL(getWorkCategoryPath(category.id), 'https://example.test')
      expect(parseWorkFilter(url.searchParams.get('categoria'), workCategories)).toBe(category.id)
      expect(url.hash).toBe('#works-content')
    }
    for (const value of [null, '', 'tutti', 'unknown', '../../privacy-policy']) {
      expect(parseWorkFilter(value, workCategories)).toBe('tutti')
    }
  })

  it('preserves the position of existing photos within each column when more are added', () => {
    for (const count of [2, 3] as const) {
      const first = distributeWorkPhotos(gallery.slice(0, 12), count)
      const expanded = distributeWorkPhotos(gallery.slice(0, 24), count)
      for (const [index, column] of first.entries()) {
        expect(expanded[index]?.slice(0, column.length)).toEqual(column)
      }
      expect(new Set(expanded.flat().map((photo) => photo.id)).size).toBe(24)
    }
  })
})
