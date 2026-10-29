import { homeGallery as gallery } from '../../../data/works'
import { useLoopCarousel } from '../../../hooks/useLoopCarousel'
import type { GalleryCarouselProps } from '../../../types/gallery'
import { getLoopOffset } from '../../../utils/loopCarousel'
import { GalleryImage } from './GalleryImage'
import { GalleryPagination } from './GalleryPagination'
import { CarouselArrow } from '../../ui/CarouselArrow'
import styles from './GalleryCarousel.module.css'

export function GalleryCarousel({ paused, onOpen }: GalleryCarouselProps) {
  const { regionRef, viewportRef, selected, onKeyDown, scrollTo, scrollPrev, scrollNext } =
    useLoopCarousel({ paused })
  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="I nostri lavori"
      aria-roledescription="carosello"
      onKeyDown={onKeyDown}
    >
      <p id="gallery-instructions" className="sr-only">
        Usa i tasti freccia per scorrere le fotografie e Invio per ingrandirle.
      </p>
      <div className={styles.stage}>
        <div className={styles.viewport} ref={viewportRef} id="gallery-carousel-viewport">
          <div className={styles.track}>
            {gallery.map((item, index) => {
              const depth = Math.abs(getLoopOffset(index, selected, gallery.length))
              const visible = depth <= 2
              return (
                <div
                  key={item.id}
                  className={styles.slide}
                  data-depth={Math.min(depth, 3)}
                  aria-hidden={!visible}
                  inert={!visible}
                  role="group"
                  aria-roledescription="diapositiva"
                  aria-label={`${(index % gallery.length) + 1} di ${gallery.length}`}
                >
                  <button
                    className={styles.photo}
                    type="button"
                    tabIndex={depth === 0 ? 0 : -1}
                    aria-current={depth === 0 ? 'true' : undefined}
                    aria-label={`Ingrandisci foto: ${item.alt}`}
                    aria-describedby="gallery-instructions"
                    aria-haspopup="dialog"
                    onClick={(event) => onOpen(item, event.currentTarget)}
                  >
                    {depth <= 3 && <GalleryImage photo={item} />}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.arrows} role="group" aria-label="Navigazione fotografie">
          <CarouselArrow
            direction="previous"
            label="Fotografia precedente"
            controlsId="gallery-carousel-viewport"
            onClick={scrollPrev}
          />
          <CarouselArrow
            direction="next"
            label="Fotografia successiva"
            controlsId="gallery-carousel-viewport"
            onClick={scrollNext}
          />
        </div>
      </div>
      <GalleryPagination count={gallery.length} selected={selected} onSelect={scrollTo} />
    </div>
  )
}
