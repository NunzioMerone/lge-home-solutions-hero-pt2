export type ProductPath =
  | '/prodotti/infissi'
  | '/prodotti/oscuranti'
  | '/prodotti/porte-e-sicurezza'
  | '/prodotti/porte-interne'
  | '/atelier-gibus'
export type PhotoId = 'security' | 'windows' | 'outdoor' | 'shading' | 'interior'
export type IconName =
  | 'close'
  | 'arrow'
  | 'chevron-left'
  | 'chevron-right'
  | 'pause'
  | 'play'
  | 'pin'
  | 'phone'
  | 'mail'
  | 'instagram'
  | 'whatsapp'
  | 'craft'
  | 'thermal'
  | 'shield'
  | 'energy'
  | 'external'
  | 'star'
  | 'down'
  | 'clock'
  | 'award'
  | 'pergola'
  | 'store'
  | 'roof-window'
  | 'screen'

export interface PhotoAsset {
  id: PhotoId
  alt: string
  width: number
  height: number
}
export interface Product {
  id: PhotoId
  title: string
  path: ProductPath
  description: string
}
export interface Partner {
  id: string
  label: string
  logo: string
  width: number
  height: number
  logoTone?: 'light'
  status: 'user-provided'
}
export interface GalleryItem {
  id: string
  photo: PhotoId
  category: string
  title: string
  status: 'demo'
}
export interface ContactConfig {
  locality: string
  region: string
  postalCode: string
  province: string
  address: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  instagram: string | null
  legalName: string | null
  vatNumber: string | null
  openingHours: OpeningHoursGroup[]
  mapUrl: string
}
export interface ContactLinks {
  phone: string | null
  email: string | null
  whatsapp: string | null
  instagram: string | null
}
export interface OpeningHoursGroup {
  days: string
  hours: string
}
