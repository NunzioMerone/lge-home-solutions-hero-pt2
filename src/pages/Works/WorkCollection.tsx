import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { Icon } from '../../components/ui/Icon'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { distributeWorkPhotos, getWorkCategoryPath } from '../../utils/works'
import type { WorkCollectionProps } from '../../types/works'
import styles from './Works.module.css'

const batchSize = 12

export function WorkCollection({ collection, overview, onOpen }: WorkCollectionProps) {
  const [limit, setLimit] = useState(batchSize)
  const ref = useSectionReveal({ duration: 1.4, stagger: 0.12 })
  const gridRef = useRef<HTMLDivElement>(null)
  const focusId = useRef<string | null>(null)
  const desktop = useMediaQuery('(min-width: 1000px)')
  const visiblePhotos = collection.photos.slice(0, overview ? 6 : limit)
  const remaining = collection.photos.length - visiblePhotos.length
  const columnCount = desktop ? 3 : 2
  const columns = distributeWorkPhotos(visiblePhotos, columnCount)

  useLayoutEffect(() => {
    if (!focusId.current) return
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-photo-id="${focusId.current}"]`)
      ?.focus()
    focusId.current = null
  }, [limit])

  return (
    <section
      className={styles.collection}
      aria-labelledby={`works-${collection.id}-title`}
      ref={ref}
    >
      <header className={styles.collectionHeading} data-reveal>
        <h2 id={`works-${collection.id}-title`}>{collection.title}</h2>
        <p>{collection.description}</p>
      </header>
      <div data-reveal>
        <div className={styles.photoGrid} data-columns={columnCount} ref={gridRef}>
          {columns.map((photos, column) => (
            <div className={styles.photoColumn} key={column}>
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  className={styles.photo}
                  data-photo-id={photo.id}
                  type="button"
                  aria-label={`Ingrandisci foto: ${photo.alt}`}
                  aria-haspopup="dialog"
                  onClick={(event) => onOpen(photo, event.currentTarget)}
                >
                  <GalleryImage
                    photo={photo}
                    sizes="(min-width: 1400px) 430px, (min-width: 1000px) 32vw, 50vw"
                  />
                  <span className={styles.photoHint} aria-hidden="true">
                    <Icon name="external" />
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {visiblePhotos.length} di {collection.photos.length} fotografie caricate.
      </p>
      {(overview || remaining > 0) && (
        <div className={styles.collectionBottom}>
          {overview ? (
            <Link
              className={styles.collectionLink}
              to={getWorkCategoryPath(collection.id)}
              aria-label={`Tutte le realizzazioni: ${collection.title}`}
            >
              Guarda le altre foto <Icon name="arrow" />
            </Link>
          ) : (
            <button
              className={styles.loadMore}
              type="button"
              onClick={() => {
                focusId.current = collection.photos[visiblePhotos.length]?.id ?? null
                setLimit((current) => current + batchSize)
              }}
            >
              Continua a guardare <Icon name="down" />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
