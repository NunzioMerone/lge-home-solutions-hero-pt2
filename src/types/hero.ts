import type { PhotoId, Product } from './content'

export interface HeroProductCardProps {
  product: Product
  description: string
  critical: boolean
}

export type HeroDescriptions = Record<PhotoId, string>
