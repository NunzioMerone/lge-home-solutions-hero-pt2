import { privacyPage } from '../config/privacy'
import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'
import { site } from '../config/site'
import { products } from '../data/products'
import type { PageMetadata } from '../types/privacy'

export function getPageMetadata(pathname: string): PageMetadata {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === privacyPage.path) {
    return {
      title: privacyPage.title,
      description: privacyPage.description,
      ...(!privacyPage.approved ? { robots: 'noindex, nofollow' } : {}),
    }
  }
  if (path === competenciesPage.path) {
    return {
      title: competenciesPage.title,
      description: competenciesPage.description,
    }
  }
  if (path === worksPage.path) {
    return {
      title: worksPage.title,
      description: worksPage.description,
    }
  }
  const product = products.find((item) => item.path === path)
  return {
    title: path === '/' ? site.title : `${product?.title ?? 'Pagina'} — ${site.name}`,
    description: site.description,
  }
}
