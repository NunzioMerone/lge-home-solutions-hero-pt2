import { Children } from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import type { CarouselProps } from '../../types/ui'
import { Icon } from './Icon'
import styles from './Carousel.module.css'

export function Carousel({ label, children, variant, autoScroll = false }: CarouselProps) {
  const {
    regionRef,
    viewportRef,
    selected,
    canPrev,
    canNext,
    running,
    userPaused,
    reducedMotion,
    scrollPrev,
    scrollNext,
    scrollTo,
    togglePlayback,
    onKeyDown,
  } = useCarousel({ variant, autoScroll })
  const count = Children.count(children)
  return (
    <div
      className={`${styles.carousel} ${styles[variant] ?? ''}`}
      role="region"
      aria-roledescription="carosello"
      aria-label={label}
    >
      <div ref={regionRef} className={styles.interactionArea}>
        <div
          className={styles.viewport}
          ref={viewportRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label={`${label}: usa le frecce per scorrere`}
        >
          <div className={styles.track}>
            {Children.map(children, (child, index) => (
              <div
                className={styles.slide}
                data-active={selected === index}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} di ${count}`}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <span className={styles.counter} aria-live="off">
          {String(selected + 1).padStart(2, '0')}
          <span> / {String(count).padStart(2, '0')}</span>
        </span>
        {autoScroll && (
          <button
            type="button"
            className={styles.playback}
            disabled={reducedMotion}
            onClick={togglePlayback}
            aria-label={
              running ? 'Ferma lo scorrimento dei lavori' : 'Avvia lo scorrimento dei lavori'
            }
            aria-pressed={userPaused || reducedMotion}
          >
            <Icon name={running ? 'pause' : 'play'} />
            <span>
              {reducedMotion
                ? 'Movimento ridotto'
                : running
                  ? 'Pausa'
                  : userPaused
                    ? 'Riprendi'
                    : 'Avvia'}
            </span>
          </button>
        )}
        <div className={styles.arrows}>
          <button
            className={styles.arrowButton}
            type="button"
            disabled={!canPrev}
            aria-label={`Precedente: ${label}`}
            onClick={scrollPrev}
          >
            <Icon name="chevron-left" />
          </button>
          {variant === 'products' && (
            <div className={styles.pagination} role="group" aria-label="Scegli un prodotto">
              {Children.map(children, (_child, index) => (
                <button
                  type="button"
                  aria-label={`Vai al prodotto ${index + 1} di ${count}`}
                  aria-current={selected === index ? 'true' : undefined}
                  onClick={() => scrollTo(index)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
          <button
            className={styles.arrowButton}
            type="button"
            disabled={!canNext}
            aria-label={`Successivo: ${label}`}
            onClick={scrollNext}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
        {variant === 'products' && (
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            Prodotto {selected + 1} di {count}
          </span>
        )}
      </div>
    </div>
  )
}
