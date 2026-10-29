import { heroCopy } from '../../../data/hero'
import { useHeroTypewriter } from '../../../hooks/useHeroTypewriter'
import { useHeroEntrance } from '../../../hooks/useHeroEntrance'
import { HeroProductCarousel } from './HeroProductCarousel'
import styles from './Hero.module.css'

export function Hero() {
  const rootRef = useHeroEntrance()
  const { introductionRef, suffix, reducedMotion } = useHeroTypewriter()
  return (
    <section ref={rootRef} className={styles.hero} id="inizio" aria-labelledby="hero-title">
      <div ref={introductionRef} className={styles.introduction} data-introduction>
        <h1 id="hero-title">
          <span className="sr-only">
            {heroCopy.prefix} {heroCopy.phrases[0]}
          </span>
          <span className={styles.headingVisual} aria-hidden="true">
            <span className={styles.prefix} data-hero-prefix>
              {heroCopy.prefix}
            </span>
            <span className={styles.suffixSlot}>
              {heroCopy.phrases.map((phrase) => (
                <span className={styles.reserve} key={phrase}>
                  {phrase}
                  <span className={styles.cursor} />
                </span>
              ))}
              <span className={styles.live}>
                {suffix}
                <span className={styles.cursor} data-paused={reducedMotion} />
              </span>
            </span>
          </span>
        </h1>
        <p className={styles.subtitle} data-hero-subtitle>
          {heroCopy.subtitle}
        </p>
      </div>
      <HeroProductCarousel />
    </section>
  )
}
