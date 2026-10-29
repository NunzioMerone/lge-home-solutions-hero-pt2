import { memo } from 'react'
import { heroDescriptions } from '../../../data/hero'
import { products } from '../../../data/products'
import { useCarousel } from '../../../hooks/useCarousel'
import { HeroProductCard } from './HeroProductCard'
import { CarouselArrow } from '../../ui/CarouselArrow'
import styles from './HeroProducts.module.css'

// Keep the carousel independent of the headline's per-character updates.
export const HeroProductCarousel = memo(function HeroProductCarousel() {
  const {
    viewportRef,
    selected,
    snapCount,
    canPrev,
    canNext,
    scrollTo,
    scrollPrev,
    scrollNext,
    onKeyDown,
  } = useCarousel({ variant: 'hero' })
  return (
    <div
      className={styles.carousel}
      tabIndex={-1}
      role="region"
      aria-roledescription="carosello"
      aria-label="Soluzioni LGE"
      data-hero-carousel
      data-scrollable={snapCount > 1}
    >
      <div
        className={styles.viewport}
        id="hero-carousel-viewport"
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Soluzioni LGE: usa le frecce per scorrere"
      >
        <div className={styles.track}>
          {products.map((product, index) => (
            <div
              className={styles.slide}
              key={product.id}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} di ${products.length}`}
              data-reveal
            >
              <HeroProductCard
                product={product}
                description={heroDescriptions[product.id]}
                critical={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        {snapCount > 1 && (
          <CarouselArrow
            direction="previous"
            label="Soluzioni precedenti"
            controlsId="hero-carousel-viewport"
            onClick={scrollPrev}
            disabled={!canPrev}
          />
        )}
        <div
          className={styles.pagination}
          role="group"
          aria-label="Posizioni del carosello soluzioni"
        >
          {snapCount > 1 &&
            Array.from({ length: snapCount }, (_, index) => (
              <button
                type="button"
                key={index}
                aria-label={`Vai alla posizione ${index + 1} di ${snapCount}`}
                aria-current={selected === index ? 'true' : undefined}
                onClick={() => scrollTo(index)}
              >
                <span />
              </button>
            ))}
        </div>
        {snapCount > 1 && (
          <CarouselArrow
            direction="next"
            label="Soluzioni successive"
            controlsId="hero-carousel-viewport"
            onClick={scrollNext}
            disabled={!canNext}
          />
        )}
      </div>
    </div>
  )
})
