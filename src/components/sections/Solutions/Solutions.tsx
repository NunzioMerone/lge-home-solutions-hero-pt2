import { HeroProductCarousel } from '../Hero/HeroProductCarousel'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import styles from './Solutions.module.css'

export function Solutions() {
  const ref = useSectionReveal({ duration: 1.8, stagger: 0.16 })
  return (
    <section className={styles.section} id="prodotti" aria-labelledby="solutions-title" ref={ref}>
      <div className="container">
        <header className={styles.heading} data-reveal>
          <h2 id="solutions-title">
            Le nostre <em>soluzioni</em>
          </h2>
        </header>
        <HeroProductCarousel />
      </div>
    </section>
  )
}
