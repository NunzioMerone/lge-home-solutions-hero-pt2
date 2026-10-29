import { Link } from 'react-router-dom'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { Icon } from '../../components/ui/Icon'
import { worksHeroPhotos } from '../../data/works'
import type { WorksHeroProps } from '../../types/works'
import styles from './Works.module.css'

export function WorksHero({ onOpen }: WorksHeroProps) {
  const { outdoor, interior } = worksHeroPhotos

  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroLabel}>I nostri lavori</p>
          <h1>
            Il nostro lavoro,
            <br />
            <em>la vostra casa.</em>
          </h1>
          <p className={styles.heroDescription}>
            Ogni casa è diversa. Qui trovi le nostre realizzazioni, dai dettagli degli interni agli
            spazi da vivere all’aperto.
          </p>
          <Link to="#esplora-lavori" className={styles.heroLink}>
            Entra nelle nostre realizzazioni <Icon name="down" />
          </Link>
        </div>
        <div className={styles.heroImages}>
          {outdoor && (
            <button
              className={styles.heroMainPhoto}
              type="button"
              aria-label={`Ingrandisci foto: ${outdoor.alt}`}
              aria-haspopup="dialog"
              onClick={(event) => onOpen(outdoor, event.currentTarget)}
            >
              <GalleryImage
                photo={outdoor}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1400px) 730px, (min-width: 900px) 55vw, 100vw"
              />
            </button>
          )}
          {interior && (
            <button
              className={styles.heroDetailPhoto}
              type="button"
              aria-label={`Ingrandisci foto: ${interior.alt}`}
              aria-haspopup="dialog"
              onClick={(event) => onOpen(interior, event.currentTarget)}
            >
              <GalleryImage
                photo={interior}
                loading="eager"
                sizes="(min-width: 900px) 200px, 150px"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
