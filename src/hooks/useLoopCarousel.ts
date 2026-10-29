import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useMotion } from './useMotion'
import type { LoopCarouselOptions } from '../types/carousel'

export function useLoopCarousel({ paused = false, delay = 4200 }: LoopCarouselOptions = {}) {
  const { reducedMotion } = useMotion()
  const [selected, setSelected] = useState(0)
  const focusRequested = useRef(false)
  const regionRef = useRef<HTMLDivElement>(null)
  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    align: 'center',
    duration: 45,
    watchFocus: false,
  })

  useEffect(() => {
    if (!api) return
    const sync = () => setSelected(api.selectedScrollSnap())
    api.on('select', sync).on('reInit', sync)
    sync()
    return () => {
      api.off('select', sync).off('reInit', sync)
    }
  }, [api])

  useLayoutEffect(() => {
    if (!focusRequested.current) return
    focusRequested.current = false
    api?.slideNodes()[selected]?.querySelector<HTMLElement>('[tabindex="0"]')?.focus({
      preventScroll: true,
    })
  }, [api, selected])

  useEffect(() => {
    if (!api) return
    if (reducedMotion) {
      api.scrollTo(api.selectedScrollSnap(), true)
      return
    }
    if (paused) return
    const viewport = regionRef.current ?? api.rootNode()
    let timer: number | undefined
    let visible = false
    let hovered = viewport.matches(':hover')
    let focused = viewport.contains(document.activeElement)
    let dragging = false
    const stop = () => window.clearTimeout(timer)
    const schedule = () => {
      stop()
      if (!visible || document.hidden || hovered || focused || dragging) return
      timer = window.setTimeout(() => api.scrollNext(), delay)
    }
    const enter = () => {
      hovered = true
      stop()
    }
    const leave = () => {
      hovered = false
      schedule()
    }
    const focusIn = () => {
      focused = true
      stop()
    }
    const focusOut = (event: FocusEvent) => {
      focused = event.relatedTarget instanceof Node && viewport.contains(event.relatedTarget)
      schedule()
    }
    const pointerDown = () => {
      dragging = true
      stop()
    }
    const pointerUp = () => {
      dragging = false
      schedule()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        schedule()
      },
      { threshold: 0.2 },
    )
    observer.observe(viewport)
    api
      .on('select', stop)
      .on('settle', schedule)
      .on('reInit', schedule)
      .on('pointerDown', pointerDown)
      .on('pointerUp', pointerUp)
    viewport.addEventListener('mouseenter', enter)
    viewport.addEventListener('mouseleave', leave)
    viewport.addEventListener('focusin', focusIn)
    viewport.addEventListener('focusout', focusOut)
    document.addEventListener('visibilitychange', schedule)
    return () => {
      stop()
      observer.disconnect()
      api
        .off('select', stop)
        .off('settle', schedule)
        .off('reInit', schedule)
        .off('pointerDown', pointerDown)
        .off('pointerUp', pointerUp)
      viewport.removeEventListener('mouseenter', enter)
      viewport.removeEventListener('mouseleave', leave)
      viewport.removeEventListener('focusin', focusIn)
      viewport.removeEventListener('focusout', focusOut)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [api, delay, paused, reducedMotion])

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        !api ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
      )
        return
      event.preventDefault()
      const previous = api.selectedScrollSnap()
      focusRequested.current = true
      if (event.key === 'ArrowLeft') api.scrollPrev(reducedMotion)
      else if (event.key === 'ArrowRight') api.scrollNext(reducedMotion)
      else api.scrollTo(event.key === 'Home' ? 0 : api.scrollSnapList().length - 1, reducedMotion)
      if (api.selectedScrollSnap() === previous) focusRequested.current = false
    },
    [api, reducedMotion],
  )

  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index, reducedMotion),
    [api, reducedMotion],
  )
  const scrollPrev = useCallback(() => api?.scrollPrev(reducedMotion), [api, reducedMotion])
  const scrollNext = useCallback(() => api?.scrollNext(reducedMotion), [api, reducedMotion])

  return { regionRef, viewportRef, selected, onKeyDown, scrollTo, scrollPrev, scrollNext }
}
