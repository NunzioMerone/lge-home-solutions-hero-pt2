import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMotion } from '../../../hooks/useMotion'
import type { GalleryPaginationProps } from '../../../types/gallery'
import { getPaginationWindow } from '../../../utils/carouselPagination'
import styles from './GalleryPagination.module.css'

export function GalleryPagination({ count, selected, onSelect }: GalleryPaginationProps) {
  const { reducedMotion } = useMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const previousStart = useRef(0)
  const window = getPaginationWindow(count, selected)
  const { start, from } = window

  useLayoutEffect(() => {
    const track = trackRef.current
    const difference = start - previousStart.current
    previousStart.current = start
    if (!track || reducedMotion || difference === 0) return
    const context = gsap.context(() => {
      if (Math.abs(difference) === 1) {
        const target = -(start - from) * 30
        gsap.fromTo(
          track,
          { x: target + difference * 30 },
          {
            x: target,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'transform',
          },
        )
      } else {
        gsap.fromTo(
          track,
          { opacity: 0.45 },
          {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            clearProps: 'opacity',
          },
        )
      }
    }, track)
    return () => context.revert()
  }, [from, reducedMotion, start])

  if (window.size < 2) return null
  return (
    <div className={styles.pagination} role="group" aria-label="Posizioni della galleria">
      <div className={styles.viewport}>
        <div className={styles.track} data-offset={start - from} ref={trackRef}>
          {window.indices.map((index) => {
            const visible = index >= start && index < start + window.size
            const edge =
              (index === start && start > 0) ||
              (index === start + window.size - 1 && start + window.size < count)
            return (
              <button
                key={index}
                className={styles.button}
                type="button"
                tabIndex={visible ? 0 : -1}
                aria-hidden={!visible}
                inert={!visible}
                aria-label={`Mostra fotografia ${index + 1} di ${count}`}
                aria-current={window.selected === index ? 'true' : undefined}
                data-edge={edge}
                onClick={() => onSelect(index)}
              >
                <span aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
