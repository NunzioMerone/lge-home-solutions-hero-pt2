import { useEffect, useState } from 'react'
import { reviewsRepository } from '../services/reviewsRepository'
import type { ReviewsState } from '../types/reviews'

export function useReviews(): ReviewsState {
  const [state, setState] = useState<ReviewsState>({ status: 'loading' })
  useEffect(() => {
    const controller = new AbortController()
    void reviewsRepository
      .load(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [])
  return state
}
