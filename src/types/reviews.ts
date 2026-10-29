export interface GoogleReview {
  id: string
  author: string
  initials: string
  avatarTone: 'teal' | 'blue' | 'plum' | 'olive' | 'ochre'
  rating: 1 | 2 | 3 | 4 | 5
  text: string | null
  publishedLabel: string
}

export interface ReviewDataset {
  items: readonly GoogleReview[]
  source: 'google-manual'
  average: number
  totalCount: number
  checkedAt: string
  url: string
}

export interface ReviewRepository {
  load: (signal: AbortSignal) => Promise<ReviewDataset>
}

export type ReviewsState =
  { status: 'loading' } | { status: 'ready'; data: ReviewDataset } | { status: 'error' }

export interface RatingStarsProps {
  rating: number
}

export interface ReviewCardProps {
  review: GoogleReview
  active?: boolean
}

export interface ReviewsCarouselProps {
  reviews: readonly GoogleReview[]
}

export interface ReviewPaginationProps extends ReviewsCarouselProps {
  selected: number
  onSelect: (index: number) => void
}

export interface ReviewTextProps {
  text: string
}
