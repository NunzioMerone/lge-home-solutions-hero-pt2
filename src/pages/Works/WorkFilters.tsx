import { Link } from 'react-router-dom'
import { workCollections } from '../../data/works'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { Icon } from '../../components/ui/Icon'
import { getWorkCategoryPath } from '../../utils/works'
import type { WorkFiltersProps } from '../../types/works'
import styles from './Works.module.css'

export function WorkFilters({ selected }: WorkFiltersProps) {
  return (
    <nav className={styles.filters} id="esplora-lavori" aria-label="Filtra i lavori per categoria">
      <div className="container">
        <div className={styles.filterHeading}>
          <h2>Da dove vuoi iniziare?</h2>
          <Link
            to={getWorkCategoryPath('tutti')}
            aria-current={selected === 'tutti' ? 'page' : undefined}
            className={styles.allLink}
          >
            Tutti i lavori <Icon name="arrow" />
          </Link>
        </div>
        <div className={styles.filterInner}>
          {workCollections.map((collection) => (
            <Link
              key={collection.id}
              to={getWorkCategoryPath(collection.id)}
              aria-current={selected === collection.id ? 'page' : undefined}
              className={styles.filterLink}
            >
              <span className={styles.filterImage}>
                {collection.photos[0] && (
                  <GalleryImage
                    photo={collection.photos[0]}
                    sizes="(min-width: 1000px) 250px, 180px"
                  />
                )}
              </span>
              <span className={styles.filterLabel}>
                {collection.title}
                <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
