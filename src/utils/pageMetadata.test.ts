import { describe, expect, it } from 'vitest'
import { site } from '../config/site'
import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'
import { getPageMetadata } from './pageMetadata'

describe('page metadata across routes', () => {
  it('recognizes the privacy route with and without the static-host trailing slash', () => {
    expect(getPageMetadata('/privacy-policy/')).toEqual(getPageMetadata('/privacy-policy'))
    expect(getPageMetadata('/privacy-policy').title).toContain('Privacy Policy')
  })

  it('does not carry privacy metadata or draft indexing restrictions to other pages', () => {
    const privacy = getPageMetadata('/privacy-policy')
    for (const path of ['/', '/prodotti/infissi', '/not-found']) {
      const metadata = getPageMetadata(path)
      expect(metadata.description).toBe(site.description)
      expect(metadata.description).not.toBe(privacy.description)
      expect(metadata.robots).toBeUndefined()
    }
    expect(getPageMetadata('/').title).toBe(site.title)
  })

  it('uses dedicated competencies metadata for normal and static-host routes', () => {
    for (const path of ['/competenze', '/competenze/']) {
      expect(getPageMetadata(path)).toEqual({
        title: competenciesPage.title,
        description: competenciesPage.description,
      })
    }
    expect(getPageMetadata('/competenze/unknown').title).not.toBe(competenciesPage.title)
  })

  it('recognizes normal and static-host work routes without privacy restrictions', () => {
    for (const path of ['/lavori', '/lavori/']) {
      expect(getPageMetadata(path)).toEqual({
        title: worksPage.title,
        description: worksPage.description,
      })
    }
  })
})
