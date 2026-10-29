import { useReviews } from '../../../hooks/useReviews'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { assetUrl } from '../../../utils/assetUrl'
import { ReviewsCarousel } from './ReviewsCarousel'
import { RatingStars } from './RatingStars'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import styles from './Reviews.module.css'

export function Reviews() {
  const ref = useSectionReveal()
  const state = useReviews()
  return (
    <section
      className={`${styles.section} section`}
      id="recensioni"
      aria-labelledby="reviews-title"
      ref={ref}
    >
      <div className="container">
        <div className={styles.headingRow}>
          <header className={styles.heading} data-reveal>
            <h2 id="reviews-title">
              Cosa dicono di <em>noi</em>
            </h2>
            <p>Le parole di chi ha scelto LGE per la propria casa.</p>
          </header>
          <div className={styles.summaryReveal} data-reveal data-reveal-direction="right">
            {state.status === 'ready' && (
              <a
                className={styles.googleSummary}
                href={state.data.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${state.data.average} su 5, ${state.data.totalCount} recensioni su Google (nuova scheda)`}
              >
                <img
                  src={assetUrl('img/reviews/google-g.png')}
                  alt="Google"
                  width="44"
                  height="44"
                  loading="lazy"
                />
                <div>
                  <span className={styles.summaryText}>
                    <strong>
                      {state.data.average.toLocaleString('it-IT', { minimumFractionDigits: 1 })}
                      <span>/5</span>
                    </strong>
                    <span>{state.data.totalCount} recensioni</span>
                  </span>
                  <RatingStars rating={state.data.average} />
                </div>
              </a>
            )}
          </div>
        </div>
        <div data-reveal>
          {state.status === 'ready' ? (
            <ReviewsCarousel reviews={state.data.items} />
          ) : (
            <p role="status" className={styles.status}>
              {state.status === 'loading'
                ? 'Caricamento recensioni…'
                : 'Recensioni temporaneamente non disponibili.'}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
