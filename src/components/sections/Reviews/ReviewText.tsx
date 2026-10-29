import { useId } from 'react'
import { useReviewExpansion } from '../../../hooks/useReviewExpansion'
import type { ReviewTextProps } from '../../../types/reviews'
import styles from './Reviews.module.css'

export function ReviewText({ text }: ReviewTextProps) {
  const id = useId()
  const { textRef, canExpand, expanded, toggleExpanded } = useReviewExpansion(text)

  return (
    <div className={styles.comment}>
      <blockquote id={id} ref={textRef} data-expanded={expanded}>
        {text}
      </blockquote>
      {canExpand && (
        <button
          className={styles.expandButton}
          type="button"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-controls={id}
        >
          {expanded ? 'Leggi di meno' : 'Leggi di più'}
        </button>
      )}
    </div>
  )
}
