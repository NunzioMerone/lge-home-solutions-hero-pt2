import type { ReviewCardProps } from '../../../types/reviews'
import { assetUrl } from '../../../utils/assetUrl'
import { RatingStars } from './RatingStars'
import { ReviewText } from './ReviewText'
import styles from './Reviews.module.css'

export function ReviewCard({ review, active = false }: ReviewCardProps) {
  return (
    <article
      className={styles.card}
      data-has-comment={Boolean(review.text)}
      tabIndex={active ? 0 : -1}
      aria-label={`Recensione di ${review.author}`}
      aria-describedby="reviews-instructions"
    >
      <div className={styles.rating}>
        <img
          className={styles.googleMark}
          src={assetUrl('img/reviews/google-g.png')}
          alt="Google"
          width="36"
          height="36"
          loading="lazy"
        />
        <div>
          <div className={styles.ratingValue}>
            <strong>{review.rating.toLocaleString('it-IT', { minimumFractionDigits: 1 })}</strong>
            <RatingStars rating={review.rating} />
          </div>
          <span className={styles.ratingLabel}>Recensione su Google</span>
        </div>
      </div>
      {review.text && (
        <div className={styles.quote}>
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <ReviewText text={review.text} />
        </div>
      )}
      <footer className={styles.author}>
        <span className={styles.avatar} data-tone={review.avatarTone} aria-hidden="true">
          {review.initials}
        </span>
        <div className={styles.authorDetails}>
          <div className={styles.authorName}>
            <strong>{review.author}</strong>
          </div>
          <small>{review.publishedLabel}</small>
        </div>
      </footer>
    </article>
  )
}
