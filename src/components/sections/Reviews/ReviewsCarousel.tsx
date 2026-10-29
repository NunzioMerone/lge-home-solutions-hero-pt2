import { useLoopCarousel } from '../../../hooks/useLoopCarousel'
import type { ReviewsCarouselProps } from '../../../types/reviews'
import { getLoopOffset } from '../../../utils/loopCarousel'
import { ReviewCard } from './ReviewCard'
import { ReviewPagination } from './ReviewPagination'
import { CarouselArrow } from '../../ui/CarouselArrow'
import styles from './ReviewsCarousel.module.css'

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const { regionRef, viewportRef, selected, onKeyDown, scrollTo, scrollPrev, scrollNext } =
    useLoopCarousel({ delay: 6500 })

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Recensioni Google"
      aria-roledescription="carosello"
      onKeyDown={onKeyDown}
    >
      <p id="reviews-instructions" className="sr-only">
        Usa i tasti freccia per scorrere le recensioni. Lo scorrimento automatico si ferma durante
        la lettura e le interazioni.
      </p>
      <div className={styles.viewport} ref={viewportRef} id="reviews-carousel-viewport">
        <div className={styles.track}>
          {reviews.map((review, index) => {
            const depth = Math.abs(getLoopOffset(index, selected, reviews.length))
            const visible = depth <= 2
            return (
              <div
                key={review.id}
                className={styles.slide}
                data-depth={Math.min(depth, 3)}
                aria-hidden={!visible}
                inert={!visible}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} di ${reviews.length}`}
              >
                <div className={styles.frame}>
                  <ReviewCard review={review} active={index === selected} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.controls}>
        <CarouselArrow
          direction="previous"
          label="Recensione precedente"
          controlsId="reviews-carousel-viewport"
          onClick={scrollPrev}
          disabled={reviews.length < 2}
        />
        <ReviewPagination reviews={reviews} selected={selected} onSelect={scrollTo} />
        <CarouselArrow
          direction="next"
          label="Recensione successiva"
          controlsId="reviews-carousel-viewport"
          onClick={scrollNext}
          disabled={reviews.length < 2}
        />
      </div>
    </div>
  )
}
