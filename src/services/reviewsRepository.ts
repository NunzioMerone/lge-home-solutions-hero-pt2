import { googleReviewSnapshot } from '../data/reviews'
import type { ReviewRepository } from '../types/reviews'

export const reviewsRepository: ReviewRepository = {
  load(signal) {
    if (signal.aborted) return Promise.reject(new DOMException('Aborted', 'AbortError'))
    return Promise.resolve(googleReviewSnapshot)
  },
}
