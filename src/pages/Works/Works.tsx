import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { GalleryLightbox } from '../../components/sections/Gallery/GalleryLightbox'
import { Icon } from '../../components/ui/Icon'
import { contacts } from '../../config/contacts'
import { workCategories, workCollections } from '../../data/works'
import { parseWorkFilter } from '../../utils/works'
import { getContactLinks } from '../../utils/contactLinks'
import type { GalleryLightboxState } from '../../types/gallery'
import { WorkFilters } from './WorkFilters'
import { WorkCollection } from './WorkCollection'
import { WorksHero } from './WorksHero'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import styles from './Works.module.css'

export function Works() {
  const [params] = useSearchParams()
  const { hash, key } = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)
  const selected = parseWorkFilter(params.get('categoria'), workCategories)
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null)
  const links = getContactLinks(contacts)
  const collections = workCollections.filter((item) => selected === 'tutti' || item.id === selected)
  useAnchorNavigation()

  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [selected, hash])

  useEffect(() => {
    if (hash !== '#works-content') return
    const frame = requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [hash, key])

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#works-content">
        Vai alle fotografie
      </a>
      <Header />
      <main className={styles.main}>
        <WorksHero onOpen={(photo, trigger) => setLightbox({ photo, trigger })} />
        <WorkFilters selected={selected} />
        <div
          className={`container ${styles.collections}`}
          id="works-content"
          tabIndex={-1}
          ref={contentRef}
        >
          {selected !== 'tutti' && (
            <Link to="#esplora-lavori" className={styles.backToCategories}>
              <Icon name="chevron-left" /> Cambia categoria
            </Link>
          )}
          <p className="sr-only" role="status">
            {selected === 'tutti'
              ? 'Tutte le categorie. Scegli una categoria per esplorare la raccolta completa.'
              : `Categoria selezionata: ${collections[0]?.title}. ${collections[0]?.photos.length} fotografie disponibili.`}
          </p>
          {collections.map((collection) => (
            <WorkCollection
              key={`${selected}-${collection.id}`}
              collection={collection}
              overview={selected === 'tutti'}
              onOpen={(photo, trigger) => setLightbox({ photo, trigger })}
            />
          ))}
        </div>
        <section className={styles.contact} aria-labelledby="works-contact-title">
          <div className="container">
            <div>
              <h2 id="works-contact-title">
                E per <em>la tua casa?</em>
              </h2>
              <p>Raccontaci cosa vuoi cambiare. Troviamo insieme da dove cominciare.</p>
            </div>
            {links.whatsapp && (
              <a
                className={styles.contactLink}
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Parliamone insieme <Icon name="arrow" />
                <span className="sr-only"> su WhatsApp, in una nuova scheda</span>
              </a>
            )}
          </div>
        </section>
      </main>
      <Footer />
      {lightbox && <GalleryLightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}
