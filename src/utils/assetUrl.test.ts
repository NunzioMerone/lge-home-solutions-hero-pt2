import { afterEach, describe, expect, it, vi } from 'vitest'
import { assetUrl } from './assetUrl'

afterEach(() => vi.unstubAllEnvs())

describe('assetUrl', () => {
  it('keeps local assets at the root during local development', () => {
    vi.stubEnv('BASE_URL', '/')
    expect(assetUrl('/img/hero/outdoor-480.webp')).toBe('/img/hero/outdoor-480.webp')
  })

  it('prefixes public assets with the GitHub Pages repository path', () => {
    vi.stubEnv('BASE_URL', '/lge-home-solutions/')
    expect(assetUrl('/img/brand/lge-footer-white.png')).toBe(
      '/lge-home-solutions/img/brand/lge-footer-white.png',
    )
    expect(assetUrl('icons/whatsapp.svg')).toBe('/lge-home-solutions/icons/whatsapp.svg')
  })
})
