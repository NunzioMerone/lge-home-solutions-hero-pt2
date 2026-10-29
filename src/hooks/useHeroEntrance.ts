import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMotion } from './useMotion'

export function useHeroEntrance() {
  const rootRef = useRef<HTMLElement>(null)
  const { reducedMotion } = useMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return
    let timeline: gsap.core.Timeline | undefined
    const context = gsap.context(() => {
      timeline = gsap.timeline({ paused: true })
      timeline
        .fromTo(
          root.querySelector('[data-hero-prefix]'),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.95, ease: 'power2.out' },
          0.05,
        )
        .fromTo(
          root.querySelector('[data-hero-subtitle]'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          0.2,
        )
        .fromTo(
          root.querySelectorAll('[data-hero-slide]'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.8, stagger: 0.18, ease: 'power2.out' },
          0.45,
        )
    }, root)
    const reveal = () => {
      timeline?.play()
      observer.disconnect()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal()
      },
      { threshold: 0.1 },
    )
    observer.observe(root)
    const revealForKeyboard = () => {
      timeline?.progress(1)
      observer.disconnect()
    }
    root.addEventListener('focusin', revealForKeyboard)
    return () => {
      observer.disconnect()
      root.removeEventListener('focusin', revealForKeyboard)
      context.revert()
    }
  }, [reducedMotion])

  return rootRef
}
