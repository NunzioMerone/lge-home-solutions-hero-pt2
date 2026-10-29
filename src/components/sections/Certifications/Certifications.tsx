import { Link } from 'react-router-dom'
import { competenciesPage } from '../../../config/competencies'
import { competencyHighlights } from '../../../data/competencies'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { Icon } from '../../ui/Icon'
import styles from './Certifications.module.css'

export function Certifications() {
  const ref = useSectionReveal()
  return (
    <section
      className={styles.section}
      id="competenze"
      aria-labelledby="competencies-title"
      ref={ref}
    >
      <div className={styles.headingPanel}>
        <header className={`${styles.introduction} container`} data-reveal>
          <h2 id="competencies-title" className={styles.title}>
            La qualità nasce dalla <em>competenza</em>
          </h2>
          <p className={styles.description}>
            Preparazione tecnica e cura nella posa, per un comfort che dura.
          </p>
        </header>
      </div>
      <div className={`${styles.content} container`}>
        <div className={styles.grid}>
          {competencyHighlights.map((item) => (
            <article key={item.id} className={styles.card} data-reveal>
              <div className={styles.icon}>
                <Icon name={item.icon} />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.label}>{item.label}</p>
                <h3>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.details} data-reveal>
          <Link className={styles.detailsLink} to={competenciesPage.path}>
            Scopri le nostre competenze
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  )
}
