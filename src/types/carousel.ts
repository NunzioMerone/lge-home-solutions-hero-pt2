export interface LoopCarouselOptions {
  paused?: boolean
  delay?: number
}
export interface CarouselArrowProps {
  direction: 'previous' | 'next'
  label: string
  controlsId: string
  onClick: () => void
  disabled?: boolean
}

export interface PaginationWindow {
  start: number
  from: number
  size: number
  selected: number
  indices: number[]
}
