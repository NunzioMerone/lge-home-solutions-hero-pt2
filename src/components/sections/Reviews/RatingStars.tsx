import type { RatingStarsProps } from '../../../types/reviews'
import { Icon } from '../../ui/Icon'
import styles from './Reviews.module.css'

export function RatingStars({ rating }: RatingStarsProps) {
  return (
    <span className={styles.stars} role="img" aria-label={`${rating} stelle su 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} data-filled={index < Math.round(rating)}>
          <Icon name="star" />
        </span>
      ))}
    </span>
  )
}
