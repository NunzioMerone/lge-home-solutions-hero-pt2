import type { ReactNode } from 'react'
import type { IconName, PhotoId } from './content'

export interface IconProps {
  name: IconName
  className?: string | undefined
}
export interface ResponsiveImageProps {
  photo: PhotoId
  collection?: 'photos' | 'hero'
  sizes?: string
  className?: string | undefined
  critical?: boolean
  decorative?: boolean
}
export interface SectionHeadingProps {
  id: string
  title: string
  children?: ReactNode
}
export interface SectionRevealOptions {
  duration?: number
  stagger?: number
}
export interface CarouselProps {
  label: string
  children: ReactNode
  variant: 'products' | 'reviews' | 'hero'
  autoScroll?: boolean
}
export interface MotionSettings {
  reducedMotion: boolean
  systemReducedMotion: boolean
  userReducedMotion: boolean
  toggleMotion: () => void
}
export interface MotionProviderProps {
  children: ReactNode
}
export interface ContactActionProps {
  label: string
  icon: IconName
  href: string | null
  primary?: boolean
  compact?: boolean
}
