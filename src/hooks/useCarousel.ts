import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import type { CarouselProps } from '../types/ui'
import { useMotion } from './useMotion'
import { mediaQueries } from '../config/layout'

export function useCarousel({
  variant,
  autoScroll = false,
}: Pick<CarouselProps, 'variant' | 'autoScroll'>) {
  const { reducedMotion } = useMotion()
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [running, setRunning] = useState(false)
  const regionRef = useRef<HTMLDivElement>(null)
  const plugin = useMemo(
    () =>
      AutoScroll({
        speed: 0.45,
        playOnInit: false,
        stopOnInteraction: true,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
        startDelay: 500,
      }),
    [],
  )
  const plugins = useMemo(() => (autoScroll ? [plugin] : []), [autoScroll, plugin])
  const options = useMemo(
    () => ({
      loop: autoScroll,
      align: 'start' as const,
      containScroll: 'trimSnaps' as const,
      breakpoints:
        variant === 'products'
          ? {
              [mediaQueries.mobile]: { align: 'center' as const, containScroll: false as const },
              [mediaQueries.desktop]: { active: false },
            }
          : {},
    }),
    [variant, autoScroll],
  )
  const [viewportRef, api] = useEmblaCarousel(options, plugins)

  useEffect(() => {
    if (!api) return
    const sync = () => {
      setSelected(api.selectedScrollSnap())
      setSnapCount(api.scrollSnapList().length)
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    api.on('select', sync).on('reInit', sync)
    sync()
    return () => {
      api.off('select', sync).off('reInit', sync)
    }
  }, [api])

  useEffect(() => {
    const region = regionRef.current
    if (!autoScroll || !api || !region) return
    let visible = false
    let hovered = region.matches(':hover')
    let focused = region.contains(document.activeElement)
    let dragging = false
    const sync = () => {
      // Embla may retain an equivalent plugin during reinitialization or Fast Refresh.
      // Always control its registered instance through the public carousel API.
      if (
        visible &&
        !document.hidden &&
        !hovered &&
        !focused &&
        !dragging &&
        !userPaused &&
        !reducedMotion
      )
        api.plugins().autoScroll?.play()
      else api.plugins().autoScroll?.stop()
    }
    const onPlay = () => setRunning(true)
    const onStop = () => setRunning(false)
    const enter = () => {
      hovered = true
      sync()
    }
    const leave = () => {
      hovered = false
      sync()
    }
    const focusIn = () => {
      focused = true
      sync()
    }
    const focusOut = (event: FocusEvent) => {
      focused = event.relatedTarget instanceof Node && region.contains(event.relatedTarget)
      sync()
    }
    const pointerDown = () => {
      dragging = true
      sync()
    }
    const pointerUp = () => {
      dragging = false
      sync()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        sync()
      },
      { threshold: 0.15 },
    )
    observer.observe(region)
    api
      .on('autoScroll:play', onPlay)
      .on('autoScroll:stop', onStop)
      .on('pointerDown', pointerDown)
      .on('pointerUp', pointerUp)
      .on('reInit', sync)
    region.addEventListener('mouseenter', enter)
    region.addEventListener('mouseleave', leave)
    region.addEventListener('focusin', focusIn)
    region.addEventListener('focusout', focusOut)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      api.plugins().autoScroll?.stop()
      api
        .off('autoScroll:play', onPlay)
        .off('autoScroll:stop', onStop)
        .off('pointerDown', pointerDown)
        .off('pointerUp', pointerUp)
        .off('reInit', sync)
      region.removeEventListener('mouseenter', enter)
      region.removeEventListener('mouseleave', leave)
      region.removeEventListener('focusin', focusIn)
      region.removeEventListener('focusout', focusOut)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [api, autoScroll, reducedMotion, userPaused])

  const scrollPrev = useCallback(() => api?.scrollPrev(reducedMotion), [api, reducedMotion])
  const scrollNext = useCallback(() => api?.scrollNext(reducedMotion), [api, reducedMotion])
  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index, reducedMotion),
    [api, reducedMotion],
  )
  const togglePlayback = useCallback(() => {
    const auto = api?.plugins().autoScroll
    if (!auto) return
    if (auto.isPlaying()) {
      setUserPaused(true)
      auto.stop()
    } else {
      setUserPaused(false)
      if (!reducedMotion) auto.play(0)
    }
  }, [api, reducedMotion])
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
      if (event.key === 'ArrowLeft') api.scrollPrev(reducedMotion)
      else if (event.key === 'ArrowRight') api.scrollNext(reducedMotion)
      else api.scrollTo(event.key === 'Home' ? 0 : api.scrollSnapList().length - 1, reducedMotion)
    },
    [api, reducedMotion],
  )

  return {
    regionRef,
    viewportRef,
    selected,
    snapCount,
    canPrev,
    canNext,
    running,
    userPaused,
    reducedMotion,
    scrollPrev,
    scrollNext,
    scrollTo,
    togglePlayback,
    onKeyDown,
  }
}
