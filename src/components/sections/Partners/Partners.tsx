import { partners } from '../../../data/partners'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import styles from './Partners.module.css'

export function Partners() {
  const ref = useSectionReveal()
  return (
    <section
      className={`${styles.section} section`}
      id="partner"
      aria-labelledby="partners-title"
      ref={ref}
    >
      <div className="container">
        <header className={styles.heading} data-reveal>
          <h2 id="partners-title">
            I nostri <em>partner</em>
          </h2>
        </header>
        <div className={styles.logoViewport}>
          <ul className={styles.logos}>
            {partners.map((partner) => (
              <li key={partner.id} data-reveal data-reveal-direction="right">
                <div className={styles.mark} data-tone={partner.logoTone}>
                  <img
                    src={partner.logo}
                    alt={partner.label}
                    width={partner.width}
                    height={partner.height}
                    loading="lazy"
                    decoding="async"
                  />
                  {partner.id === 'gibus' && (
                    <span className={styles.atelier} aria-hidden="true">
                      Atelier Gibus
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
