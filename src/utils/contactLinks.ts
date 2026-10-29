import type { ContactConfig, ContactLinks } from '../types/content'

function normalizePhone(value: string | null): string | null {
  if (!value) return null
  const normalized = value.replace(/[\s().-]/g, '')
  return /^\+[1-9]\d{6,14}$/.test(normalized) ? normalized : null
}

function instagramUrl(value: string | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' &&
      ['instagram.com', 'www.instagram.com'].includes(url.hostname) &&
      url.pathname.length > 1 &&
      !url.username &&
      !url.password
      ? url.href
      : null
  } catch {
    return null
  }
}

export function getContactLinks(config: ContactConfig): ContactLinks {
  const phone = normalizePhone(config.phone)
  const whatsapp = normalizePhone(config.whatsapp)
  const email = config.email?.trim()
  return {
    phone: phone ? `tel:${phone}` : null,
    whatsapp: whatsapp ? `https://wa.me/${whatsapp.slice(1)}` : null,
    email:
      email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
        ? `mailto:${encodeURIComponent(email)}`
        : null,
    instagram: instagramUrl(config.instagram),
  }
}
